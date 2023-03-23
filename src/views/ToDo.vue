<template>
    <div>
        <div class="form">
            <div class="form_item">
                <div class="boxnr">
                    <div>
                        <div class="boxTitle">{{ tableData[0].title }}
                            <span @click="Eist(1)">+</span>
                        </div>
                        <div :style="status1 ? 'height : 654px;' : ' height: 190px;'" class="he"
                            v-if="tableData[0].content.length != 0">
                            <div class="bh" v-for="i in tableData[0].content" :key="i">
                                <!-- <h4>分厂&nbsp;&nbsp;<span>{{ i.factory }}</span></h4> -->
                                <h4>机组&nbsp;&nbsp;<span>{{ i.productionLine }}</span></h4>
                                <h4>保罗工号&nbsp;&nbsp;<span>{{ i.baoRobotNumber }}</span></h4>
                                <h4>设备编号&nbsp;&nbsp;<span>{{ i.deviceNumber }}</span></h4>
                                <h4>设备名称&nbsp;&nbsp;<span>{{ i.deviceName }}</span></h4><br />
                                <div class="b">
                                    <h4>日点检：</h4>
                                    <h5 :style="x != 0 && index == 0 ? 'background: red;color:white' : ''"
                                        v-for="x, index in i.dayCheck" :key="x">
                                        <b @click="seleData(i.baoRobotNumber, 0, 1)" v-if="index == 0">待点检</b>
                                        <b @click="seleData(i.baoRobotNumber, 1, 1)" v-if="index == 1">待修复</b>
                                        <b @click="seleData(i.baoRobotNumber, 2, 1)" v-if="index == 2">已完成</b>
                                        <span>{{ x }}</span>
                                    </h5>
                                </div>
                                <div class="b">
                                    <h4>周点检：</h4>
                                    <h5 :style="(x != 0 && index == 0) || (x != 0 && index == 3) ? 'background: red;color:white' : ''"
                                        v-for="x, index in i.weekCheck" :key="x">
                                        <b @click="seleData(i.baoRobotNumber, 0, 2)" v-if="index == 0">待点检</b>
                                        <b @click="seleData(i.baoRobotNumber, 1, 2)" v-if="index == 1">待修复</b>
                                        <b @click="seleData(i.baoRobotNumber, 2, 2)" v-if="index == 2">已完成</b>
                                        <b v-if="index == 3">逾期未检</b>
                                        <span>{{ x }}</span>
                                    </h5>
                                </div>
                                <div class="b">
                                    <h4>月点检：</h4>
                                    <h5 :style="(x != 0 && index == 0) || (x != 0 && index == 3) ? 'background: red;color:white' : ''"
                                        v-for="x, index in i.monthCheck" :key="x">
                                        <b @click="seleData(i.baoRobotNumber, 0, 2)" v-if="index == 0">待点检</b>
                                        <b @click="seleData(i.baoRobotNumber, 0, 2)" v-if="index == 1">待修复</b>
                                        <b @click="seleData(i.baoRobotNumber, 0, 2)" v-if="index == 2">已完成</b>
                                        <b @click="seleData(i.baoRobotNumber, 0, 2)" v-if="index == 3">逾期未检</b>
                                        <span>{{ x }}</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div class="kon" v-else>
                            暂无数据
                        </div>
                    </div>
                </div>
                <div class="boxnr">
                    <div>
                        <div class="boxTitle">{{ tableData[1].title }}
                            <span @click="Eist(2)">+</span>
                        </div>
                        <div :style="status2 ? 'height : 654px;' : ' height: 148px;'" class="he"
                            v-if="tableData[1].content.length != 0">
                            <div class="bh" v-for="i in tableData[1].content" :key="i">
                                <!-- <h4>分厂&nbsp;&nbsp;<span>{{ i.factory }}</span></h4> -->
                                <h4>机组&nbsp;&nbsp;<span>{{ i.productionLine }}</span></h4>
                                <h4>保罗工号&nbsp;&nbsp;<span>{{ i.baoRobotNumber }}</span></h4>
                                <h4>设备编号&nbsp;&nbsp;<span>{{ i.deviceNumber }}</span></h4>
                                <h4>设备名称&nbsp;&nbsp;<span>{{ i.deviceName }}</span></h4><br />
                                <div class="b">
                                    <h4 :style="i.notMaintain != 0 ? 'background: red;color:white' : ''">
                                        待维护：<span>{{ i.notMaintain }}&nbsp;&nbsp;</span></h4>
                                    <h4>维护中：<span>{{ i.maintaining }}&nbsp;&nbsp;</span></h4>
                                    <h4>维护完成：<span>{{ i.maintained }}&nbsp;&nbsp;</span></h4>
                                </div>
                            </div>
                        </div>
                        <div class="kon" v-else>
                            暂无数据
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { recordtobedone } from "@/api/rollers";
export default {
    name: "Todo",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            tableData: [],
            status1: false,
            status2: false,
            status3: false

        }
    },
    mounted() {
        this.my.title = "消息中心"; //页面标题
        this.my.left = false; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar
        this.getData();
    },
    methods: {
        seleData(s, i) {
            this.my.chakData = [s, i]
            this.$router.push({ path: '/checkingToDo' })
        },
        Eist(s, i) {
            switch (s) {
                case 1:
                    this.status1 = !this.status1;
                    this.status2 = false
                    this.status3 = false
                    break;
                case 2:
                    this.status2 = !this.status2;
                    this.status1 = false
                    this.status3 = false
                    break;
                default:
                    break;
            }
        },
        getData() {
            this.$eiInfo.userInfo = {
                id: this.my.userInfo.id
            }
            recordtobedone(this.$eiInfo).then((res) => {
                this.tableData = res.result.result;
            })
        },
        onClick(name, title) {
            console.log(title);
        }
    }
}
</script>
<style scoped lang="less">
.bh {
    border: 1px solid #687dbb;
    padding: 10px;
    margin-bottom: 10px;

    b {
        margin: 0 6px;
    }
}

