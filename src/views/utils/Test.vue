<template>
  <div>
    <div class="scan">
      <div id="codeId">
        <div style="height:40%"></div>
        <p class="tip" style="text-align: center">加载中...</p>
      </div>
      <div class="back">
        <span @click="backL()">&nbsp;&nbsp;< 返回</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "scan",
  data() {
    return {
      codeUrl: '',
      my: this.$myStore(), //使用Pinia的值
    }
  },
  created() {

  },
  mounted() {
    this.my.isNavBar = false; //是否开启NavBar
    this.my.isTabBar = false; //是否开启TabBar
    // 检测返回键
    // document.addEventListener("plusready", this.back());
    setTimeout(() => {
      this.startRecognize();
    }, 500)
  },
  methods: {
    //创建扫描控件
    startRecognize() {
      let that = this;
      if (!window.plus) return;
      that.scan = new plus.barcode.Barcode('codeId');
      that.scan.onmarked = onmarked;
      function onmarked(type, result, file) {
        console.log("remarked");
        switch (type) {
          case plus.barcode.QR:
            type = 'QR';
            break;
          case plus.barcode.EAN13:
            type = 'EAN13';
            break;
          case plus.barcode.EAN8:
            type = 'EAN8';
            break;
          default:
            type = '其它' + type;
            break;
        }
        result = result.replace(/\n/g, '');
        that.codeUrl = result;
        that.my.code = result;
        console.log(result);

        that.closeScan();
        that.$router.back();
      }
      that.startScan();
    },
    backL() {
      this.cancelScan()
      this.$router.back();
    },
    //开始扫描
    startScan() {
      const _ts = this;
      if (!window.plus) return;
      _ts.scan.start();
    },
    //关闭扫描
    cancelScan() {
      const _ts = this;
      if (!window.plus) return;
      _ts.scan.cancel();
    },
    //关闭条码识别控件
    closeScan() {
      const _ts = this;
      if (!window.plus) return;
      _ts.scan.close();
    },
  }
}
</script>

<style>
.scan {
  height: 100%;
}

.tip {
  font-size: 23px;
}

.back {
  background-color: #009cdc;
  text-align: left;
  height: 40px;
  color: white;
  z-index: 9999;
  top: 0;
  line-height: 40px;
  width: 100%;
  position: absolute;
}

#codeId {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 3rem;
  text-align: center;
  color: #fff;
  background: rgb(0, 0, 0);
}

footer {
  position: absolute;
  left: 0;
  bottom: 1rem;
  height: 2rem;
  line-height: 2rem;
  z-index: 2;
}
</style>
