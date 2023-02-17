<template>
    <div>
        <van-cell-group>
            <van-field label="点检标题">
                <template #input>
                    {{ form.checkTitle }}
                </template>
            </van-field>
            <van-field label="点检类型">
                <template #input>
                    {{ form.itemResultType }}
                </template>
            </van-field>
            <van-field label="点检周期">
                <template #input>
                    {{ form.checkCycle }}
                </template>
            </van-field>

            <van-field label="点检内容">
                <template #input>
                    {{ form.checkDetails }}
                </template>
            </van-field>
            <van-field label="最大值">
                <template #input>
                    {{ form.maxValue }}
                </template>
            </van-field>
            <van-field label="最小值">
                <template #input>
                    {{ form.minValue }}
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
import { itemallinfo } from '@/api/rollers'
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
        console.log(this.my.itemId);
        this.$eiInfo.parameter = {
            itemId: this.my.itemId
        }
        itemallinfo(this.$eiInfo).then((res) => {
            console.log(res.result.result);
            this.form = JSON.parse(JSON.stringify(res.result.result))
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