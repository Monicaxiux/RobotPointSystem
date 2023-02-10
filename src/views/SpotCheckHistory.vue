<template>
  <div>
    <div class="form">
      <div class="form_item">
        <div class="inp">
          <label>分厂</label>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="inp">
          <label>机组</label>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="form_item">
        <div class="inp">
          <label>设备类型</label>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="inp">
          <label>点检状态</label>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="form_item">
        <div class="inp">
          <label>点检时间</label>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="inp">
          <label>点检周期</label>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="form_item2">

      </div>

    </div>
    <div class="tableBox">
      <el-table :row-style="{ height: '30px' }" align="center" :cell-style="{ padding: '0px' }" :data="tableData" border
        style="width: 100%;font-size: 0.6rem">
        <el-table-column prop="date" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="项目">
        </el-table-column>
        <el-table-column prop="address" label="日期">
        </el-table-column>
        <el-table-column prop="address" label="状态">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <van-button style="width: 40px;" @click="handleEdit(scope.$index, scope.row)" size="mini" plain
              type="info">查看</van-button>
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
export default {
  name: "SpotCheckHistory",
  data() {
    return {
      my: this.$myStore(), //使用Pinia的值
      value: '',
      input: '',
      tableData: [
        {
          date: '1',
          address: 'q',
          name: 'qwe'
        },
        {
          date: '1',
          address: 'q',
          name: 'qwe'
        },
        {
          date: '1',
          address: 'q',
          name: 'qwe'
        }
      ],
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
    this.my.title = "点检历史"; //页面标题
    this.my.left = true; //NavBar是否开启返回按键
    this.my.isNavBar = true; //是否开启NavBar
    this.my.isTabBar = false; //是否开启TabBar
  },

  methods: {},
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