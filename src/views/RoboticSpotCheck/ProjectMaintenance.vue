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
            <el-option v-for="(item, i) in deviceList" :key="item.deviceId" :label="item.deviceName"
              :value="item.deviceId">
            </el-option>
          </el-select>
        </div>
        <div class="inp">
        </div>
      </div>
      <div class="form_item2">
        <van-button plain hairline @click="$router.push({ path: '/addEquipment' }), my.itemStatus = true" size="mini"
          type="info">添加点检设备</van-button>
        <van-button plain hairline :disabled="from.deviceId ? false : true"
          @click="$router.push({ path: '/addEquipment' }), my.itemStatus = false" size="mini"
          type="info">编辑点检设备</van-button>
        <van-button plain hairline @click="handleEdit(0, 1)" size="mini" type="info">添加点检项目</van-button>
      </div>

    </div>
    <div class="tableBox">
      <el-table :row-style="{ height: '30px' }" align="center" :cell-style="{ padding: '0px' }" :data="tableData" border
        style="width: 100%;font-size: 0.6rem">
        <!-- <el-table-column type="index" width="35" label="序号">
        </el-table-column> -->
        <el-table-column prop="checkTitle" label="项目">
        </el-table-column>
        <el-table-column prop="checkCycle" width="65" label="类型">
        </el-table-column>
        <el-table-column prop="checkDetails" label="内容">
        </el-table-column>
        <el-table-column prop="address" width="65" label="操作">
          <template slot-scope="scope">
            <van-button style="width: 40px;" @click="handleEdit(scope.row, 2)" size="mini" plain
              type="info">编辑</van-button>
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
      dataCount: null,
      currentPage: 1,
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
  activated() {
    this.selectnew();
    this.my.title = "点检项目维护"; //页面标题
    this.my.left = true; //NavBar是否开启返回按键
    this.my.isNavBar = true; //是否开启NavBar
    this.my.isTabBar = true; //是否开启TabBar

    queryallline().then((res) => {
      console.log(res.result);
      this.lineList = res.result.line;
    })
  },
  mounted() {
    this.my.title = "点检项目维护"; //页面标题
    this.my.left = true; //NavBar是否开启返回按键
    this.my.isNavBar = true; //是否开启NavBar
    this.my.isTabBar = true; //是否开启TabBar

    queryallline().then((res) => {
      console.log(res.result);
      this.lineList = res.result.line;
    })
  },

  methods: {
    handleCurrentChange(val) {
      this.from.pageNum = val;
      console.log(val);
      this.selectnew();
    },
    handleEdit(row, s) {
      if (s == 1) {
        this.my.itemStatus = true;
      } else {
        this.my.itemId = row.itemId;
        this.my.deviceId = this.from.deviceId;
        this.my.itemStatus = false;
      }
      this.$router.push({ path: "/projectDetails" });
    },
    // 查询机组下设备列表
    selectline(i) {
      this.dataCount = null
      this.tableData = []
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
      this.my.deviceId = i
      this.selectnew();
    },
    selectnew() {
      this.$eiInfo.parameter = {
        deviceId: this.from.deviceId,
        pageNum: this.from.pageNum
      }
      itempartinfo(this.$eiInfo).then((res) => {
        this.tableData = res.result.result;
        this.dataCount = res.result.dataCount
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
</style>