import Vue from 'vue'
import Router from 'vue-router'
import { Notify } from "vant";
import myStore from "@/store";
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/login',
            name: 'Login',//登录
            meta: {
                index: 0
            },
            component: () => import('../views/Login.vue')
        },
        {
            path: '/home',
            name: 'Home',//首页
            meta: {
                index: 1
            },
            component: () => import('../views/Home.vue')
        },
        {
            path: '/checkingToDo',
            name: 'CheckingToDo',//点检待办事项
            meta: {
                index: 2
            },
            component: () => import('../views/CheckingToDo.vue')
        },
        {
            path: '/projectMaintenance',
            name: 'ProjectMaintenance',//点检项目维护
            meta: {
                index: 3
            },
            component: () => import('../views/ProjectMaintenance.vue')
        },
        {
            path: '/spotCheckHistory',
            name: 'SpotCheckHistory',//点检历史
            meta: {
                index: 4
            },
            component: () => import('../views/SpotCheckHistory.vue')
        },
        {
            path: '/my',
            name: 'My',//我的
            meta: {
                index: 5
            },
            component: () => import('../views/My.vue')
        },
        {
            path: '/error',
            name: 'Error',//网络错误
            meta: {
                index: 6
            },
            component: () => import('../views/error/Error.vue')
        },
    ]
})
// 路由全局守卫：登录拦截 检查登录状态, 请重新登录
// router.beforeEach((to, from, next) => {
//     // 延时10毫秒，等待Pinia挂载完成
//     setTimeout(() => {
//         //使用Pinia的值
//         const my = myStore()
//         // 判断登录状态、联网状态
//         !my.onLine ?
//             to.name == "Login" || to.name == "Error" ? next() : (Notify({ type: "danger", message: "网络断开连接!", duration: 0 }), router.replace('/error')) :
//             !my.userStatus ?
//                 to.name == "Login" || to.name == "Error" ? next() : (Notify({ type: "danger", message: "请先登录！" }), router.replace('/login'))
//                 : next();
//     }, 10)
// });
export default router