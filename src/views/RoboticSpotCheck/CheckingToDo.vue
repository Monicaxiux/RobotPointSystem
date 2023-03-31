<template>
  <div>
    <div class="form">
      <div class="form_item">
        <div class="inp">
          <label>扫描设备码</label>
          <img @click="toQrCode" style="width: 20%;margin-left: 10px;" src="../../assets/icon/qrCode.svg" />
        </div>
        <div class="inp">
          <label>宝罗工号</label>
          <el-input v-model="from.baoRobotNumber" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="form_item">
        <van-button @click="(selectnew(), my.code = '')" style="width: 60%;margin-left: 10px;" size="small"
          type="info">查询</van-button>
        <van-button @click="clear" style="width: 60%;margin-left: 10px;background-color: white;color: #687dbb;"
          size="small" type="info">清空</van-button>
        <van-button @click="$router.push({ path: '/projectDetails' }), my.itemStatus = 3"
          style="width: 60%;margin:0 10px;" size="small" type="info">新增临时项次</van-button>
      </div>
      <div class="form_item2">
        点检任务时间：{{ time }}
        <div v-if="deviceInfo">
          设备名称：{{ deviceInfo.deviceName }}<br />设备机组：{{ deviceInfo.productionLine }}
        </div>
      </div>
    </div>
    <div class="tableBox">
      <el-table :row-style="{ height: '30px' }" align="center" :cell-style="{ padding: '0px' }" :data="tableData" border
        style="width: 100%;font-size: 0.6rem">
        <!-- <el-table-column type="index" width="35" label="序号">
        </el-table-column> -->
        <el-table-column prop="checkTitle" label="项目">
        </el-table-column>
        <el-table-column prop="checkCycle" width="45" label="周期">
        </el-table-column>
        <el-table-column prop="checkStatus" width="65" label="检状态">
        </el-table-column>
        <el-table-column prop="address" width="63" label="检查">
          <template slot-scope="scope">
            <van-button style="width: 40px;" @click="handleEdit(scope.$index, scope.row, 1)" size="mini" plain
              type="info">检查</van-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="address" width="65" label="修状态">
        </el-table-column>
        <el-table-column prop="address" width="63" label="修复">
          <template slot-scope="scope">
            <van-button style="width: 40px;" @click="handleEdit(scope.$index, scope.row)" size="mini" plain
              type="info">修复</van-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="pag">
      <el-pagination :page-size="15" background @current-change="handleCurrentChange" :current-page="currentPage"
        layout="prev, pager, next,total" :total="dataCount">
      </el-pagination>
    </div>
    <div class="chart">
      <div id="myChart" style="height:100%;width:100%;"></div>
    </div>
  </div>
</template>

<script>
import { queryallline, querysimpleinfo, newestrecord } from '@/api/rollers'
export default {
  name: "CheckingToDo",
  data() {
    return {
      my: this.$myStore(), //使用Pinia的值
      value: '',
      Branch: '宝日汽车板',
      input: '',
      time: '',
      deviceId: 0,
      dataCount: null,
      deviceInfo: null,
      currentPage: 0,
      line: '',
      from: {
        // deviceId: '',
        baoRobotNumber: '',
        // deviceNumber: '',
        checkStatus: 0,
        checkCycle: 1,
        // recordNumber: '',
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
      }],
      option: {
        title: {
          text: '',
          subtext: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left'
        // },
        series: [
          {
            name: '统计',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  activated() {
    this.from.pageNum = 1
    if (this.my.chakData) {
      console.log(this.my.chakData);
      this.from.baoRobotNumber = this.my.chakData[0]
      this.from.checkStatus = this.my.chakData[1]
      this.from.checkCycle = this.my.chakData[2]
    }
    this.selectnew();
    this.my.title = "日常点检"; //页面标题
    this.my.left = true; //NavBar是否开启返回按键
    this.my.isNavBar = true; //是否开启NavBar
    this.my.isTabBar = true; //是否开启TabBar
    // this.my.code = '';
    this.drawLine();
    console.log(this.my.code, 'aaaa扫码结果');
    queryallline().then((res) => {
      console.log(res.result);
      this.lineList = res.result.line;
    })
  },
  mounted() {
    this.my.title = "日常点检"; //页面标题
    this.my.left = true; //NavBar是否开启返回按键
    this.my.isNavBar = true; //是否开启NavBar
    this.my.isTabBar = true; //是否开启TabBar
    // this.my.code = '';
    this.drawLine();
    console.log(this.my.code, 'aaa扫码结果');
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
      this.my.code = '';
      this.my.chakData = null;
      this.tableData = []
      this.option.series[0].data = []
      this.drawLine();
      // this.from.deviceId = ''
      // this.from.deviceNumber = ''
      delete this.from.checkStatus
      delete this.from.checkCycle
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
    // 底部线图
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption(this.option);
    },
    // 查询机组下设备列表
    selectline(i) {
      this.tableData = []
      // this.from.deviceId = ''
      // this.from.deviceNumber = ''
      // this.from.baoRobotNumber = ''
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
      this.$eiInfo.parameter = JSON.parse(JSON.stringify(this.from))
      this.$eiInfo.parameter.deviceId = this.deviceId;
      this.$eiInfo.parameter.code = this.my.code;
      newestrecord(this.$eiInfo).then((res) => {
        if (res.sys.status == 1) {
          if (res.sys.msg == '点检项次') {
            console.log('');
          } else {
            this.$notify({ type: "warning", message: res.sys.msg })
          }
        }
        this.tableData = res.result.record
        this.time = res.result.checkRecordDate
        this.dataCount = res.result.dataCount
        this.deviceInfo = res.result.deviceInfo[0]
        this.option.series[0].data = res.result.countFinish
        this.drawLine();
      })
    },
    handleEdit(i, row, s) {
      switch (s) {
        case 1:
          this.my.recordId = row.recordId;
          this.$router.push({ path: "/toDoDetails" });
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