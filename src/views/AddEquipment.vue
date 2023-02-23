<template>
    <div>
        <van-cell-group>
            <van-field label="分厂" v-model="form.factoryId" placeholder="请输入分厂" />
            <van-field label="产线" v-model="form.productionLineId" placeholder="请输入产线" />
            <van-field label="设备编号" v-model="form.deviceNumber" type="digit" placeholder="请输入设备编号" />
            <van-field label="宝罗工号" v-model="form.baoRobotNumber" placeholder="请输入宝罗工号" />
            <van-field label="设备名称" v-model="form.deviceName" placeholder="请输入设备名称" />
            <van-field label="主要功能" v-model="form.mainFunction" placeholder="请输入主要功能" />
            <van-field label="设备品牌" v-model="form.deviceBrand" placeholder="请输入设备品牌" />
            <van-field label="设备型号" v-model="form.deviceModel" placeholder="请输入设备型号" />
            <van-field v-model="form.uptime" is-link readonly arrow-direction="down" label="投产时间" placeholder="请选择投产时间"
                @click="dateSelect" />
            <van-action-sheet v-model="yearShow">
                <van-picker title="投产时间" show-toolbar :columns="yearColumns" :default-index="yearSelect"
                    @confirm="yearConfirm" @cancel="cancel" />
            </van-action-sheet>
        </van-cell-group>
        <div class="bottom_box">
            <van-button class="bt" @click="edit(1)" type="info">提交</van-button>
            <van-button class="bt" @click="edit(2)" type="default">取消</van-button>
            <van-button class="bt" v-if="!my.itemStatus" @click="edit(3)" type="danger">删除</van-button>
        </div>

        <br />
        <br />
    </div>
</template>

<script>
import { deviceupdate, devicedelete, devicequeryallinfo, deviceadd } from '@/api/rollers'
export default {
    name: "Home",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            yearSelect: null,
            yearColumns: [],
            yearShow: false,
            form: {
                factoryId: 0,
                productionLineId: 0,
                deviceNumber: '',
                baoRobotNumber: '',
                deviceName: '',
                mainFunction: '',
                deviceBrand: '',
                deviceModel: '',
                uptime: ''
            },
        };
    },
    created() {
        this.yearData();
    },

    mounted() {
        this.my.title = "添加点检设备"; //页面标题
        this.my.left = true; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar
        console.log(this.my.itemId);
        if (this.my.itemStatus) {
            console.log('是添加');
        } else {
            console.log('是编辑');
        }
        this.$eiInfo.parameter = {
            deviceId: this.my.deviceId
        }
        devicequeryallinfo(this.$eiInfo).then((res) => {
            this.form = res.result.result;
        })
    },

    methods: {
        formatDates(date) {
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        },
        // 监听年份打开
        dateSelect() {
            this.yearShow = true;
        },
        //年选择器
        yearConfirm(value) {
            this.form.uptime = value.toString();
            this.yearShow = false;
        },
        //年数据
        yearData() {
            // 获取默认显示的时间
            var nowTime = new Date(this.form.uptime);
            let year = nowTime.getFullYear();
            let month = nowTime.getMonth();
            let day = nowTime.getDate();
            // 循环数组 填写最小时间和最大时间范围 推进数组
            for (let i = 2020; i < 2099; i++) {
                this.yearColumns.push(i);
            }
            // 格式化时间并截取
            var years = this.formatDates(new Date(year, month, day));
            var Year = years.slice(0, 4);
            // 将截取的年份赋值给绑定值 用于点击弹出日期窗口后显示当前的时间
            this.yearSelect = this.yearColumns.indexOf(Number(Year));
        },
        // 点击取消按钮时触发的事件
        cancel() {
            this.yearShow = false;
        },
        // 删除点检项
        deleteitem() {
            devicedelete(this.$eiInfo).then((res) => {

            })
        },
        // 操作
        edit(s) {
            switch (s) {
                case 1:
                    if (this.my.itemStatus) {
                        console.log('是添加');
                        this.$eiInfo.parameter = {
                            factoryId: parseInt(this.form.factoryId),
                            productionLineId: parseInt(this.form.productionLineId),
                            deviceNumber: this.form.deviceNumber,
                            baoRobotNumber: this.form.baoRobotNumber,
                            deviceName: this.form.deviceName,
                            mainFunction: this.form.mainFunction,
                            deviceBrand: this.form.deviceBrand,
                            deviceModel: this.form.deviceModel,
                            uptime: this.form.uptime
                        }
                        deviceadd(this.$eiInfo).then((res) => {
                            if (res.sys.status == 1) {
                                this.$notify({ type: "success", message: res.sys.msg })
                                this.$router.back();
                            }
                        })
                    } else {
                        this.$eiInfo.parameter = {
                            id: this.my.deviceId,
                            factoryId: parseInt(this.form.factoryId),
                            productionLineId: parseInt(this.form.productionLineId),
                            deviceNumber: this.form.deviceNumber,
                            baoRobotNumber: this.form.baoRobotNumber,
                            deviceName: this.form.deviceName,
                            mainFunction: this.form.mainFunction,
                            deviceBrand: this.form.deviceBrand,
                            deviceModel: this.form.deviceModel,
                            uptime: this.form.uptime
                        }
                        deviceupdate(this.$eiInfo).then((res) => {
                            if (res.sys.status == 1) {
                                this.$notify({ type: "success", message: res.sys.msg })
                                this.$router.back();
                            }
                        })
                    }

                    break;
                case 2:
                    this.$router.back();
                    break;
                case 3:
                    this.$dialog.confirm({
                        title: '确认',
                        message: '是否删除？',
                    })
                        .then(() => {
                            this.$eiInfo.parameter = {
                                id: this.my.deviceId
                            }
                            itemdelete(this.$eiInfo).then((res) => {
                                if (res.sys.status == 1) {
                                    this.$notify({ type: "success", message: res.sys.msg })
                                    this.$router.back();
                                }
                            })
                        })
                        .catch(() => {
                            // on cancel
                        });
                    break;
            }
        },
        change(i) {
            this.form.maxValue = 0
            this.form.minValue = 0
            this.form.unit = ""
        }
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