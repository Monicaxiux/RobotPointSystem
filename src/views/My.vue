<template>
  <div>
    <div class="call"><a>当前用户：{{ my.userInfo.username }}</a></div>
    <div @click="qh" class="call"><a>当前环境：{{ status }}</a></div>
    <div class="call"><a>权限管理</a><a>></a></div>
    <div class="call"><a>修改密码</a><a>></a></div>
    <div @click="logOut" class="call"><a>退出登录</a><a>></a></div>
    <div @click="updateApp" class="call"><a>检查更新</a><a>></a></div>
  </div>
</template>

<script>
export default {
  name: "My",
  data() {
    return {
      progress: 0,
      my: this.$myStore(),
      status: localStorage.baseURL == 'http://106.15.73.222:8192' ? '正式环境' : '测试环境'
    };
  },

  mounted() {
    this.my.title = "我的"; //页面标题
    this.my.isTabBar = true; //是否开启TabBar
    this.my.left = false; //NavBar是否开启返回按键
  },

  methods: {
    qh() {
      if (localStorage.baseURL == 'http://106.15.73.222:8192') {
        localStorage.baseURL = 'http://192.168.0.108:8192'
        this.$toast.success('地址切换成功');
        console.log('正式');
        setTimeout(() => {
          location.reload();
        }, 500)
      } else {
        localStorage.baseURL = 'http://106.15.73.222:8192'
        this.$toast.success('地址切换成功');
        console.log('测式');
        setTimeout(() => {
          location.reload();
        }, 500)
      }
    },
    // 退出登录
    logOut() {
      this.$dialog
        .confirm({
          title: "退出当前账号？",
          message: "请再次确认当前操作",
          confirmButtonColor: "#197cca",
        })
        .then(() => {
          this.$toast.success('已退出登录！');

          // this.$notify({ type: "primary", message: "已退出登录！" });
          this.my.userStatus = false; //将登录状态取消
          this.$router.push({ path: "/login" });
        })
        .catch(() => { });
    },
    updateApp() {
      this.progress = 0;
      console.log('下载来了');
      var dtask = plus.downloader.createDownload('https://ghproxy.com/https://github.com/Kr328/ClashForAndroid/releases/download/v2.5.12/cfa-2.5.12-premium-universal-release.apk', {}, (d, status) => {
        if (status == 200) {
          console.log("下载成功安装: " + d.filename);
          plus.runtime.install(d.filename)
          // plus.runtime.install('/storage/emulated/0/Android/data/io.dcloud.HBuilder/downloads/Clash.for.Windows.Setup.0.20.9.exe')

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
    }
  },
};
</script>

<style scoped>
.call {
  padding: 16px;
  display: flex;
  justify-content: space-between;
}

.call a {
  color: #000000bd;
  font-size: 15px;
  font-weight: 600;
}
</style>