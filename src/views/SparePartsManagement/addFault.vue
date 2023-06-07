<template>
    <div>
        <van-cell-group>
            <van-field v-model="form.faultTitle" placeholder="请输入标题" label="故障标题">
            </van-field>
            <van-field v-model="form.faultDetails" placeholder="请输入内容" label="故障内容">
            </van-field>
            <van-field v-model="form.solution" rows="1" autosize label="解决方案" type="textarea" placeholder="请输入解决方案" />
            <van-field label="故障类型">
                <template #input>
                    <el-select size="mini" v-model="form.faultResponsible" placeholder="请选择">
                        <el-option v-for="item in faultResponsibleList" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field label="典型案例">
                <template #input>
                    <van-radio-group v-model="form.typical" direction="horizontal">
                        <van-radio name=1>是</van-radio>
                        <van-radio name=0>否</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field label="故障照片">
                <template #input>
                    <div style="display: flex;flex-wrap: wrap;">
                        <div v-if="form.faultPic">
                            <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                    <div style="text-align: center;margin: 3px;" v-for="item, index in form.faultPic[0]"
                                        :key="item">
                                        <img class="upimg" @click="Preview(form.faultPic[0], index)" :src="item.url"><br />
                                        <van-button style="width: 40px;" @click="imgdelete(item.url)" size="mini"
                                            type="danger">删除</van-button>
                                    </div>
                                </div>
                                <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                    <div style="text-align: center;margin: 3px;" v-for="item, index in form.faultPic[1]"
                                        :key="item">
                                        <video class="upimg" controls :src="item.url"></video><br />
                                        <van-button style="width: 40px;" @click="imgdelete(item.url)" size="mini"
                                            type="danger">删除</van-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 100%;">
                            <van-uploader accept="*" v-model="faultPic" multiple />
                        </div>
                    </div>
                </template>
            </van-field>
            <van-field label="修复后照片">
                <template #input>
                    <div style="display: flex;flex-wrap: wrap;">
                        <div v-if="form.repairPic">
                            <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                    <div style="text-align: center;margin: 3px;" v-for="item, index in form.repairPic[0]"
                                        :key="item">
                                        <img class="upimg" @click="Preview(form.repairPic[0], index)" :src="item.url"><br />
                                        <van-button style="width: 40px;" @click="imgdelete(item.url)" size="mini"
                                            type="danger">删除</van-button>
                                    </div>
                                </div>
                                <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                    <div style="text-align: center;margin: 3px;" v-for="item, index in form.repairPic[1]"
                                        :key="item">
                                        <video class="upimg" controls :src="item.url"></video><br />
                                        <van-button style="width: 40px;" @click="imgdelete(item.url)" size="mini"
                                            type="danger">删除</van-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 100%;">
                            <van-uploader accept="*" v-model="repairPic" multiple />
                        </div>
                    </div>
                </template>
            </van-field>
            <van-field v-if="my.itemStatus == 2" label="故障作者">
                <template #input>
                    {{ form.faultUsername }}
                </template>
            </van-field>
            <van-field v-if="my.itemStatus == 2" label="记录时间">
                <template #input>
                    {{ form.faultTime }}
                </template>
            </van-field>
            <van-field v-model="form.remark" placeholder="请输入内容" label="备注">
            </van-field>
            <div class="bottom_box">
                <van-button class="bt" @click="edit(1)" type="info">提交</van-button>
                <van-button class="bt" @click="edit(3)" type="default">取消</van-button>
            </div>
            <br />
            <br />
        </van-cell-group>
    </div>
</template>

<script>
import { faultquerysingle, faultaddrecord, faultupdaterecord, faultdeleterecordpic } from '@/api/rollers'
import { ImagePreview } from 'vant';

