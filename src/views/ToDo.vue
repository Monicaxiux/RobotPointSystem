<template>
    <div>
        <van-tabs @click="onClick">
            <van-tab title="设备点检">
                <div class="form">
                    <div class="form_item">
                        <div class="inp">
                            <label>分厂</label>
                            <el-input v-model="factoryId" disabled placeholder="请输入内容"></el-input>
                        </div>
                        <div class="inp">
                            <label>机组</label>
                            <el-select @change="selectline" v-model="line" placeholder="请选择">
                                <el-option v-for="item in lineList" :key="item.lineId" :label="item.lineName"
                                    :value="item.lineId">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form_item">
                        <div class="inp">
                            <label>设备名称</label>
                            <el-select @change="selectdevice" v-model="from.deviceId" placeholder="请选择">
                                <el-option v-for="(item, i) in deviceList" :key="item.deviceId" :label="item.deviceName"
                                    :value="i">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="inp">
                            <label>设备工号</label>
                            <el-input v-model="from.baoRobotNumber" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="form_item">
                        <div class="inp">
                            <label>设备编码</label>
                            <el-input v-model="from.deviceNumber" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="inp">
                            <label>点检状态</label>
                            <el-select @change="getData" v-model="from.checkStatus" placeholder="请选择">
                                <el-option v-for="item in checkStatusList" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form_item">
                        <div class="inp">
                            <label>扫描设备码</label>
                            <img @click="toQrCode" style="width: 20%;margin-left: 10px;" src="../assets/icon/qrCode.svg" />
                        </div>
                        <div class="inp">
                            <label>点检周期</label>
                            <el-select @change="getData" v-model="from.checkCycle" placeholder="请选择">
                                <el-option v-for="item in checkCycleList" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form_item">
                        <van-button @click="(getData(), my.code = '')" style="width: 60%;margin-left: 10px;" size="small"
                            type="info">查询</van-button>
                        <van-button @click="clear" style="width: 60%;margin:0 10px;background-color: white;color: #687dbb;"
                            size="small" type="info">清空</van-button>
                    </div>
                    <div class="form_item">
                        <div v-for="item in tableData" :key="item" class="boxnr">
                            <h4>点检项次&nbsp;&nbsp;<a>待点检</a></h4>
                            <h4>分厂&nbsp;&nbsp;<span>{{ item.factory }}</span></h4>
                            <h4>设备&nbsp;&nbsp;<span>{{ item.deviceName }}</span></h4>
                            <h4>点检标题&nbsp;&nbsp;<span>{{ item.checkTitle }}</span></h4>
                            <!-- <h4>点检内容&nbsp;&nbsp;<span>待点检</span></h4> -->
                            <van-button @click="toDis(item)" style="width: 50%;float: right;" size="small"
                                type="info">点检</van-button>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="精密维护">
                <p style="text-align: center;">暂无内容</p>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import { recordtobedone, querysimpleinfo, queryallline } from "@/api/rollers";
export default {
    name: "Todo",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            factoryId: '宝日汽车板',
            from: {
                factoryId: 0,
                productionLineId: 0,
                checkCycle: "",
                deviceId: "",
                deviceNumber: "",
                baoRobotNumber: "",
                pageNum: 1
            },
            checkCycleList: [{
                value: 1,
                label: '日'
            }, {
                value: 2,
                label: '周'
            }, {
                value: 3,
                label: '月'
            }],
            checkStatusList: [{
                value: 0,
                label: '未检查'
            }, {
                value: 1,
                label: '待修复'
            }, {
                value: 2,
                label: '已完成'
            }],
            lineList: [],
            deviceList: [],
            line: '',
            tableData: []
        }
    },
    mounted() {
        this.my.title = "待办事项"; //页面标题
        this.my.left = false; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar
        this.getData();
        queryallline().then((res) => {
            console.log(res.result);
            this.lineList = res.result.line;
        })
    },
    methods: {
        getData() {
            this.$eiInfo.parameter = this.from;
            this.$eiInfo.userInfo = {
                id: this.my.userInfo.id
            }
            recordtobedone(this.$eiInfo).then((res) => {
                this.tableData = res.result.result;
            })
        },
        clear() {
            this.tableData = []
            this.from.deviceId = ''
            this.from.deviceNumber = ''
            this.deviceInfo = null
            this.from.baoRobotNumber = ''
            this.from.pageNum = 1
            this.line = ''
            this.dataCount = null
        },
        // 扫码
        toQrCode() {
            this.clear();
            this.$router.push({ path: '/test' })
        },
        onClick(name, title) {
            console.log(title);
        },
        // 查询机组下设备列表
        selectline(i) {
            this.tableData = []
            this.from.deviceId = ''
            this.from.deviceNumber = ''
            this.from.baoRobotNumber = ''
            this.dataCount = null
            this.$eiInfo.parameter = {
                productionLine: i
            }
            querysimpleinfo(this.$eiInfo).then((res) => {
                console.log(res.result.deviceList);
                this.deviceList = res.result.deviceList;
            })
        },
        // 设备名称选择事件
        selectdevice(i) {
            console.log(i);
            this.from.baoRobotNumber = this.deviceList[i].baoRobotNumber
            this.from.deviceNumber = this.deviceList[i].deviceNumber
            this.deviceId = this.deviceList[i].deviceId
            this.getData();
        }
    }
}
</script>
<style scoped lang="less">
.boxnr {
    width: 95%;
    padding: 15px;

    border: 1px solid #687dbb;

    h4 {
        padding: 0;
        margin: 0;

        span {
            font-size: 12px;
            color: #646464;
            font-weight: 100;
        }
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
