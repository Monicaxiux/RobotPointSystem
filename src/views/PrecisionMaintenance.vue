<template>
    <div>
        <van-cell-group>
            <van-field v-model="Branch" label="分厂">

            </van-field>
            <van-field label="机组">
                <template #input>
                    <el-select v-model="line" placeholder="请选择">
                        <el-option v-for="item in lineList" :key="item.lineId" :label="item.lineName" :value="item.lineId">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field label="设备类型">
                <template #input>
                    <el-select v-model="line" placeholder="请选择">
                        <el-option v-for="item in lineList" :key="item.lineId" :label="item.lineName" :value="item.lineId">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field v-model="form.resultDetails" label="点检单号"></van-field>
            <van-field label="点检状态">
                <template #input>
                    <el-select v-model="line" placeholder="请选择">
                        <el-option v-for="item in lineList" :key="item.lineId" :label="item.lineName" :value="item.lineId">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field v-model="form.resultDetails" label="设备编码"></van-field>
            <van-field v-model="form.resultDetails" label="维护日期"></van-field>
            <van-field v-model="form.resultDetails" label="维护标题"></van-field>
            <van-field v-model="form.resultDetails" label="维护内容"></van-field>
            <van-field label="维护前照片">
                <template #input>
                    <van-uploader accept="*" v-model="checkPic" multiple />
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
            Branch: '宝日汽车板',
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
        this.my.title = "精密维护"; //页面标题
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

.bt {
    width: 150px;
}
</style>