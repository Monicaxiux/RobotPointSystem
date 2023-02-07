<template>
  <div>
    <Tabbar />
    <van-dialog v-model="show" :before-close="dialogClose" title="版本更新中...">
      <br>
      <div class="box">
        <van-circle v-model="progress" :rate="progress" :speed="100" :text="text" />
      </div>
      <br>
    </van-dialog>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar.vue"; //引入Tabbar组件
export default {
  name: "app",
  components: {
    Tabbar,
  },
  data() {
    return {
      show: false,
      progress: 0,
      my: this.$myStore(), //使用Pinia的值
      onLine: navigator.onLine, //  navigator.onLine 获取设备是否可以上网、连接网络
    };
  },
  computed: {
    text() {
      return this.progress.toFixed(0) + '%';
    },
  },
  created() {
    // 监听网络状态赋值给Pinia
    this.my.onLine = this.onLine;
    // 网络由异常到正常时触发
    window.addEventListener("online", this.updateOnlineStatus);
    // 网络由正常到异常触发
    window.addEventListener("offline", this.updateOfflineStatus);
    // 检测返回键，双击退出应用
    document.addEventListener("plusready", this.goBackStatus);
    // 检测输入框，获取焦点，自动将视角移动至可见位置
    window.addEventListener("resize", this.inputView);
    // 防止localStorage被手动篡改
    window.addEventListener("storage", (e) => {
      localStorage.setItem(e.key, e.oldValue);
    });
  },
  mounted() {
    // setTimeout(() => {
    //   this.updateApp();
    // }, 1000)
  },
  methods: {
    dialogClose(action, done) {
      switch (action) {
        case "cancel":
          // plus.runtime.quit()
          break;
        case "confirm":
          // this.updateApp();
          break;
      }
    },
    // 更新APP版本
    updateApp() {
      this.$toast("检测到新版本，已自动下载更新")
      this.progress = 0;
      console.log('下载来了');
      var dtask = plus.downloader.createDownload('https://ghproxy.com/https://github.com/Kr328/ClashForAndroid/releases/download/v2.5.12/cfa-2.5.12-premium-universal-release.apk', {}, (d, status) => {
        if (status == 200) {
          console.log("下载成功安装: " + d.filename);
          plus.runtime.install(d.filename)
        } else {
          console.log("安装失败，请稍候重试: " + status)
        }
      });
      // 下载任务状态变化事件,计算进度条数值
      dtask.addEventListener('statechanged', (task) => {
        if (task.state == 3) {
          let progress = dtask.downloadedSize / dtask.totalSize * 100;
          this.progress = Math.trunc(progress)
        }
      });
      dtask.start();
    },
    // 网络由异常到正常时触发
    updateOnlineStatus() {
      this.my.onLine = true; //设置联网状态，用于判断网络是否正常
      this.$notify({ type: "success", message: "网络连接成功!" });
      this.$router.replace("/home");
    },
    // 网络由异常到正常时触发
    updateOfflineStatus() {
      this.my.onLine = false;
      this.$notify({ type: "danger", message: "网络断开连接!", duration: 0 });
      this.$router.replace("/error");
    },
    // 检测返回键，双击退出应用
    goBackStatus() {
      var webview = plus.webview.currentWebview();
      var first = null;
      // 调用5+app内置方法监听手机返回按键
      plus.key.addEventListener(
        "backbutton",
        () => {
          webview.canBack((e) => {
            e.canBack
              ? webview.back()
              : !first
                ? ((first = new Date().getTime()),
                  plus.nativeUI.toast("双击退出", {
                    duration: "short",
                  }),
                  setTimeout(() => {
                    first = null;
                  }, 1000))
                : new Date().getTime() - first < 1400
                  ? plus.runtime.quit()
                  : false;
          });
        },
        false
      );
    },
    // 检测输入框，获取焦点，自动将视角移动至可见位置
    inputView() {
      const activeElement = document.activeElement;
      activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA"
        ? setTimeout(() => {
          activeElement.scrollIntoView({
            behavior: "instant", //过渡动画
            block: "center", //垂直方向对齐方式
            inline: "nearest", //水平方向对齐方式
          });
        }, 50)
        : false;
    },
  },
};
</script>
<style scoped>
.box {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>