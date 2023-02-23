import axios from 'axios';// Axios 请求库
import { Indicator } from 'mint-ui';// Indicator  加载圆圈
import { Notify } from 'vant';//Notify 消息提示
import router from '../router'
//实例化请求对象
const req = axios.create({
    // baseURL: 'http://192.168.0.26:8192',
    baseURL: 'http://47.101.183.203:8192',
    // timeout: 7000 //请求超时时间
})
//请求拦截器
req.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json'
        Indicator.open();
        return config;
    },
    error => {
        Notify({ type: "danger", message: "网络断开连接!", duration: 1500 });
        // router.push("/error")
        Indicator.close();
        console.log('axios请求拦截器错误:' + error);
        return Promise.reject(error);
    }
)

//响应拦截器
req.interceptors.response.use(
    response => {
        Indicator.close();
        return response.data
    },
    error => {
        Notify({ type: "danger", message: "网络断开连接!", duration: 1500 });
        // router.push("/error")
        Indicator.close();
        console.log('axios响应拦截器错误:' + error);
        return Promise.reject(error);
    }
)
export default req;