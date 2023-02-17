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

        </div>
      </div>
      <div class="form_item2">
        <van-button plain hairline size="mini" type="info">添加点检设备</van-button>
        <van-button plain hairline size="mini" type="info">添加点检项目</van-button>
      </div>

    </div>
    <div class="tableBox">
      <el-table :row-style="{ height: '30px' }" align="center" :cell-style="{ padding: '0px' }" :data="tableData" border
        style="width: 100%;font-size: 0.6rem">
        <el-table-column type="index" width="35" label="序号">
        </el-table-column>
        <el-table-column prop="checkTitle" label="项目">
        </el-table-column>
        <el-table-column prop="checkCycle" width="65" label="类型">
        </el-table-column>
        <el-table-column prop="checkDetails" label="内容">
        </el-table-column>
        <el-table-column prop="address" width="65" label="操作">
          <template slot-scope="scope">
            <van-button style="width: 40px;" @click="handleEdit(scope.$index, scope.row)" size="mini" plain
              type="info">编辑</van-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pag">
      <el-pagination background layout="prev, pager, next" :total="50">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { itempartinfo, queryallline, querysimpleinfo } from '@/api/rollers'
export default {
  name: "ProjectMaintenance",
  data() {
    return {
      my: this.$myStore(), //使用Pinia的值
      value: '',
      Branch: '宝日汽车板',
      input: '',
      line: '',
      tableData: [],
      lineList: [],//机组下拉框
      deviceList: [],//设备名称下拉框
      from: {
        deviceId: '',
        baoRobotNumber: '',
        deviceNumber: '',
        checkStatus: 0,
        checkCycle: 1,
        recordNumber: '',
        pageNum: 1
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
    };
  },
  mounted() {
    this.my.title = "点检项目维护"; //页面标题
    this.my.left = true; //NavBar是否开启返回按键
    this.my.isNavBar = true; //是否开启NavBar
    this.my.isTabBar = false; //是否开启TabBar

    queryallline().then((res) => {
      console.log(res.result);
      this.lineList = res.result.line;
    })
  },

  methods: {
    handleEdit(i, row) {
      this.my.itemId = row.itemId;
      this.$router.push({ path: "/projectDetails" });
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
      // this.from.baoRobotNumber = this.deviceList[i].baoRobotNumber
      // this.from.deviceNumber = this.deviceList[i].deviceNumber

      this.selectnew();
    },
    selectnew() {
      this.$eiInfo.parameter = {
        deviceId: this.from.deviceId,
        pageNum: 1
      }
      itempartinfo(this.$eiInfo).then((res) => {
        this.tableData = res.result.result;
      })
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