<template>
    <div>
        <div class="form">
            <div class="form_item">
                <div class="boxnr">
                    <div>
                        <div class="boxTitle">{{ tableData[0].title }}
                            <span @click="Eist(1)">{{ status1 ? '收起' : '展开' }}</span>
                        </div>
                        <div :style="status1 ? 'height : 654px;' : ' height: 210px;'" class="he"
                            v-if="tableData[0].content.length != 0">
                            <div class="bh" v-for="i in tableData[0].content" :key="i">
                                <!-- <h4>分厂&nbsp;&nbsp;<span>{{ i.factory }}</span></h4> -->
                                <h4>机组&nbsp;&nbsp;<span>{{ i.productionLine }}</span></h4>
                                <h4>保罗工号&nbsp;&nbsp;<span>{{ i.baoRobotNumber }}</span></h4>
                                <h4>设备编号&nbsp;&nbsp;<span>{{ i.deviceNumber }}</span></h4>
                                <h4>设备名称&nbsp;&nbsp;<span>{{ i.deviceName }}</span></h4><br />
                                <div class="b">
                                    <h4>日点检：</h4>
                                    <h5 :style="colorStyle(x, index)" v-for="x, index in i.dayCheck" :key="x">
                                        <b @click="seleData(i.baoRobotNumber, 0, 1)" v-if="index == 0">待点检</b>
                                        <b @click="seleData(i.baoRobotNumber, 1, 1)" v-if="index == 1">待修复</b>
                                        <b @click="seleData(i.baoRobotNumber, 2, 1)" v-if="index == 2">已完成</b>
                                        <b @click="seleData(i.baoRobotNumber, 4, 1)" v-if="index == 3">无法点检</b>
                                        <span>{{ x }}</span>
                                    </h5>
                                </div>
                                <div class="b">
                                    <h4>周点检：</h4>
                                    <h5 :style="colorStyle(x, index)" v-for="x, index in i.weekCheck" :key="x">
                                        <b @click="seleData(i.baoRobotNumber, 0, 2)" v-if="index == 0">待点检</b>
                                        <b @click="seleData(i.baoRobotNumber, 1, 2)" v-if="index == 1">待修复</b>
                                        <b @click="seleData(i.baoRobotNumber, 2, 2)" v-if="index == 2">已完成</b>
                                        <b @click="seleData(i.baoRobotNumber, 3, 2)" v-if="index == 3">逾期未检</b>
                                        <span>{{ x }}</span>
                                    </h5>
                                </div>
                                <div class="b">
                                    <h4>月点检：</h4>
                                    <h5 :style="colorStyle(x, index)" v-for="x, index in i.monthCheck" :key="x">
                                        <b @click="seleData(i.baoRobotNumber, 0, 3)" v-if="index == 0">待点检</b>
                                        <b @click="seleData(i.baoRobotNumber, 1, 3)" v-if="index == 1">待修复</b>
                                        <b @click="seleData(i.baoRobotNumber, 2, 3)" v-if="index == 2">已完成</b>
                                        <b @click="seleData(i.baoRobotNumber, 3, 3)" v-if="index == 3">逾期未检</b>
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
                            <span @click="Eist(2)">{{ status2 ? '收起' : '展开' }}</span>
                        </div>
                        <div :style="status2 ? 'height : 654px;' : ' height: 158px;'" class="he"
                            v-if="tableData[1].content.length != 0">
                            <div class="bh" v-for="i in tableData[1].content" :key="i">
                                <!-- <h4>分厂&nbsp;&nbsp;<span>{{ i.factory }}</span></h4> -->
                                <h4>机组&nbsp;&nbsp;<span>{{ i.productionLine }}</span></h4>
                                <h4>保罗工号&nbsp;&nbsp;<span>{{ i.baoRobotNumber }}</span></h4>
                                <h4>设备编号&nbsp;&nbsp;<span>{{ i.deviceNumber }}</span></h4>
                                <h4>设备名称&nbsp;&nbsp;<span>{{ i.deviceName }}</span></h4><br />
                                <div class="b">
                                    <h4 @click="selemData(i.baoRobotNumber, 0)"
                                        :style="i.notMaintain != 0 ? 'background: red;color:white' : ''">
                                        待维护：<span>{{ i.notMaintain }}&nbsp;&nbsp;</span></h4>
                                    <h4 @click="selemData(i.baoRobotNumber, 1)">维护中：<span>{{ i.maintaining
                                    }}&nbsp;&nbsp;</span></h4>
                                    <h4 @click="selemData(i.baoRobotNumber, 2)">维护完成：<span>{{ i.maintained
                                    }}&nbsp;&nbsp;</span></h4>
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
                        <div class="boxTitle">{{ tableData[2].title }}
                            <span @click="Eist(3)">{{ status3 ? '收起' : '展开' }}</span>
                        </div>
                        <div :style="status3 ? 'height : 654px;' : ' height: 158px;'" class="he"
                            v-if="tableData[2].content.length != 0">
                            <div class="bh" v-for="i in tableData[2].content"
                                @click="auditData(i.auditRecordId, i.auditItemType)" :key="i">
                                <!-- <h4>分厂&nbsp;&nbsp;<span>{{ i.factory }}</span></h4> -->
                                <h4>审核内容&nbsp;&nbsp;<span>{{ i.handleMsg }}</span></h4>
                                <h4>审核结果&nbsp;&nbsp;<span :style="colorStyleX(i.auditResult)">{{ i.auditResult }}</span>
                                </h4>
                                <h4>提审日期&nbsp;&nbsp;<span>{{ i.createDate }}</span></h4>
                                <h4>审核类型&nbsp;&nbsp;<span>{{ i.handleType }}</span></h4><br />
                            </div>
                        </div>
                        <div class="kon" v-else>
                            暂无数据
                        </div>
                    </div>
                </div>
            </div>
            <div class="title">公告栏</div>
            <div class="box">
                <div class="li_box">
                    <div v-for="i in tableData[3].content" :key="i" class="li">
                        <div><img src="../assets/icon/tonzhi.svg" />&nbsp;{{ i }}</div>
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
            status3: false,
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
        colorStyle(x, index) {
            // x != 0 && index == 0 ? 'background: red;color:white' : ''
            let style = ''
            switch (index) {
                case 0:
                    if (x != 0) {
                        style = 'background: yellow;color:black'
                    }
                    break;
                case 1:
                    if (x != 0) {
                        style = 'background: red;color:white'
                    }
                    break;
                case 2:
                    if (x != 0) {
                        style = 'background: green;color:white'
                    }
                    break;
                case 3:
                    if (x != 0) {
                        style = 'background: red;color:white'
                    }
                    break;
            }
            return style;
        },
        colorStyleX(auditResult) {
            let style = ''
            switch (auditResult) {
                case '待审核':
                    style = 'background: yellow;color:black'
                    break;
                case '通过':
                    style = 'background: green;color:white'
                    break;
                case '驳回':
                    style = 'background: red;color:white'
                    break;
            }
            return style;
        },
        seleData(s, i, c) {
            this.my.code = '';
            this.my.chakData = [s, i, c]
            this.$router.push({ path: '/checkingToDo' })
        },
        selemData(s, i) {
            this.my.code = '';
            this.my.MaintaData = [s, i]
            this.$router.push({ path: '/ToBeMaintained' })
        },
        auditData(s, i) {
            this.my.audData = [s, i]
            this.$router.push({ path: '/ApprovalDetails' })
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
                case 3:
                    this.status3 = !this.status3;
                    this.status1 = false
                    this.status2 = false
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
.title {
    background: #687dbb;
    width: 95%;
    margin: 0 auto;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    font-weight: bold;
    // text-align: center;
    color: white;
}

.box {
    width: 95%;
    margin: 0 auto;
    height: 200px;
    position: relative;
    border: 1px solid #687dbb;
    box-shadow: 0 0 5px #ccc;
    overflow: hidden;
    overflow-y: auto;
}

.box .li {
    width: 100%;
    height: 50px;
    font-weight: bold;
    text-align: center;
    line-height: 50px;
    border: 1px solid #687dbb;

    div {
        display: flex;
        width: 100%;
        padding-left: 15px;
    }
}

.li_box {
    animation: li_move 30s linear 1s infinite;

    img {
        width: 20px;
    }
}

@keyframes li_move {
    0% {
        transform: translateY(0%);
    }

    100% {
        /* 此处50px 与上面设置的高度相对应 */
        transform: translateY(calc((100% - 50px)*-1));
    }
}

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
        font-size: 16px;
    }
}

.b {
    display: flex;
    margin: 5px 0;
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
    margin: 0 3px;

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
