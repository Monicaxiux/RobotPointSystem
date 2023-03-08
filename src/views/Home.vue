<template>
  <div>
    <div class="box">
      <span>点检管理</span><br />
      <div class="box_nr">
        <div @click="toRoute('/checkingToDo', 1)">
          <img style="width: 100%;" src="../assets/icon/b.svg" />
          <br />
          待办事项
        </div>
        <div @click="toRoute('/projectMaintenance', 2)">
          <img style="width: 100%;" src="../assets/icon/a.svg" />
          <br />
          项次维护
        </div>
        <div @click="toRoute('/spotCheckHistory', 3)">
          <img style="width: 100%;" src="../assets/icon/c.svg" />
          <br />
          点检历史
        </div>
      </div>
      <!-- <van-grid style="margin-top: 5px" square column-num="3" :gutter="5">
        <van-grid-item icon="newspaper-o" to="/checkingToDo" @click="my.scheduling = 1" text="点检待办事项" />
        <van-grid-item icon="notes-o" to="/projectMaintenance" @click="my.scheduling = 2" text="点检项维护" />
        <van-grid-item icon="exchange" to="/spotCheckHistory" @click="my.scheduling = 3" text="点检历史" />
      </van-grid> -->
    </div>
    <div class="box">
      <span>备件管理</span><br />
      <div class="box_nr">
        <div>
          <img style="width: 100%;" src="../assets/icon/d.svg" />
          <br />
          备件查询
        </div>
        <div>
          <img style="width: 100%;" src="../assets/icon/e.svg" />
          <br />
          采购管理
        </div>
        <div>
          <img style="width: 100%;" src="../assets/icon/f.svg" />
          <br />
          领用记录
        </div>
      </div>
      <!-- <h2></h2>
      <van-grid style="margin-top: 5px" square column-num="3" :gutter="5">
        <van-grid-item icon="description" to="/scheduling" @click="my.scheduling = 6" text="备件查询" />
        <van-grid-item icon="records" to="/rollInfo" text="备件领用记录" />
        <van-grid-item icon="photo-o" to="/scheduling" @click="my.scheduling = 8" text="备件采购管理" />
        <van-grid-item icon="photo-o" to="/scheduling" @click="my.scheduling = 8" text="权限管理" />
      </van-grid> -->
    </div>
    <div class="box">
      <span>精密维护</span><br />
      <div class="box_nr">
        <div @click="toRoute('/precisionMaintenance', 4)">
          <img style="width: 100%;" src="../assets/icon/g.svg" />
          <br />
          精密维护
        </div>
        <div @click="toRoute('/preservingHistory', 5)">
          <img style="width: 100%;" src="../assets/icon/h.svg" />
          <br />
          维护历史
        </div>
      </div>
      <!-- <h2></h2>
      <van-grid style="margin-top: 5px" square column-num="3" :gutter="5">
        <van-grid-item icon="edit" to="/precisionMaintenance" @click="my.scheduling = 4" text="精密维护" />
        <van-grid-item icon="shrink" to="/preservingHistory" @click="my.scheduling = 5" text="维护历史" />
      </van-grid> -->
    </div>
    <div class="box">
      <span>设备管理</span><br />
      <div class="box_nr">
        <div>
          <img style="width: 100%;" src="../assets/icon/i.svg" />
          <br />
          资料管理
        </div>
        <div>
          <img style="width: 100%;" src="../assets/icon/j.svg" />
          <br />
          设备维护
        </div>
      </div>
      <!-- <h2></h2>
      <van-grid style="margin-top: 5px" square column-num="3" :gutter="5">
        <van-grid-item icon="exchange" to="/AutoInfo" @click="my.scheduling = 9" text="设备资料管理" />
        <van-grid-item icon="exchange" to="/AutoInfo" @click="my.scheduling = 10" text="设备维护FAQ" />
      </van-grid> -->
    </div>

    <br />
    <br />
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      my: this.$myStore(), //使用Pinia的值
    };
  },
  mounted() {
    this.my.title = "宝武机器人点检系统"; //页面标题
    this.my.left = false; //NavBar是否开启返回按键
    this.my.isNavBar = true; //是否开启NavBar
    this.my.isTabBar = true; //是否开启TabBar
  },

  methods: {
    toRoute(to, i) {
      this.my.scheduling = i;
      this.$router.push({ path: to });
    }
  },
};
</script>

<style scoped>
/deep/ .van-grid-item__icon {
  font-size: 28px;
  color: #1989fa;
}

.box_nr {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.box_nr div {
  width: 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.mu-ripple-demo {
  position: relative;
  width: 200px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  background-color: #fff;
  border-radius: 4px;
}

span {
  margin-left: 5px;
  font-size: 15px;
  width: 100%;
  display: block;
  color: #687dbb;
  font-weight: bold;
  padding: 5px 0;
  border-bottom: 1px dashed #697dba80;
}

.box {
  width: 95%;
  margin: 14px auto;
  padding: 10px;
  text-align: center;
  border: 1px solid #ededed;
  border-radius: 10px;
  box-shadow: 0 0 12px 0px #929ec22b inset;
}

.demo-1 {
  color: #2196f3;
  border: 1px solid #2196f3;
}
</style>