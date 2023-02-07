import { defineStore } from 'pinia'
const myStore = defineStore('store', {
    state: () => {
        return {
            title: "PDA信息管理",//NavBar标题
            left: false,//是否开启NavBar左侧返回
            isTabBar: true,//是否开启TabBar
            isNavBar: true,//是否开启NavBar
            userStatus: false,//登录状态
            onLine: navigator.onLine,//是否有网
            isScheduling: 1//1.轧辊下机排程 2.拆装区排程
        }
    },
    getters: {

    },
    actions: {

    },
    // 开启数据持久化 默认存localStorage
    persist: {
        storage: window.sessionStorage,
    }
    // persist: true
})
export default myStore