<template>
    <div>
        <div class="form">
            <div class="form_item">
                <div class="inp">
                    <label>机组</label>
                    <el-select style=" width: 110px !important;" @change="selectline" v-model="line" placeholder="请选择">
                        <el-option v-for="item in lineList" :key="item.lineId" :label="item.lineName" :value="item.lineId">
                        </el-option>
                    </el-select>
                </div>
                <div class="inp">
                    <label>设备名称</label>
                    <el-select style=" width: 110px !important;" @change="selectdevice" v-model="from.deviceId"
                        placeholder="请选择">
                        <el-option v-for="(item, i) in deviceList" :key="item.deviceId" :label="item.deviceName" :value="i">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="form_item">
                <div class="inp">
                    <label>审核类型</label>
                    <el-select style=" width: 110px !important;" @change="selectnew" v-model="from.auditItemType"
                        placeholder="请选择">
                        <el-option v-for="item in auditItemTypeList" :key="item.val" :label="item.name" :value="item.val">
                        </el-option>
                    </el-select>
                </div>
                <div class="inp">
                    <label>审核状态</label>
                    <el-select style=" width: 110px !important;" @change="selectnew" v-model="from.auditResult"
                        placeholder="请选择">
                        <el-option v-for="(item, i) in auditResultList" :key="item.val" :label="item.name"
                            :value="item.val">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="form_item">
                <div class="inp">
                    <label>宝罗工号</label>
                    <el-input style=" width: 110px !important;" v-model="from.baoRobotNumber"
                        placeholder="请输入内容"></el-input>
                </div>
                <div class="inp">
                    <label>设备编码</label>
                    <el-input style=" width: 110px !important;" v-model="from.deviceNumber" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <!-- <div class="form_item">
                <div class="inp">
                    <label>扫描设备码</label>
                    <img @click="toQrCode" style="width: 20%;margin-left: 10px;" src="../../assets/icon/qrCode.svg" />
                </div>
                <div class="inp">
                </div>
            </div> -->
            <div class="form_item">
                <div class="inp">
                    <label>起始时间</label>
                    <van-cell :value="from.startDate" @click="show = true" />
                    <van-calendar :min-date="new Date(2000, 0, 1)" :max-date="new Date(2100, 0, 31)" v-model="show"
                        @confirm="onConfirm2" />
                </div>
                <div class="inp">
                    <label>结束时间</label>
                    <van-cell :value="from.endDate" @click="show2 = true" />
                    <van-calendar :min-date="new Date(2000, 0, 1)" :max-date="new Date(2100, 0, 31)" v-model="show2"
                        @confirm="onConfirm3" />
                </div>
            </div>
            <div class="form_item">
                <van-button @click="selectnew" style="width: 60%;margin-left: 10px;" size="small"
                    type="info">查询</van-button>
                <van-button @click="clear" style="width: 60%;margin-left: 10px;background-color: white;color: #687dbb;"
                    size="small" type="info">清空</van-button>
            </div>
        </div>
        <div class="tableBox">
            <el-table :row-style="{ height: '30px' }" align="center" :cell-style="{ padding: '0px' }" :data="tableData"
                border style="width: 100%;font-size: 0.6rem">
                <el-table-column prop="handleType" label="审核类型">
                </el-table-column>
                <el-table-column prop="handleMsg" label="审核内容">
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template slot-scope="scope">
                        <van-button style="width: 50px;" @click="Edit(scope.row, 2)" size="mini" plain
                            type="info">详情</van-button>
                        <van-button style="width: 50px;background-color: red;border-color: red;" @click="Edit(scope.row, 3)"
                            size="mini" plain type="info">删除</van-button>

                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pag">
            <el-pagination :page-size="15" pager-count="6" background @current-change="handleCurrentChange"
                :current-page="currentPage" layout="prev, pager, next,total" :total="dataCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { queryallline, querysimpleinfo, maintainitemdelete, maintainitemadd, maintainitemupdate, auditqueryinfolist } from '@/api/rollers'
