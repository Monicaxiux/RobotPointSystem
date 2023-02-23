<template>
  <div>
    <van-grid style="margin-top: 5px" square column-num="3" :gutter="5">
      <van-grid-item icon="newspaper-o" to="/checkingToDo" @click="my.scheduling = 1" text="点检待办事项" />
      <van-grid-item icon="notes-o" to="/projectMaintenance" @click="my.scheduling = 2" text="点检项维护" />
      <van-grid-item icon="exchange" to="/spotCheckHistory" @click="my.scheduling = 3" text="点检历史" />
      <van-grid-item icon="exchange" to="/AutoInfo" @click="my.scheduling = 9" text="设备资料管理" />
      <van-grid-item icon="exchange" to="/AutoInfo" @click="my.scheduling = 10" text="设备维护FAQ" />
      <van-grid-item icon="edit" to="/precisionMaintenance" @click="my.scheduling = 4" text="精密维护" />
      <van-grid-item icon="shrink" to="/scheduling" @click="my.scheduling = 5" text="维护历史" />
      <van-grid-item icon="description" to="/scheduling" @click="my.scheduling = 6" text="备件查询" />
      <van-grid-item icon="records" to="/rollInfo" text="备件领用记录" />
      <van-grid-item icon="photo-o" to="/scheduling" @click="my.scheduling = 8" text="备件采购管理" />
      <van-grid-item icon="photo-o" to="/scheduling" @click="my.scheduling = 8" text="权限管理" />
    </van-grid>
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

  methods: {},
};
</script>

<style scoped>
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

.demo-1 {
  color: #2196f3;
  border: 1px solid #2196f3;
}
</style>