export default {
    name: "Home",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            form: {},
            afterMaintainPic: [],
            beforeMaintainPic: [],
            faultResponsibleList: [
                {
                    value: '机械',
                    label: '机械'
                },
                {
                    value: '电气',
                    label: '电气'
                },
                {
                    value: '仪表',
                    label: '仪表'
                }
            ],
            faultPic: [],
            repairPic: []
        };
    },
    mounted() {
        this.my.title = "故障记录"; //页面标题
        this.my.left = true; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar
        if (this.my.itemStatus == 1) {
            console.log('是新增');
        } else if (this.my.itemStatus == 2) {
            this.getData();
        }
    },

    methods: {
        imgdelete(url) {
            this.$dialog.confirm({
                title: '确认',
                message: '是否删除？',
            })
                .then(() => {
                    this.$eiInfo.parameter = {
                        picName: url,
                        faultId: this.my.faultId
                    }
                    faultdeleterecordpic(this.$eiInfo).then((res) => {
                        if (res.sys.status == 1) {
                            this.$notify({ type: "success", message: res.sys.msg })
                            this.getData();
                        }
                    })
                })
                .catch(() => {
                    // on cancel
                });
        },
        getData() {
            this.$eiInfo.parameter = {
                faultId: this.my.faultId
            }
            faultquerysingle(this.$eiInfo).then((res) => {
                this.form = res.result.fault;
                switch (this.form.typical) {
                    case 1:
                        this.form.typical = '1'
                        break;
                    case 0:
                        this.form.typical = '0'
                        break;
                }
                if (this.form.faultPic) {
                    for (let i = 0; i < this.form.faultPic[0].length; i++) {
                        this.form.faultPic[0][i] = { url: this.form.faultPic[0][i] }
                    }
                    if (this.form.faultPic[1]) {
                        for (let i = 0; i < this.form.faultPic[1].length; i++) {
                            this.form.faultPic[1][i] = { url: this.form.faultPic[1][i] }
                        }
                    }
                }
                if (this.form.repairPic) {
                    for (let i = 0; i < this.form.repairPic[0].length; i++) {
                        this.form.repairPic[0][i] = { url: this.form.repairPic[0][i] }
                    }
                    if (this.form.repairPic[1]) {
                        for (let i = 0; i < this.form.repairPic[1].length; i++) {
                            this.form.repairPic[1][i] = { url: this.form.repairPic[1][i] }
                        }
                    }
                }
            })
        },
        edit(i) {
            let formData = new FormData();
            switch (i) {
                case 1:
                    switch (this.my.itemStatus) {
                        case 1:
                            formData.append('deviceId', this.my.deviceId);
                            formData.append('faultTitle', this.form.faultTitle);
                            formData.append('faultDetails', this.form.faultDetails);
                            formData.append('faultResponsible', this.form.faultResponsible);
                            formData.append('solution', this.form.solution);
                            formData.append('typical', parseInt(this.form.typical));
                            formData.append('userId', this.my.userInfo.id);
                            for (let i = 0; i < this.faultPic.length; i++) {
                                formData.append('faultPic', this.faultPic[i].file);
                            }
                            for (let i = 0; i < this.repairPic.length; i++) {
                                formData.append('repairPic', this.repairPic[i].file);
                            }
                            faultaddrecord(formData).then((res) => {
                                if (res.sys.status == 1) {
                                    this.$notify({ type: "success", message: res.sys.msg })
                                    this.$router.back();
                                }
                            })
                            break;
                        case 2:
                            formData = new FormData();
                            formData.append('faultId', this.my.faultId);
                            formData.append('deviceId', this.my.deviceId);
                            formData.append('faultTitle', this.form.faultTitle);
                            formData.append('faultDetails', this.form.faultDetails);
                            formData.append('faultResponsible', this.form.faultResponsible);
                            formData.append('solution', this.form.solution);
                            formData.append('typical', parseInt(this.form.typical));
                            formData.append('userId', this.my.userInfo.id);
                            for (let i = 0; i < this.faultPic.length; i++) {
                                formData.append('faultPic', this.faultPic[i].file);
                            }
                            for (let i = 0; i < this.repairPic.length; i++) {
                                formData.append('repairPic', this.repairPic[i].file);
                            }
                            faultupdaterecord(formData).then((res) => {
                                if (res.sys.status == 1) {
                                    this.$notify({ type: "success", message: res.sys.msg })
                                    this.$router.back();
                                }
                            })
                            break;
                    }
                    break;
                case 2:


                    break;
                case 3:
                    this.$router.back();
                    break;
            }

        },
        Preview(x, index) {
            console.log(x);
            let imgList = []
            for (let i = 0; i < x.length; i++) {
                imgList.push(x[i].url)
            }
            ImagePreview(
                {
                    images: imgList,
                    startPosition: index,
                }
            )
        },
    },
};
</script>



<style scoped>
.upimg {
    width: 80px;
    height: 80px;
    object-fit: cover;
}

.bottom_box {
    width: 100%;
    display: flex;
    height: 60px;
    /* flex-wrap: wrap; */
    align-items: center;
    justify-content: space-evenly;
}

.bt {
    width: 100px;
}
</style>