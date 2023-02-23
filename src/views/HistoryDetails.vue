<template>
    <div>
        <van-cell-group>
            <van-field label="分厂">
                <template #input>
                    {{ form.factory }}
                </template>
            </van-field>
            <van-field label="点检类型">
                <template #input>
                    {{ form.itemCycleResult }}
                </template>
            </van-field>
            <van-field label="机组">
                <template #input>
                    {{ form.productionLine }}
                </template>
            </van-field>
            <van-field label="设备">
                <template #input>
                    {{ form.deviceName }}
                </template>
            </van-field>
            <van-field label="点检内容">
                <template #input>
                    {{ form.checkDetails }}
                </template>
            </van-field>
            <van-field label="点检结果">
                <template #input>
                    {{ form.checkResult }}
                </template>
            </van-field>
            <van-field label="检查人">
                <template #input>
                    {{ form.checkUser }}
                </template>
            </van-field>
            <van-field label="分厂">
                <template #input>
                    {{ form.factory }}
                </template>
            </van-field>
        </van-cell-group>
    </div>
</template>

<script>
import { recordhistoryall } from '@/api/rollers'
export default {
    name: "Home",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            form: {}
        };
    },
    mounted() {
        this.my.title = "历史记录详情"; //页面标题
        this.my.left = true; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar
        this.$eiInfo.parameter = {
            recordId: this.my.recordId
        }
        recordhistoryall(this.$eiInfo).then((res) => {
            this.form = JSON.parse(JSON.stringify(res.result.result));
        })
    },

    methods: {

    },
};
</script>



<style scoped>
.bottom_box {
    width: 100%;
    display: flex;
    height: 60px;
    /* flex-wrap: wrap; */
    align-items: center;
    justify-content: space-evenly;
}

.bt {
    width: 100px;
}
</style>