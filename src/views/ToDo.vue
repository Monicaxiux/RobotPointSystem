<template>
    <div>
        待办事项
    </div>
</template>
<script>
export default {
    name: "Todo",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值

        }
    },
    mounted() {
        this.my.title = "待办事项"; //页面标题
        this.my.left = false; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar
    }
}
</script>
<style scoped lang="less"></style>
