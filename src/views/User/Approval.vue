<template>
    <van-tabs v-model="active">
        <van-tab title="待审批">待审批</van-tab>
        <van-tab title="已审批">已审批</van-tab>
    </van-tabs>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
        }
    },
    computed: {},
    watch: {},
    methods: {

    },
    created() {

    },
    mounted() {
        this.my.title = "申请批假"; //页面标题
        this.my.left = true; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar
    },
}
</script>
<style lang='less' scoped></style>