<template>
  <div>
    <NavBar v-show="my.isNavBar"></NavBar>
    <!-- <transition :name="transitionName"> -->
    <!-- <KeepAlive> -->
    <!-- <router-view class="rView" /> -->
    <!-- </KeepAlive> -->
    <keep-alive>
      <router-view class="rView" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view class="rView" v-if="!$route.meta.keepAlive" />
    <!-- </transition> -->
    <van-tabbar v-show="my.isTabBar" route v-model="active" @change="onChange">
      <van-tabbar-item replace to="/home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">查询</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "Tabbar",
  data() {
    return {
      transitionName: "", //动画昵称，左划或右划
      active: 0, //用于绑定Tabbar
      my: this.$myStore(), //使用Pinia的值
    };
  },
  components: {
    NavBar: NavBar,
  },
  created() { },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      to.meta.index > from.meta.index
        ? //设置动画名称
        (this.transitionName = "slide-left")
        : (this.transitionName = "slide-right");
    },
  },
  mounted() { },
  methods: {
    // 选中Tabbar事件
    onChange(index) {
      this.active = index;
    },
  },
};
</script>
<style>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 300ms;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.rView {
  height: 92vh;
  overflow-y: auto;
  margin-top: 47px;
}
</style>
