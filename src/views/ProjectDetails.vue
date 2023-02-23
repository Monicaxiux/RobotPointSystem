<template>
    <div>
        <van-cell-group>
            <van-field v-if="my.itemStatus" label="机组">
                <template #input>
                    <el-select @change="selectline" v-model="line" placeholder="请选择">
                        <el-option v-for="item in lineList" :key="item.lineId" :label="item.lineName" :value="item.lineId">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field v-if="my.itemStatus" label="设备">
                <template #input>
                    <el-select v-model="form.deviceId" placeholder="请选择">
                        <el-option v-for="(item, i) in deviceList" :key="item.deviceId" :label="item.deviceName"
                            :value="item.deviceId">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field label="点检标题" v-model="form.checkTitle" :disabled="my.itemStatus == 1 ? false : true"
                placeholder="请输入点检标题" />
            <van-field label="点检内容" v-model="form.checkDetails" :disabled="my.itemStatus == 1 ? false : true"
                placeholder="请输入点检内容" />
            <van-field label="点检周期">
                <template #input>
                    <el-select v-model="form.checkCycle" placeholder="请选择点检周期">
                        <el-option v-for="item in checkCycleList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field label="点检间隔" v-model="form.cycleInterval" placeholder="请输入点检间隔" />
            <van-field label="点检结果类型">
                <template #input>
                    <el-select @change="change" v-model="form.itemResultType" placeholder="请选择结果类型">
                        <el-option v-for="item in itemResultTypeList" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field label="最大值" v-model="form.maxValue" type="digit" :disabled="form.itemResultType == 2 ? false : true"
                placeholder="请输入最大值" />
            <van-field label="最小值" v-model="form.minValue" type="digit" :disabled="form.itemResultType == 2 ? false : true"
                placeholder="请输入最小值" />
            <van-field label="单位" v-model="form.unit" :disabled="form.itemResultType == 2 ? false : true"
                placeholder="请输入单位" />
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
import { itemallinfo, itemupdate, itemdelete, queryallline, querysimpleinfo, itemadd } from '@/api/rollers'
export default {
    name: "Home",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            line: '',
            lineList: [],
            deviceList: [],
            form: {
                checkTitle: '',
                checkDetails: '',
                checkCycle: 1,
                cycleInterval: 1,
                itemResultType: 1,
                maxValue: 0,
                minValue: 0,
                unit: '',
                deviceId: ''
            },
            checkCycleList: [{
                value: 1,
                label: '日点检'
            }, {
                value: 2,
                label: '周点检'
            }, {
                value: 3,
                label: '月点检'
            }],
            itemResultTypeList: [
                {
                    value: 1,
                    label: '定性'
                },
                {
                    value: 2,
                    label: '定量'
                }
            ]
        };
    },
    mounted() {
        this.my.title = "点检详情"; //页面标题
        this.my.left = true; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar
        console.log(this.my.itemId);
        if (this.my.itemStatus) {
            console.log('是添加');
        } else {
            console.log('是编辑');
            this.$eiInfo.parameter = {
                itemId: this.my.itemId
            }
            itemallinfo(this.$eiInfo).then((res) => {
                console.log(res.result.result);
                this.form = JSON.parse(JSON.stringify(res.result.result))
            })
        }
        queryallline().then((res) => {
            console.log(res.result);
            this.lineList = res.result.line;
        })
    },

    methods: {
        // 删除点检项
        deleteitem() {
            itemdelete(this.$eiInfo).then((res) => {

            })
        },
        // 查询机组下设备列表
        selectline(i) {
            this.form.deviceId = ''
            this.$eiInfo.parameter = {
                productionLine: i
            }
            querysimpleinfo(this.$eiInfo).then((res) => {
                console.log(res.result.deviceList);
                this.deviceList = res.result.deviceList;
            })
        },
        // 操作
        edit(s) {
            switch (s) {
                case 1:
                    if (this.my.itemStatus) {
                        console.log('是添加');
                        this.$eiInfo.parameter = {
                            checkTitle: this.form.checkTitle,
                            itemResultType: this.form.itemResultType,
                            checkCycle: this.form.checkCycle,
                            checkDetails: this.form.checkDetails,
                            cycleInterval: parseInt(this.form.cycleInterval),
                            maxValue: parseInt(this.form.maxValue),
                            minValue: parseInt(this.form.minValue),
                            unit: this.form.unit,
                            deviceId: this.form.deviceId
                        }
                        itemadd(this.$eiInfo).then((res) => {
                            if (res.sys.status == 1) {
                                this.$notify({ type: "success", message: res.sys.msg })
                                this.$router.back();
                            }
                        })
                    } else {
                        this.$eiInfo.parameter = {
                            checkTitle: this.form.checkTitle,
                            itemResultType: this.form.itemResultType,
                            checkCycle: this.form.checkCycle,
                            checkDetails: this.form.checkDetails,
                            cycleInterval: parseInt(this.form.cycleInterval),
                            id: this.form.itemId,
                            maxValue: parseInt(this.form.maxValue),
                            minValue: parseInt(this.form.minValue),
                            unit: this.form.unit
                        }
                        itemupdate(this.$eiInfo).then((res) => {
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
                                id: this.form.itemId
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