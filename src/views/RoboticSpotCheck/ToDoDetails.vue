<template>
    <div>
        <van-cell-group>
            <van-field label="委托单号">
                <template #input>
                    {{ form.recordNumber }}
                </template>
            </van-field>
            <van-field label="点检类型">
                <template #input>
                    {{ form.itemCycleResult }}
                </template>
            </van-field>
            <van-field label="点检日期">
                <template #input>
                    {{ form.checkRecordDate }}
                </template>
            </van-field>
            <van-field label="点检分厂">
                <template #input>
                    {{ form.factory }}
                </template>
            </van-field>
            <van-field label="点检机组">
                <template #input>
                    {{ form.productionLine }}
                </template>
            </van-field>
            <van-field label="点检设备">
                <template #input>
                    {{ form.deviceName }}
                </template>
            </van-field>
            <van-field label="点检标题">
                <template #input>
                    {{ form.checkItem }}
                </template>
            </van-field>
            <van-field label="点检内容">
                <template #input>
                    {{ form.checkDetails }}
                </template>
            </van-field>
            <van-field label="巡检照片">
                <template #input>
                    <div style="display: flex;flex-wrap: wrap;">
                        <div v-if="form.checkPic">
                            <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                <div style="width: 100%;">
                                    <img class="upimg" v-for="item, index in form.checkPic[0]"
                                        @click="Preview(form.checkPic[0], index)" :src="item.url">
                                </div>
                                <div style="width: 100%;">

                                    <video style="width: 100%;height: 100px;" controls
                                        v-for="item, index in form.checkPic[1]" @click="play(item)" :src="item.url"></video>
                                </div>
                            </div>
                        </div>
                        <div style="width: 100%;">
                            <van-uploader accept="*" v-model="checkPic" multiple />
                        </div>
                    </div>
                </template>
            </van-field>
            <van-field label="点检结果">
                <template #input>
                    <el-select size="mini" v-model="form.checkResult" placeholder="请选择">
                        <el-option v-for="item in checkResultList" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field label="问题描述">
                <template #input>
                    <van-field v-model="form.resultDetails" placeholder="请输入问题" />
                </template>
            </van-field>
            <van-field label="下一步责任方">
                <template #input>
                    <el-select size="mini" v-model="form.responsible" placeholder="请选择">
                        <el-option v-for="item in responsibleList" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field label="检查人">
                <template #input>
                    {{ form.checkUser }}
                    <!-- <van-field v-model="form.checkUser" disabled placeholder="请输入检查人" /> -->

                </template>
            </van-field>
            <van-field label="修复图片">
                <template #input>
                    <div style="display: flex;flex-wrap: wrap;">
                        <!-- <div style="width: 100%;">
                            <img class="upimg" v-for="item, index in form.repairPic" @click="Preview(form.repairPic, index)"
                                :src="item.url">
                        </div> -->
                        <div v-if="form.repairPic">
                            <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                <div style="width: 100%;">
                                    <img class="upimg" v-for="item, index in form.repairPic[0]"
                                        @click="Preview(form.repairPic[0], index)" :src="item.url">
                                </div>
                                <div style="width: 100%;">
                                    <video class="upimg" controls v-for="item, index in form.repairPic[1]"
                                        :src="item.url"></video>
                                </div>

                            </div>
                        </div>
                        <div style="width: 100%;">
                            <van-uploader accept="*" v-model="repairPic" multiple />
                        </div>
                    </div>
                </template>
            </van-field>
            <van-field label="修复结果">
                <template #input>
                    <el-select size="mini" v-model="form.repairResult" placeholder="请选择">
                        <el-option v-for="item in repairResultList" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field label="修复人">
                <template #input>
                    {{ form.repairUser }}
                    <!-- <van-field v-model="form.repairUser" disabled placeholder="请输入修复人" /> -->
                </template>
            </van-field>
            <van-field label="点检备注">
                <template #input>
                    <van-field v-model="form.remark" placeholder="请输入备注信息" />
                </template>
            </van-field>
        </van-cell-group>
        <div class="bottom_box">
            <van-button class="bt" @click="edit(1)" type="info">提交</van-button>
            <van-button class="bt" @click="edit(2)" type="default">取消</van-button>
        </div>
        <br />
        <br />
    </div>
</template>

<script>
import { recordallinfo, recorduploaddata } from '@/api/rollers'
import { ImagePreview } from 'vant';
export default {
    name: "Home",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            form: {},
            checkPic: [],
            repairPic: [],
            checkResultList: [
                {
                    value: '检查正常',
                    label: '检查正常'
                },
                {
                    value: '检查异常',
                    label: '检查异常'
                }
            ],
            repairResultList: [
                {
                    value: '修复正常',
                    label: '修复正常'
                },
                {
                    value: '需要跟踪',
                    label: '需要跟踪'
                },
                {
                    value: '无法修复',
                    label: '无法修复'
                }
            ],
            responsibleList: [
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
                },
                {
                    value: '无需修复',
                    label: '无需修复'
                }
            ],
        };
    },
    mounted() {
        this.my.title = "点检详情"; //页面标题
        this.my.left = true; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar
        console.log(this.my.recordId);
        this.$eiInfo.parameter = {
            recordId: this.my.recordId
        }

        recordallinfo(this.$eiInfo).then((res) => {
            console.log(res.result.result);
            this.form = JSON.parse(JSON.stringify(res.result.result))
            this.form.repairUser = '乙'
            this.form.checkUser = '甲'
            if (this.form.checkPic) {
                for (let i = 0; i < this.form.checkPic[0].length; i++) {
                    this.form.checkPic[0][i] = { url: this.form.checkPic[0][i] }
                }
                if (this.form.checkPic[1]) {
                    for (let i = 0; i < this.form.checkPic[1].length; i++) {
                        this.form.checkPic[1][i] = { url: this.form.checkPic[1][i] }
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

    methods: {
        play(url) {
            console.log(url);
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
        edit(s) {
            switch (s) {
                case 1:
                    if (!this.form.checkPic && this.checkPic.length == 0) {
                        this.$notify({ type: "warning", message: "请上传检查照片！" })
                    } else if (this.form.checkResult == "") {
                        this.$notify({ type: "warning", message: "请选择点检结果！" })
                    } else {
                        let formData = new FormData();
                        formData.append('recordId', this.form.recordId);
                        formData.append('checkResult', this.form.checkResult);
                        formData.append('resultDetails', this.form.resultDetails);
                        formData.append('responsible', this.form.responsible);
                        formData.append('checkUser', this.form.checkUser);
                        formData.append('repairResult', this.form.repairResult);
                        formData.append('repairUser', this.form.repairUser);
                        formData.append('remark', this.form.remark);
                        console.log(this.checkPic);
                        for (let i = 0; i < this.checkPic.length; i++) {
                            formData.append('checkPic', this.checkPic[i].file);
                        }
                        for (let i = 0; i < this.repairPic.length; i++) {
                            formData.append('repairPic', this.repairPic[i].file);
                        }

                        // console.log(cList);
                        // console.log(rList);
                        recorduploaddata(formData).then((res) => {
                            this.$notify({ type: "success", message: res.sys.msg })
                            this.$router.back();
                        })
                    }

                    break;
                case 2:
                    this.$router.back();
                    break;
            }
        }
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
    align-items: center;
    justify-content: space-evenly;
}

.van-button--info {
    color: #fff;
    background-color: #687dbb;
    border: 1px solid #687dbb;
}

.bt {
    width: 150px;
}
</style>