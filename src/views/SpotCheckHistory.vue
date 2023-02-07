<template>
    <div>
      
    </div>
  </template>
  
  <script>
  export default {
    name: "SpotCheckHistory",
    data() {
      return {
        my: this.$myStore(), //使用Pinia的值
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
  
  <style scoped>

  </style>