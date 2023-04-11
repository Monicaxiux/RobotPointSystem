<template>
    <div>
        <div class="form">
            <div class="form_item">
                <div class="inp">
                    <label>公司</label>
                    <el-select @change="selectline" v-model="from.companyId" placeholder="请选择">
                        <el-option v-for="item in lineList" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div class="inp">
                    <label>部门</label>
                    <el-select @change="selectdevice" v-model="from.departmentId" placeholder="请选择">
                        <el-option v-for="item in deviceList" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="form_item">
                <div class="inp">
                    <label>组</label>
                    <el-select @change="selectnew" v-model="from.groupId" placeholder="请选择">
                        <el-option v-for="item in groupList" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div class="inp">
                    <label>工号</label>
                    <el-input v-model="from.workNumber" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div class="form_item">
                <div class="inp">
                    <label>姓名</label>
                    <el-input v-model="from.username" placeholder="请输入姓名"></el-input>
                </div>
                <div class="inp">
                    <label>查询</label>
                    <van-button @click="selectnew" style="width: 60%;margin-left: 10px;" size="small"
                        type="info">查询</van-button>
                    <van-button @click="clear"
                        style="width: 60%;margin-left: 10px;background-color: white;                                                                                                                                                                                                                                                                                    color: #687dbb;"
                        size="small" type="info">清空</van-button>
                </div>
            </div>
            <div class="form_item">
                <div class="inp">
                    <van-button @click="handleEdit(null, null, 2)" style="width: 60%;" size="small"
                        type="info">新增员工</van-button>
                </div>
                <div class="inp">


                </div>
            </div>
        </div>
        <div class="tableBox">
            <el-table :row-style="{ height: '30px' }" align="center" :cell-style="{ padding: '0px' }" :data="tableData"
                border style="width: 100%;font-size: 0.6rem">
                <el-table-column prop="workNumber" label="工号">
                </el-table-column>
                <el-table-column prop="username" label="姓名">
                </el-table-column>
                <el-table-column width="63" label="操作">
                    <template slot-scope="scope">
                        <van-button style="width: 40px;" @click="handleEdit(scope.$index, scope.row, 1)" size="mini" plain
                            type="info">详情</van-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pag">
            <el-pagination background :page-size="15" @current-change="handleCurrentChange" :current-page="currentPage"
                layout="prev, pager, next,total" :total="dataCount">
            </el-pagination>
        </div>
        <div class="chart">
            <div id="myChart" style="height:100%;width:100%;"></div>
        </div>
        <br />
        <br />
    </div>
</template>

<script>
import { queryallline, grouplist, departmentlist, companylist, querysimpleinfo, userinfopart } from '@/api/rollers'
export default {
    name: "CheckingToDo",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            value: '',
            Branch: '宝日汽车板',
            input: '',
            show: false,
            show2: false,
            deviceId: 0,
            lines: '',
            linex: '',
            line: '',
            dataCount: null,
            currentPage: 1,
            from: {
                username: "",
                workNumber: "",
                companyId: '',
                departmentId: '',
                groupId: '',
                pageNum: 1
            },//搜索条件
            lineList: [],//机组下拉框
            deviceList: [],//设备名称下拉框
            tableData: [],
            groupList: [],
            statistic: {},
        };
    },
    activated() {
        this.from.pageNum = 1
        this.selectnew();
        this.my.title = "员工管理"; //页面标题
        this.my.left = true; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar

        // this.my.code = '';
        companylist().then((res) => {
            console.log(res.result);
            this.lineList = res.result.companyList;
        })
    },
    mounted() {
        this.my.title = "员工管理"; //页面标题
        this.my.left = true; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar

        // this.my.code = '';
        companylist().then((res) => {
            console.log(res.result);
            this.lineList = res.result.companyList;
        })
    },

    methods: {
        clear() {
            this.tableData = []
            this.dataCount = null
            this.from.companyId = ''
            this.from.departmentId = ''
            this.from.groupId = ''
            this.from.pageNum = 1
        },
        handleCurrentChange(val) {
            this.from.pageNum = val;
            console.log(val);
            this.selectnew();
        },

        // 查询机组下设备列表
        selectline(i) {
            this.tableData = [];
            this.dataCount = null
            this.$eiInfo.parameter = {
                companyId: i
            }
            departmentlist(this.$eiInfo).then((res) => {
                this.deviceList = res.result.departmentList;
            })
        },
        // 设备名称选择事件
        selectdevice(i) {
            this.tableData = [];
            this.dataCount = null
            this.$eiInfo.parameter = {
                departmentId: i
            }
            grouplist(this.$eiInfo).then((res) => {
                this.groupList = res.result.groupList;
            })
            this.selectnew();
        },
        // 查询数据
        selectnew() {
            this.$eiInfo.parameter = JSON.parse(JSON.stringify(this.from))
            userinfopart(this.$eiInfo).then((res) => {
                this.tableData = res.result.result;
                this.dataCount = res.result.dataCount
                this.statistic = res.result.statistic
            })
        },
        handleEdit(i, row, s) {
            switch (s) {
                case 1:
                    this.my.userId = row.id;
                    this.my.itemStatus = 2;
                    this.$router.push({ path: "/UserEitd" });
                    break;
                case 2:
                    this.my.itemStatus = 1;
                    this.$router.push({ path: "/UserEitd" });
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

.van-button--info {
    color: #fff;
    background-color: #687dbb;
    border: 1px solid #687dbb;
}

/deep/.el-input {
    width: 110px !important;
    margin-left: 4px;
    height: 32px;
}

/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #687dbb;
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
</style>