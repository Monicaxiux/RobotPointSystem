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
          <label>点检周期</label>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
          <label>点检状态</label>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="form_item">
        <div class="inp">
          <label>设备编码</label>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <div class="inp">
        </div>
      </div>
      <div class="form_item2">
        点检任务时间：2022.12.01
      </div>

    </div>
    <div class="tableBox">
      <el-table :row-style="{ height: '30px' }" align="center" :cell-style="{ padding: '0px' }" :data="tableData" border
        style="width: 100%;font-size: 0.6rem">
        <el-table-column prop="date" width="35" label="序号">
        </el-table-column>
        <el-table-column prop="name" width="45" label="项目">
        </el-table-column>
        <el-table-column prop="address" width="45" label="周期">
        </el-table-column>
        <el-table-column prop="address" width="65" label="检状态">
        </el-table-column>
        <el-table-column prop="address" width="63" label="检查">
          <template slot-scope="scope">
            <van-button style="width: 40px;" @click="handleEdit(scope.$index, scope.row)" size="mini" plain
              type="info">检查</van-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" width="65" label="修状态">
        </el-table-column>
        <el-table-column prop="address" width="63" label="修复">
          <template slot-scope="scope">
            <van-button style="width: 40px;" @click="handleEdit(scope.$index, scope.row)" size="mini" plain
              type="info">修复</van-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pag">
      <el-pagination background layout="prev, pager, next" :total="50">
      </el-pagination>
    </div>
    <div class="chart">
      <div id="myChart" style="height:100%;width:100%;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckingToDo",
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
      option: {
        // legend: {
        //   top: 'bottom'
        // },
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
              { value: 40, name: 'rose 1' },
              { value: 38, name: 'rose 2' },
              { value: 32, name: 'rose 3' },
              { value: 30, name: 'rose 4' },
              { value: 28, name: 'rose 5' },
              { value: 26, name: 'rose 6' },
              { value: 22, name: 'rose 7' },
              { value: 18, name: 'rose 8' }
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
    this.drawLine();
  },

  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption(this.option);
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