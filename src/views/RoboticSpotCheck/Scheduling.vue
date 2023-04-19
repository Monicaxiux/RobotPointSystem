<template>
    <div>
        <div style="width: 100%;display: flex;align-items: center;justify-content:space-around;">
            <el-date-picker style="width: 70%;margin:5px 10px 5px 1px" @change="change" value-format="yyyy-M"
                v-model="value" type="month" placeholder="选择月">
            </el-date-picker>
            <van-button @click="getData" style="width: 20%;height: 38px;" size="small" type="info">查询</van-button>
        </div>

        <van-calendar style="margin: 10px;" :key="key" title=" " @select="select" :formatter="formatter" :min-date="minDate"
            :max-date="maxDate" :poppable="false" :show-confirm="false" :style="{ height: '500px' }" />
    </div>
</template>
<script>
import { plandatequery, plandatechange } from '@/api/rollers'
export default {
    name: "Scheduling",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            minDate: new Date(2023, 3, 1),
            maxDate: new Date(2023, 3, 30),
            year: 2023,
            month: 4,
            list: [],
            date: '',
            value: '',
            key: 0,
            lingthL: 0
        }
    },
    mounted() {
        this.my.title = "点检排程"; //页面标题
        this.my.left = true; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar 
        this.getData();
    },
    methods: {
        formatDate(date) {
            return date.getDate();
        },
        formatter(day) {
            const date = day.date.getDate();
            for (let i = 0; i < this.list.length; i++) {
                if (date === this.list[i].day) {
                    day.topInfo = this.list[i].text;
                }
            }
            return day;
        },
        change() {
            let time = this.value.split('-')
            this.year = time[0]
            this.month = time[1]
            console.log(this.month);
            this.getData();


        },
        select(data) {
            this.date = this.formatDate(data);
            console.log(this.date);
            this.$eiInfo.parameter = {
                year: this.year,
                month: this.month,
                day: this.date,
                confirm: 0
            }
            this.$eiInfo.userInfo = {
                id: this.my.userInfo.id
            }
            plandatechange(this.$eiInfo).then((res) => {
                this.$dialog.confirm({
                    title: res.sys.msg,
                    // message: '弹窗内容',
                })
                    .then(() => {
                        // on confirm
                        this.$eiInfo.parameter = {
                            year: this.year,
                            month: this.month,
                            day: this.date,
                            confirm: 1
                        }
                        this.$eiInfo.userInfo = {
                            id: this.my.userInfo.id
                        }
                        plandatechange(this.$eiInfo).then((res) => {
                            this.$notify({ type: 'success', message: res.sys.msg });
                            this.getData();
                        })
                    })
                    .catch(() => {
                        // on cancel
                    });
            })
        },
        getData() {
            this.$eiInfo.parameter = {
                year: this.year,
                month: this.month
            }
            plandatequery(this.$eiInfo).then((res) => {
                this.list = res.result.result
                this.lingthL = this.list.length
                this.minDate = new Date(this.year, this.month - 1, 1)
                this.maxDate = new Date(this.year, this.month - 1, this.lingthL)
                console.log(this.lingthL);
                this.key++;
                console.log(this.lingthL, ' this.lingthL长度');
            })
        }
    }
}
</script>
<style scoped>
:deep(.van-calendar__header-title) {
    height: 0 !important;
}

.van-button--info {
    color: #fff;
    background-color: #687dbb;
    border: 1px solid #687dbb;
}
</style>