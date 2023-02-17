<template>
    <div>
        <van-cell-group>
            <van-field label="巡检照片">
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
                    <van-uploader v-model="form.checkPic" multiple />
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
                </template>
            </van-field>
            <van-field label="修复图片">
                <template #input>
                    <van-uploader v-model="form.repairPic" multiple />
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
export default {
    name: "Home",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            form: {},
            checkResultList: [
                {
                    value: '检查正常',
                    label: '检查正常'
                },
                {
                    value: '检查异常',
                    label: '检查异常'
                },
                {
                    value: '待检查',
                    label: '待检查'
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

            for (let i = 0; i < this.form.checkPic.length; i++) {
                console.log(this.form.checkPic[i]);
                this.form.checkPic[i] = { url: this.form.checkPic[i] }
            }
            for (let i = 0; i < this.form.repairPic.length; i++) {
                console.log(this.form.repairPic[i]);
                this.form.repairPic[i] = { url: this.form.repairPic[i] }
            }
        })
    },

    methods: {
        edit(s) {
            switch (s) {
                case 1:
                    console.log(this.form);
                    let formData = new FormData();
                    formData.append('recordId', this.form.recordId);
                    formData.append('checkResult', this.form.checkResult);
                    formData.append('resultDetails', this.form.resultDetails);
                    formData.append('responsible', this.form.responsible);
                    formData.append('checkUser', this.form.checkUser);
                    formData.append('repairResult', this.form.repairResult);
                    formData.append('repairUser', this.form.repairUser);
                    formData.append('remark', this.form.remark);
                    formData.append('checkPic', this.form.checkPic[0].file);
                    formData.append('repairPic', this.form.repairPic[0].file);
                    recorduploaddata(formData).then((res) => {
                        console.log(res);
                    })
                    // this.$eiInfo.parameter = {
                    //     recordId: this.form.recordId,
                    //     checkResult: this.form.checkResult,
                    //     resultDetails: this.form.resultDetails,
                    //     responsible: this.form.responsible,
                    //     checkUser: this.form.checkUser,
                    //     repairResult: this.form.repairResult,
                    //     repairUser: this.form.repairUser,
                    //     remark: this.form.remark,
                    //     checkPic: this.form.checkPic,
                    //     repairPic: this.form.repairPic,
                    // }
                    // recorduploaddata().then((res) => {

                    // })
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