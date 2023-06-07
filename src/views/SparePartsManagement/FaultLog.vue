<template>
    <div>
        <div class="form">
            <div class="form_item">
                <div class="inp">
                    <label>机组</label>
                    <el-select @change="selectline" v-model="line" placeholder="请选择">
                        <el-option v-for="item in lineList" :key="item.lineId" :label="item.lineName" :value="item.lineId">
                        </el-option>
                    </el-select>
                </div>
                <div class="inp">
                    <label>设备名称</label>
                    <el-select @change="selectdevice" v-model="from.deviceId" placeholder="请选择">
                        <el-option v-for="(item, i) in deviceList" :key="item.deviceId" :label="item.deviceName" :value="i">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="form_item">
                <div class="inp">
                    <label>宝罗工号</label>
                    <el-input v-model="from.baoRobotNumber" placeholder="请输入内容"></el-input>
                </div>
                <div class="inp">
                    <label>设备编码</label>
                    <el-input v-model="from.deviceNumber" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <!-- <div class="form_item">
                <div class="inp">
                    <label>故障标题</label>
                    <el-input v-model="from.faultTitle" placeholder="请输入故障标题"></el-input>
                </div>
                <div class="inp">

                </div>
            </div> -->
            <div class="form_item">
                <div class="inp">
                    <label>扫描设备码</label>
                    <img @click="toQrCode" style="width: 20%;margin-left: 10px;" src="../../assets/icon/qrCode.svg" />
                </div>
                <div class="inp">
                    <label>查询</label>
                    <van-button @click="selectnew" style="width: 60%;margin-left: 10px;" size="small"
                        type="info">查询</van-button>
                    <van-button @click="clear"
                        style="width: 60%;margin-left: 10px;background-color: white;                                                                                                                                                               color: #687dbb;"
                        size="small" type="info">清空</van-button>
                </div>
            </div>
            <van-button :disabled="deviceId ? false : true" @click="handleEdit(null, null, 2)"
                style=" width: 30%;margin-left: 10px;" size="small" type="info">新增故障</van-button>
        </div>
        <div class="tableBox">
            <el-table :row-style="{ height: '30px' }" align="center" :cell-style="{ padding: '0px' }" :data="tableData"
                border style="width: 100%;font-size: 0.6rem">
                <!-- <el-table-column type="index" width="35" label="序号">
                </el-table-column> -->
                <el-table-column prop="faultTitle" label="名称">
                </el-table-column>
                <el-table-column prop="faultDetails" label="故障描述">
                </el-table-column>
                <el-table-column prop="faultTypicalStatus" label="状态">
                </el-table-column>
                <el-table-column prop="address" width="113" label="操作">
                    <template slot-scope="scope">
                        <van-button style="width: 40px;" @click="handleEdit(scope.$index, scope.row, 1)" size="mini" plain
                            type="info">编辑</van-button>
                        <van-button style="width: 40px;" @click="handleEdit(scope.$index, scope.row, 3)" size="mini"
                            type="danger">删除</van-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pag">
            <el-pagination :page-size="15" background @current-change="handleCurrentChange" :current-page="currentPage"
                layout="prev, pager, next,total" :total="dataCount">
            </el-pagination>
        </div>
        <br />
        <br />
        <br />
    </div>
</template>

<script>
import { queryallline, querysimpleinfo, faultqueryall, faultdeleterecord } from '@/api/rollers'
export default {
    name: "CheckingToDo",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            value: '',
            input: '',
            deviceId: 0,
            dataCount: null,
            currentPage: 0,
            line: '',
            from: {
                deviceId: '',
                baoRobotNumber: '',
                deviceNumber: '',
                checkCycle: 1,
                recordNumber: '',
                pageNum: 1
            },//搜索条件
            lineList: [],//机组下拉框
            deviceList: [],//设备名称下拉框
            tableData: [

            ],
            checkCycleList: [{
                value: 1,
                label: '日'
            }, {
                value: 2,
                label: '周'
            }, {
                value: 3,
                label: '月'
            }]
        }
    },
    activated() {
        this.from.pageNum = 1
        // this.selectnew();
        this.my.title = "故障记录"; //页面标题
        this.my.left = true; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar
        // this.my.code = '';

        console.log(sessionStorage.getItem('result'), 'aaaa扫码结果');

        queryallline().then((res) => {
            console.log(res.result);
            this.lineList = res.result.line;
        })
    },
    mounted() {
        this.my.title = "故障记录"; //页面标题
        this.my.left = true; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar
        // this.my.code = '';
        console.log(sessionStorage.getItem('result'), 'aaaa扫码结果');
        queryallline().then((res) => {
            console.log(res.result);
            this.lineList = res.result.line;
        })
    },

    methods: {
        handleCurrentChange(val) {
            this.from.pageNum = val;
            this.selectnew();
        },
        clear() {
            this.tableData = []
            this.from.deviceId = ''
            this.from.deviceNumber = ''
            this.from.baoRobotNumber = ''
            this.line = ''
            this.dataCount = null
        },
        // 扫码
        toQrCode() {
            this.$router.push({ path: '/test' })
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
            this.selectnew();
        },
        // 查询数据
        selectnew() {
            this.$eiInfo.parameter = {
                deviceId: this.deviceId,
                pageNum: this.from.pageNum
            }
            faultqueryall(this.$eiInfo).then((res) => {
                if (res.sys.status == 1) {
                    if (res.sys.msg == '点检项次') {

                    } else {
                        // this.$notify({ type: "warning", message: res.sys.msg })
                    }
                }
                this.tableData = res.result.faultList
                this.dataCount = res.result.dataCount
            })
        },
        handleEdit(i, row, s) {
            switch (s) {
                case 1:
                    this.my.itemStatus = 2;
                    this.my.faultId = row.faultId;
                    this.$router.push({ path: "/addFault" });
                    break;
                case 2:
                    this.my.itemStatus = 1;
                    this.my.deviceId = this.deviceId;
                    this.$router.push({ path: '/addFault' })
                    break;
                case 3:
                    this.$dialog.confirm({
                        title: '确认',
                        message: '是否删除？',
                    })
                        .then(() => {
                            this.$eiInfo.parameter = {
                                faultId: row.faultId
                            }
                            faultdeleterecord(this.$eiInfo).then((res) => {
                                if (res.sys.status == 1) {
                                    this.$notify({ type: "success", message: res.sys.msg })
                                    this.selectnew();
                                }
                            })
                        })
                        .catch(() => {
                            // on cancel
                        });
                    break;
            }
        }
    },
};
</script>

<style scoped>
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