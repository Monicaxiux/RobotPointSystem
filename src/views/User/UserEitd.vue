<template>
    <div>
        <van-cell-group>
            <van-field label="姓名" v-model="form.username" placeholder="请输入姓名" />
            <van-field label="工号" v-model="form.workNumber" placeholder="请输入工号" />
            <van-field label="密码" v-if="my.itemStatus == 2" v-model="form.password" placeholder="请输入密码" />
            <van-field label="公司">
                <template #input>
                    <el-select @change="selectline" v-model="form.companyId" placeholder="请选择">
                        <el-option v-for="item in lineList" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field label="部门">
                <template #input>
                    <el-select @change="selectdevice" v-model="form.departmentId" placeholder="请选择">
                        <el-option v-for="item in deviceList" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field label="组">
                <template #input>
                    <el-select v-model="form.groupId" placeholder="请选择">
                        <el-option v-for="item in groupList" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field label="权限">
                <template #input>
                    <el-select v-model="form.auth" placeholder="请选择">
                        <el-option v-for="item in authList" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
        </van-cell-group>
        <div class="bottom_box">
            <van-button class="bt" @click="edit(1)" type="info">提交</van-button>
            <van-button class="bt" @click="edit(2)" type="default">取消</van-button>
            <!-- <van-button class="bt" v-if="my.itemStatus == 2" @click="edit(3)" type="danger">删除</van-button> -->
        </div>
        <br />
        <br />
    </div>
</template>

<script>
import { userupdate, devicedelete, userregister, grouplist, departmentlist, userinfoall, companylist } from '@/api/rollers'
export default {
    name: "Home",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            yearSelect: null,
            yearColumns: [],
            yearShow: false,
            form: {
                username: '',
                workNumber: '',
                companyId: '',
                departmentId: ''
            },
            lineList: [],
            deviceList: [],
            groupList: [],
            productionLineIdList: [],
            factoryId: '宝日汽车板',
            authList: [
                {
                    key: -1,
                    value: '用户已删除'
                },
                {
                    key: 1,
                    value: '组员'
                },
                {
                    key: 2,
                    value: '组长'
                },
                {
                    key: 3,
                    value: '部门领导'
                },
                {
                    key: 4,
                    value: '公司领导'
                }
            ]
        };
    },
    created() {
        this.yearData();
    },

    mounted() {
        this.my.left = true; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar
        console.log(this.my.itemId);
        if (this.my.itemStatus == 1) {
            console.log('是添加');
            this.my.title = "添加员工"; //页面标题
        } else if (this.my.itemStatus == 2) {
            console.log('是编辑');
            this.my.title = "编辑员工"; //页面标题
            this.$eiInfo.parameter = {
                userId: this.my.userId
            }
            userinfoall(this.$eiInfo).then((res) => {
                this.selectline(res.result.result.companyId)
                this.selectdevice(res.result.result.departmentId)
                this.form = res.result.result;
            })
        }
        companylist().then((res) => {
            this.lineList = res.result.companyList;
        })
    },

    methods: {
        // 查询机组下设备列表
        selectline(i) {
            this.tableData = [];
            this.dataCount = null
            this.$eiInfo.parameter = {
                companyId: i
            }
            departmentlist(this.$eiInfo).then((res) => {
                this.deviceList = res.result.departmentList;
            })
        },
        // 设备名称选择事件
        selectdevice(i) {
            this.tableData = [];
            this.dataCount = null
            this.$eiInfo.parameter = {
                departmentId: i
            }
            grouplist(this.$eiInfo).then((res) => {
                this.groupList = res.result.groupList;
            })
        },
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
            for (let i = 1998; i < 2099; i++) {
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
                    if (this.my.itemStatus == 1) {
                        console.log('是添加');
                        this.$eiInfo.parameter = {
                            username: this.form.username,
                            workNumber: this.form.workNumber,
                            // password: this.form.password,
                            auth: this.form.auth,
                            companyId: this.form.companyId,
                            departmentId: this.form.departmentId,
                            groupId: this.form.groupId
                        }
                        userregister(this.$eiInfo).then((res) => {
                            if (res.sys.status == 1) {
                                this.$notify({ type: "success", message: res.sys.msg })
                                this.$router.back();
                            }
                        })
                    } else if (this.my.itemStatus == 2) {
                        this.$eiInfo.parameter = {
                            id: this.my.userId,
                            username: this.form.username,
                            workNumber: this.form.workNumber,
                            password: this.form.password,
                            auth: this.form.auth,
                            companyId: this.form.companyId,
                            departmentId: this.form.departmentId,
                            groupId: this.form.groupId
                        }
                        userupdate(this.$eiInfo).then((res) => {
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
                            devicedelete(this.$eiInfo).then((res) => {
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

.van-button--info {
    color: #fff;
    background-color: #687dbb;
    border: 1px solid #687dbb;
}
</style>