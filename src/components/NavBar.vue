<template>
  <div id="NavBar">
    <van-nav-bar :title="my.title" :left-arrow="my.left" @click-left="onClickLeft" />
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      my: this.$myStore(), //使用Pinia的值
    };
  },
  methods: {
    // 返回上一页
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  mounted() { },
};
</script>

<style scoped>
/deep/ .van-nav-bar__title {
  max-width: 60%;
  margin: 0 auto;
  color: white;
  font-weight: bold;
  font-size: 16px;
}

/deep/ .van-nav-bar {
  background-color: #4f68b0db;
}

/deep/ .van-nav-bar__content {
  height: 40px;
}

/deep/ .van-nav-bar .van-icon {
  color: white;
}

#NavBar {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2;
  background-color: white;
  /* background: linear-gradient(#338aff, #3cf0c5); */
}
</style>