export default {
    name: "CheckingToDo",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            value: '',
            input: '',
            deviceId: 0,
            eline: '',
            edeviceId: '',
            dataCount: null,
            currentPage: 0,
            eshow: false,
            eStatus: 1,
            line: '',
            auditResultList: [
                { name: '待审核', val: 1 },
                { name: '已通过', val: 2 },
                { name: '已驳回', val: 3 },
            ],
            auditItemTypeList: [
                { name: '设备', val: 1 },
                { name: '点检', val: 2 },
                { name: '精密维护', val: 3 },
            ],
            eForm: {
                remark: '',
                nextMaintainDate: '',
                maintainDays: '',
                cycleInterval: '',
                maintainDetails: '',
                maintainTitle: '',
                deviceId: '',
                maintainCycle: null
            },
            show: false,
            from: {
                baoRobotNumber: '',
                auditItemType: 1,
                auditResult: 1,
                startDate: '',
                endDate: '',
                pageNum: 1
            },//搜索条件
            lineList: [],//机组下拉框
            deviceList: [],//设备名称下拉框
            edeviceList: [],//设备名称下拉框
            tableData: [
            ],
            maintainCycleList: [{
                value: 2,
                label: '周'
            }, {
                value: 3,
                label: '月'
            }, {
                value: 4,
                label: '年'
            },]
        }
    },
    activated() {
        this.from.pageNum = 1
        this.selectnew();
        this.my.title = "申请批假"; //页面标题
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
    watch: {
        'from.baoRobotNumber'(newVal) {
            if (newVal != "") {
                this.$eiInfo.parameter = {
                    productionLine: 0,
                    deviceNumber: "",
                    baoRobotNumber: newVal
                }
                querysimpleinfo(this.$eiInfo).then((res) => {
                    this.deviceList = res.result.deviceList
                    this.from.deviceId = res.result.deviceList[0].deviceName
                    this.deviceId = res.result.deviceList[0].deviceId
                    this.from.deviceNumber = res.result.deviceList[0].deviceNumber
                    this.selectnew();
                })
            } else {
                this.clear();
            }

        },
    },
    mounted() {
        this.my.title = "申请批假"; //页面标题
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
        onConfirm(date) {
            this.eshow = false;
            this.eForm.nextMaintainDate = this.formatDate(date);
        },
        onConfirm2(date) {
            this.show = false;
            this.from.startDate = this.formatDate(date);
            this.selectnew();
        },
        onConfirm3(date) {
            this.show2 = false;
            this.from.endDate = this.formatDate(date);
            this.selectnew();
        },
        formatDate(date) {
            let y = date.getFullYear()
            let m = date.getMonth() + 1
            m = m < 10 ? ('0' + m) : m
            let d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            let dateTime = y + '-' + m + '-' + d;
            console.log(dateTime);

            return dateTime;
        },
        confirm() {
            switch (this.eStatus) {
                case 1:
                    this.$eiInfo.parameter = this.eForm;
                    this.$eiInfo.parameter.deviceId = this.deviceId
                    maintainitemadd(this.$eiInfo).then(() => {
                        this.$toast.success('新增成功');
                        this.selectnew();
                    })
                    break;
                case 2:
                    this.$eiInfo.parameter = this.eForm;
                    maintainitemupdate(this.$eiInfo).then(() => {
                        this.$toast.success('修改成功');
                        this.selectnew();
                    })
                    break;
            }

        },
        Edit(row, i) {
            switch (i) {
                case 1:
                    this.eForm.deviceId = ''
                    this.eForm.remark = ''
                    this.eForm.nextMaintainDate = ''
                    this.eForm.maintainDays = ''
                    this.eForm.cycleInterval = ''
                    this.eForm.maintainCycle = ''
                    this.eForm.maintainDetails = ''
                    this.eForm.maintainTitle = ''
                    this.eForm.maintainCycle = null
                    this.eStatus = 1
                    this.show = true;
                    break;
                case 2:
                    this.show = true;
                    this.eStatus = 2
                    this.$eiInfo.parameter = {
                        itemId: row.itemId
                    }
                    console.log(row);
                    break;
                case 3:
                    this.$dialog.confirm({
                        title: '确认',
                        message: '是否删除？',
                    })
                        .then(() => {
                            this.$eiInfo.parameter = {
                                itemId: row.itemId
                            }
                            // maintainitemdelete(this.$eiInfo).then(() => {
                            //     this.$toast.success('删除成功');
                            //     this.selectnew();
                            // })
                        })

                    break;
            }
        },
        handleCurrentChange(val) {
            this.from.pageNum = val;
            this.selectnew();
        },
        clear() {
            this.tableData = []
            this.from.deviceId = ''
            this.from.deviceNumber = ''
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
                this.deviceList = res.result.deviceList;
            })
        },

        // 查询机组下设备列表
        eselectline(i) {
            this.eForm.deviceId = ''
            this.$eiInfo.parameter = {
                productionLine: i
            }
            querysimpleinfo(this.$eiInfo).then((res) => {
                this.edeviceList = res.result.deviceList;
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
            this.$eiInfo.parameter = JSON.parse(JSON.stringify(this.from))
            this.$eiInfo.parameter.deviceId = this.deviceId
            auditqueryinfolist(this.$eiInfo).then((res) => {
                this.tableData = res.result.result
                this.dataCount = res.result.dataCount
                // this.option.series[0].data = res.result.countFinish
            })

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

.van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    /* padding: 10px 16px; */
    margin-left: 10px;
    border-bottom: 1px solid;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;

    background-color: #fff;
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