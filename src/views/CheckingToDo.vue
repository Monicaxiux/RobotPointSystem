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
          <label>宝罗工号</label>
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
          <el-select @change="selectnew" v-model="from.checkStatus" placeholder="请选择">
            <el-option v-for="item in checkStatusList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="form_item">
        <div class="inp">
          <label>点检单号</label>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <div class="inp">
          <label>点检周期</label>
          <el-select @change="selectnew" v-model="from.checkCycle" placeholder="请选择">
            <el-option v-for="item in checkCycleList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="form_item">
        <div class="inp">
          <label>扫码</label>
          <van-button style="width: 60%;margin-left: 10px;" @click="toQrCode" size="small" type="info">扫码</van-button>
        </div>
        <div class="inp">
          <label>查询</label>
          <van-button @click="selectnew" style="width: 60%;margin-left: 10px;" size="small" type="info">查询</van-button>
        </div>
      </div>
      <div class="form_item2">
        点检任务时间：{{ time }}
      </div>
    </div>
    <div class="tableBox">
      <el-table :row-style="{ height: '30px' }" align="center" :cell-style="{ padding: '0px' }" :data="tableData" border
        style="width: 100%;font-size: 0.6rem">
        <el-table-column type="index" width="35" label="序号">
        </el-table-column>
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
      dataCount: 0,
      currentPage: 0,
      line: '',
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
      }],
      option: {
        toolbox: {
          show: false,
          feature: {
            mark: { show: false },
            dataView: { show: false, readOnly: false },
            restore: { show: false },
            saveAsImage: { show: false }
          }
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [40, 120],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: [
              { value: 40, name: '' },
              { value: 20, name: '' },
              { value: 39.5, name: '' },
              // { value: 30, name: 'rose 4' },
              // { value: 28, name: 'rose 5' },
              // { value: 26, name: 'rose 6' },
              // { value: 22, name: 'rose 7' },
              // { value: 18, name: 'rose 8' }
            ]
          }
        ]
      }
    };
  },

  mounted() {
    this.my.title = "点检待办事项"; //页面标题
    this.my.left = true; //NavBar是否开启返回按键
    this.my.isNavBar = true; //是否开启NavBar
    this.my.isTabBar = true; //是否开启TabBar
    // this.my.code = '';
    this.drawLine();
    setInterval(() => {
      let x = new Date();
      this.time = x.getFullYear() + '.' + (x.getMonth() + 1) + '.' + x.getDate() + '  ' + x.getHours() + ':' + x.getMinutes() + ':' + x.getSeconds()
    }, 1000)
    console.log(this.my.code, '扫码结果');
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
    // 扫码
    toQrCode() {
      this.$router.push({ path: '/test' })
    },
    // 底部线图
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption(this.option);
    },
    // 查询机组下设备列表
    selectline(i) {
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
      this.$eiInfo.parameter = JSON.parse(JSON.stringify(this.from))
      this.$eiInfo.parameter.deviceId = this.deviceId
      newestrecord(this.$eiInfo).then((res) => {
        this.tableData = res.result.record
        this.dataCount = res.result.dataCount
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

<style>
.form {
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  padding: 14px 0;
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

.el-input {
  width: 110px !important;
  margin-left: 4px;
  height: 32px;
}

.el-input__inner {
  width: 110px !important;
  margin-left: 4px;
  height: 32px;
}

.el-input--suffix .el-input__inner {
  width: 110px !important;
  margin-left: 4px;
  height: 32px;
}

.el-input__icon {
  height: 116%;
}
</style>