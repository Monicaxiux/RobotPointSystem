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
                index: 2,
                keepAlive: true

            },
            component: () => import('../views/RoboticSpotCheck/CheckingToDo.vue')
        },
        {
            path: '/projectMaintenance',
            name: 'ProjectMaintenance',//点检项目维护
            meta: {
                index: 3,
                keepAlive: true

            },
            component: () => import('../views/RoboticSpotCheck/ProjectMaintenance.vue')
        },
        {
            path: '/spotCheckHistory',
            name: 'SpotCheckHistory',//点检历史
            meta: {
                index: 4,
                keepAlive: true
            },
            component: () => import('../views/RoboticSpotCheck/SpotCheckHistory.vue')
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
            path: '/todo',
            name: 'ToDo',//我的
            meta: {
                index: 5
            },
            component: () => import('../views/ToDo.vue')
        },
        {
            path: '/toDoDetails',
            name: 'ToDoDetails',//点检详情页
            meta: {
                index: 6
            },
            component: () => import('../views/RoboticSpotCheck/ToDoDetails.vue')
        },
        {
            path: '/projectDetails',
            name: 'ProjectDetails',//点检项详情页
            meta: {
                index: 7
            },
            component: () => import('../views/RoboticSpotCheck/ProjectDetails.vue')
        },
        {
            path: '/addEquipment',
            name: 'AddEquipment',//添加点检设备
            meta: {
                index: 8
            },
            component: () => import('../views/RoboticSpotCheck/AddEquipment.vue')
        },
        {
            path: '/historyDetails',
            name: 'HistoryDetails',//点检历史记录
            meta: {
                index: 9
            },
            component: () => import('../views/RoboticSpotCheck/HistoryDetails.vue')
        },
        {
            path: '/precisionMaintenance',
            name: 'PrecisionMaintenance',//精密维护
            meta: {
                index: 10
            },
            component: () => import('../views/PrecisionMaintenance/PrecisionMaintenance.vue')
        },
        {
            path: '/preservingHistory',
            name: 'PreservingHistory',//维护历史
            meta: {
                index: 10,
                keepAlive: true
            },
            component: () => import('../views/PrecisionMaintenance/PreservingHistory.vue')
        },
         {
            path: '/profile',
            name: 'Profile',//维护历史
            meta: {
                index: 10,
                keepAlive: true
            },
            component: () => import('../views/SparePartsManagement/Profile.vue')
        },
        {
            path: '/preservingHistoryDetails',
            name: 'PreservingHistoryDetails',//维护详情
            meta: {
                index: 10
            },
            component: () => import('../views/PrecisionMaintenance/PreservingHistoryDetails.vue')
        },
        {
            path: '/EditTemplate',
            name: 'EditTemplate',//编辑模板
            meta: {
                index: 10
            },
            component: () => import('../views/PrecisionMaintenance/EditTemplate.vue')
        },
         {
            path: '/ToBeMaintained',
            name: 'ToBeMaintained',//待维护
            meta: {
                index: 10,
                keepAlive: true
            },
            component: () => import('../views/PrecisionMaintenance/ToBeMaintained.vue')
        },
        {
            path: '/FaultLog',
            name: 'FaultLog',//待维护
            meta: {
                index: 10,
                keepAlive: true
            },
            component: () => import('../views/SparePartsManagement/FaultLog.vue')
        },
        {
            path: '/addFault',
            name: 'addFault',//待维护
            meta: {
                index: 10
            },
            component: () => import('../views/SparePartsManagement/addFault.vue')
        },
        {
            path: '/test',
            name: 'Test',//测试页
            meta: {
                index: 11
            },
            component: () => import('../views/utils/Test.vue')
        },
        {
            path: '/error',
            name: 'Error',//网络错误
            meta: {
                index: 12
            },
            component: () => import('../views/error/Error.vue')
        },
    ]
})
// 路由全局守卫：登录拦截 检查登录状态, 请重新登录
router.beforeEach((to, from, next) => {
    // 延时10毫秒，等待Pinia挂载完成
    setTimeout(() => {
        //使用Pinia的值
        const my = myStore()
        // 判断登录状态、联网状态
         !my.userStatus ?
                to.name == "Login" ? next() : (Notify({ type: "danger", message: "请先登录！" }), router.replace('/login'))
                : next();
    }, 10)
});
export default router