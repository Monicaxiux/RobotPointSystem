<template>
  <div>
    <br /><br /><br /><br />
    <van-empty image="network" description="请检查您的网络连接">
      <van-button round type="danger" @click="go" class="bottom-button"
        >点击重试</van-button
      >
    </van-empty>
  </div>
</template>

<script>
export default {
  name: "Error",

  data() {
    return {
      my: this.$myStore(),
    };
  },

  mounted() {
    this.my.isTabBar = false; //是否开启TabBar
    this.my.isNavBar = false; //是否开启NavBar
  },

  methods: {
    // 点击重试
    go() {
      !this.my.onLine ? this.$toast("请连接网络") : this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>