.he {
    overflow: auto;
    transition: 0.5s;
}

.kon {
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid #687dbb;
    margin-bottom: 20px;
}

.boxTitle {
    height: 30px;
    padding: 0 10px;
    background-color: #687dbb;
    color: white;
    line-height: 30px;
    font-weight: bold;

    span {
        float: right;
        font-size: 26px;
    }
}

.b {
    display: flex;
}

.boxnr {
    width: 95%;
    // padding: 15px;
    overflow: hidden;
    margin-bottom: 15px;
    border: 1px solid #687dbb;

    h4 {
        padding: 0;
        margin: 0;

        span {
            font-size: 12px;
            // color: #646464;
            font-weight: 100;
        }
    }
}

h5 {
    padding: 0;
    margin: 0;

    span {
        font-size: 12px;
        // color: #646464;
        font-weight: 100;
    }
}

:deep(.van-tabs__line) {
    background-color: #687dbb;
}

.form {
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    padding: 14px 0;
}

.van-button--info {
    color: #fff;
    background-color: #687dbb;
    border: 1px solid #687dbb;
}

/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #687dbb;
}

/deep/.el-input {
    width: 110px !important;
    margin-left: 4px;
    height: 32px;
}

/deep/.el-input__inner {
    width: 110px !important;
    margin-left: 4px;
    height: 32px;
}

/deep/ .el-input--suffix .el-input__inner {
    width: 110px !important;
    margin-left: 4px;
    height: 32px;
}

/deep/.el-input__icon {
    height: 116%;
}

.pag {
    background-color: white;
    padding: 10px 0;
    justify-content: center;
    display: flex;
    overflow: hidden;
    border-top: 1px solid #ededed;
}

.chart {
    width: 100%;
    height: 400px;
}


.tableBox {
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    padding: 14px 10px;
    border-top: 1px solid #ededed;
}

.form_item {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;
    flex-wrap: wrap;
}

.form_item2 {
    width: 100%;
    margin-left: 7%;
}

.inp {
    width: 42%;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    margin: 0 10px;
}

label {
    width: 35%;
    display: flex;
    font-size: 0.7rem;
    justify-content: space-between;
    text-align: right;
    white-space: nowrap;
}
</style>
