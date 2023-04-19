<template>
    <div>
        <van-cell-group v-if="form.auditItemType == 2">
            <van-field label="审核内容">
                <template #input>
                    {{ form.handleMsg }}
                </template>
            </van-field>
            <van-field label="审核状态">
                <template #input>
                    {{ form.auditResult }}
                </template>
            </van-field>
            <van-field label="创建时间">
                <template #input>
                    {{ form.createDate }}
                </template>
            </van-field>
            <van-field label="审核日期">
                <template #input>
                    {{ form.auditDate }}
                </template>
            </van-field>
            <van-field label="点检标题">
                <template #input>
                    {{ form.checkTitle }}
                </template>
            </van-field>
            <van-field label="点检内容">
                <template #input>
                    {{ form.checkDetails }}
                </template>
            </van-field>
            <van-field label="点检周期">
                <template #input>
                    {{ form.checkCycleIntervalDay }}
                </template>
            </van-field>


            <van-field label="类型">
                <template #input>
                    {{ form.itemResultType }}
                </template>
            </van-field>
            <div v-if="form.itemResultType != '定性'">
                <van-field label="最大值">
                    <template #input>
                        {{ form.maxValue }}
                    </template>
                </van-field>
                <van-field label="最小值">
                    <template #input>
                        {{ form.minValue }}
                    </template>
                </van-field>
                <van-field label="单位">
                    <template #input>
                        {{ form.unit }}
                    </template>
                </van-field>
            </div>

        </van-cell-group>
        <van-cell-group v-if="form.auditItemType == 1">
            <van-field label="审核内容">
                <template #input>
                    {{ form.handleMsg }}
                </template>
            </van-field>
            <van-field label="审核状态">
                <template #input>
                    {{ form.auditResult }}
                </template>
            </van-field>
            <van-field label="创建时间">
                <template #input>
                    {{ form.createDate }}
                </template>
            </van-field>
            <van-field label="审核日期">
                <template #input>
                    {{ form.auditDate }}
                </template>
            </van-field>
            <van-field label="设备名称">
                <template #input>
                    {{ form.deviceName }}
                </template>
            </van-field>
            <van-field label="宝罗工号">
                <template #input>
                    {{ form.baoRobotNumber }}
                </template>
            </van-field>
            <van-field label="设备编码">
                <template #input>
                    {{ form.deviceNumber }}
                </template>
            </van-field>
            <van-field label="设备型号">
                <template #input>
                    {{ form.deviceModel }}
                </template>
            </van-field>

            <van-field label="分厂">
                <template #input>
                    {{ form.factory }}
                </template>
            </van-field>

            <van-field label="主要功能">
                <template #input>
                    {{ form.mainFunction }}
                </template>
            </van-field>
            <van-field label="产线">
                <template #input>
                    {{ form.productionLine }}
                </template>
            </van-field>


        </van-cell-group>
        <van-cell-group v-if="form.auditItemType == 3">
            <van-field label="审核内容">
                <template #input>
                    {{ form.handleMsg }}
                </template>
            </van-field>
            <van-field label="审核状态">
                <template #input>
                    {{ form.auditResult }}
                </template>
            </van-field>
            <van-field label="创建时间">
                <template #input>
                    {{ form.createDate }}
                </template>
            </van-field>
            <van-field label="审核日期">
                <template #input>
                    {{ form.auditDate }}
                </template>
            </van-field>
            <van-field label="维护标题">
                <template #input>
                    {{ form.maintainTitle }}
                </template>
            </van-field>
            <van-field label="维护内容">
                <template #input>
                    {{ form.maintainDetails }}
                </template>
            </van-field>
            <van-field label="备注">
                <template #input>
                    {{ form.remark }}
                </template>
            </van-field>


            <van-field label="维护周期">
                <template #input>
                    {{ form.maintainCycleIntervalDay }}
                </template>
            </van-field>
            <van-field label="下次精密维护日期">
                <template #input>
                    {{ form.nextMaintainDate }}
                </template>
            </van-field>

        </van-cell-group>
        <div class="bottom_box">
            <van-button class="bt" @click="edit(1)" type="info">同意</van-button>
            <van-button class="bt" @click="edit(2)" type="danger">驳回</van-button>
        </div>
        <br />
        <br />
    </div>
</template>

<script>
import { auditquery, auditverify } from '@/api/rollers'
export default {
    components: {},
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            form: {}
        }
    },
    computed: {},
    watch: {},
    methods: {
        edit(i) {
            switch (i) {
                case 1:
                    this.$eiInfo.parameter = {
                        auditRecordId: this.my.audData[0],
                        auditItemType: this.my.audData[1],
                        result: 2
                    }
                    break;
                case 2:
                    this.$eiInfo.parameter = {
                        auditRecordId: this.my.audData[0],
                        auditItemType: this.my.audData[1],
                        result: 3
                    }

                    break;
            }
            auditverify(this.$eiInfo).then((res) => {
                this.$notify({ type: "success", message: res.sys.msg })
                this.$router.back();
            })

        }
    },
    created() {

    },
    mounted() {
        this.my.title = "审批详情"; //页面标题
        this.my.left = true; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar
        if (this.my.audData) {
            this.$eiInfo.parameter = {
                auditRecordId: this.my.audData[0],
                auditItemType: this.my.audData[1]
            }
            auditquery(this.$eiInfo).then((res) => {
                console.log(res);
                this.form = res.result.result;
            })
        }

    },
}
</script>
<style lang='less' scoped>
.bt {
    width: 150px;
}

.bottom_box {
    width: 100%;
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-evenly;
}
</style>