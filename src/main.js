import Vue from 'vue'
import App from './App.vue'
// Pinia
import { createPinia, PiniaVuePlugin } from 'pinia'
// Pinia数据持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
Vue.use(PiniaVuePlugin)
 if (localStorage.baseURL) {
  console.log('有地址，不更改环境');
} else {
  console.log('没有地址，默认正式环境');
  localStorage.baseURL = 'http://106.15.73.222:8192'
}

//全局挂载Pinia
import myStore from "@/store";
Vue.prototype.$myStore = myStore
// VantUi库
import Vant from 'vant';
import 'vant/lib/index.css';
import { Notify, Dialog, Toast,Sticky,NoticeBar   } from 'vant';
Vue.use(Notify);//Notify 消息提示
Vue.use(Dialog);//Dialog 弹出框
Vue.use(Toast);//Toast 轻提示
Vue.use(Sticky);//Toast 轻提示
Vue.use(NoticeBar);
Vue.use(Vant);
Vue.prototype.$toast = Toast

// MuseUi库
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);
// Elenment ui库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入 echarts
import * as echarts from 'echarts';
//将 echarts 挂载到vue的原型上
Vue.prototype.$echarts = echarts

//MintUi库
// import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
// Vue.use(Mint)

// 请求拦截器
import req from './utils/request'
Vue.prototype.$req = req

// 请求参数
import EiInfo from './utils/myEiInfo'
Vue.prototype.$eiInfo = EiInfo

// router路由
import router from './router'
import '../src/assets/icon/iconfont.css'

// 使用Vconsole控制台
import Vconsole from 'vconsole';
// let vConsole = new Vconsole();

// productionTip设置为 false ，可以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

new Vue({
  pinia,
  router,
  render: h => h(App),
}).$mount('#app')
