<template>
  <div>
    <div class="form">
      <div class="form_item">
        <div class="inp">
          <label>分厂</label>
          <el-input v-model="Branch" disabled placeholder="请输入内容"></el-input>
        </div>
        <div class="inp">
          <label>机组</label>
          <el-select @change="selectline" v-model="line" placeholder="请选择">
            <el-option v-for="item in lineList" :key="item.lineId" :label="item.lineName" :value="item.lineId">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="form_item">
        <div class="inp">
          <label>设备名称</label>
          <el-select @change="selectdevice" v-model="from.deviceId" placeholder="请选择">
            <el-option v-for="(item, i) in deviceList" :key="item.deviceId" :label="item.deviceName" :value="i">
            </el-option>
          </el-select>
        </div>
        <div class="inp">
          <label>点检状态</label>
          <el-select @change="selectnew" v-model="from.checkStatus" placeholder="请选择">
            <el-option v-for="item in checkStatusList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="form_item">
        <div class="inp">
          <label>点检周期</label>
          <el-select @change="selectnew" v-model="from.checkCycle" placeholder="请选择">
            <el-option v-for="item in checkCycleList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="inp">
          <label>查询</label>
          <van-button @click="selectnew" style="width: 60%;margin-left: 10px;" size="small" type="info">查询</van-button>
          <van-button @click="clear" style="width: 60%;margin-left: 10px;background-color: white;
        color: #687dbb;" size="small" type="info">清空</van-button>
        </div>
      </div>
      <div class="form_item">
        <div class="inp">
          <label>起始时间</label>
          <van-cell :value="from.startDate" @click="show = true" />
          <van-calendar :min-date="new Date(2000, 0, 1)" :max-date="new Date(2100, 0, 31)" v-model="show"
            @confirm="onConfirm" />
        </div>
        <div class="inp">
          <label>结束时间</label>
          <van-cell :value="from.endDate" @click="show2 = true" />
          <van-calendar :min-date="new Date(2000, 0, 1)" :max-date="new Date(2100, 0, 31)" v-model="show2"
            @confirm="onConfirm2" />
        </div>
      </div>
    </div>
    <div class="tableBox">
      <el-table :row-style="{ height: '30px' }" align="center" :cell-style="{ padding: '0px' }" :data="tableData" border
        style="width: 100%;font-size: 0.6rem">
        <!-- <el-table-column type="index" width="35" label="序号">
        </el-table-column> -->
        <el-table-column prop="itemTitle" label="项目">
        </el-table-column>
        <el-table-column prop="checkDate" width="115" label="周期">
        </el-table-column>
        <el-table-column prop="checkStatus" width="65" label="检状态">
        </el-table-column>
        <el-table-column prop="address" width="63" label="详情">
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
    <br />
    <br />
  </div>
</template>

<script>
import { queryallline, querysimpleinfo, recordhistory } from '@/api/rollers'
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
      line: '',
      dataCount: null,
      currentPage: 1,
      from: {
        deviceId: '',
        baoRobotNumber: '',
        deviceNumber: '',
        checkStatus: 0,
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
      }]
    };
  },
  activated() {
    this.selectnew();
    this.my.title = "历史信息"; //页面标题
    this.my.left = true; //NavBar是否开启返回按键
    this.my.isNavBar = true; //是否开启NavBar
    this.my.isTabBar = true; //是否开启TabBar
    // this.my.code = '';
    queryallline().then((res) => {
      console.log(res.result);
      this.lineList = res.result.line;
    })
  },
  mounted() {
    this.my.title = "历史信息"; //页面标题
    this.my.left = true; //NavBar是否开启返回按键
    this.my.isNavBar = true; //是否开启NavBar
    this.my.isTabBar = true; //是否开启TabBar
    // this.my.code = '';
    queryallline().then((res) => {
      console.log(res.result);
      this.lineList = res.result.line;
    })
  },

  methods: {
    clear() {
      this.tableData = []
      this.dataCount = null
      this.from.deviceId = ''
      this.from.baoRobotNumber = ''
      this.from.pageNum = 1
      this.from.recordNumber = ''
      this.from.checkCycle = 1
      this.from.checkStatus = 0
      this.from.deviceNumber = ''

      this.from.endDate = ''
      this.from.startDate = ''
    },
    handleCurrentChange(val) {
      this.from.pageNum = val;
      console.log(val);
      this.selectnew();
    },
    formatDate(date) {
      console.log(date);
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let dateTime = y + '-' + m + '-' + d;
      return dateTime;
    },
    onConfirm(date) {
      this.show = false;
      this.from.startDate = this.formatDate(date);
      this.selectnew();
    },
    onConfirm2(date) {
      this.show2 = false;
      this.from.endDate = this.formatDate(date);
      this.selectnew();
    },
    // 扫码
    toQrCode() {
      this.$router.push({ path: '/test' })
    },
    // 查询机组下设备列表
    selectline(i) {
      this.tableData = [];
      this.dataCount = null
      this.from.deviceId = ''
      this.from.deviceNumber = ''
      this.from.baoRobotNumber = ''
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
      if (this.deviceId) {
        this.$eiInfo.parameter = JSON.parse(JSON.stringify(this.from))
        this.$eiInfo.parameter.deviceId = this.deviceId
        recordhistory(this.$eiInfo).then((res) => {
          this.tableData = res.result.result;
          this.dataCount = res.result.dataCount
        })
      }

    },
    handleEdit(i, row, s) {
      switch (s) {
        case 1:
          this.my.recordId = row.recordId;
          this.$router.push({ path: "/historyDetails" });
          break;
        case 2:

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