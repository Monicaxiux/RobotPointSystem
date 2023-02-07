<template>
  <div style="width: 95vw; height: 95vh" @mousedown.prevent>
    <input
      ref="inputData"
      class="input"
      @mousedown.stop
      v-model="codeValue"
      placeholder="识别内容"
    />
    识别结果：{{ value }}<br />
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      codeValue: "",
      value: "",
    };
  },
  created() {
    // dom加载完后让input获取焦点
    this.$nextTick(() => {
      this.$refs.inputData.focus();
    });
  },
  watch: {
    // 监听扫码识别出来的文本框内容
    codeValue(newVal, oldVal) {
      // 把旧的文本框数据删除，替换成新的内容
      oldVal != ""
        ? (this.value = newVal.replace(oldVal, ""))
        : (this.value = newVal);
    },
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.input {
  user-select: none;
  width: 0px;
  opacity: 0;
  position: fixed;
  top: -100px;
}
</style>