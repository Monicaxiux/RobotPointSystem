<template>
    <div>
        <van-notice-bar left-icon="volume-o" text="请先选择设备或扫码选择设备后再选择维护标题" />
        <van-cell-group>
            <div class="form">
                <div class="form_item">
                    <div class="inp">
                        <label>机组</label>
                        <el-select style=" width: 110px !important;" @change="selectline" v-model="line" placeholder="请选择">
                            <el-option v-for="item in lineList" :key="item.lineId" :label="item.lineName"
                                :value="item.lineId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="inp">
                        <label>设备名称</label>
                        <el-select style=" width: 110px !important;" @change="selectdevice" v-model="form.deviceId"
                            placeholder="请选择">
                            <el-option v-for="(item, i) in deviceList" :key="item.deviceId" :label="item.deviceName"
                                :value="i">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="form_item">
                    <div class="inp">
                        <label>宝罗工号</label>
                        <el-input style=" width: 110px !important;" v-model="form.baoRobotNumber"
                            placeholder="请输入内容"></el-input>
                    </div>
                    <div class="inp">
                        <label>设备编码</label>
                        <el-input style=" width: 110px !important;" v-model="form.deviceNumber"
                            placeholder="请输入内容"></el-input>
                    </div>
                </div>
                <div class="form_item">
                    <div class="inp">
                        <label>扫描设备码</label>
                        <img @click="toQrCode" style="width: 20%;margin-left: 10px;" src="../../assets/icon/qrCode.svg" />
                    </div>
                    <div class="inp">
                        <van-radio-group v-model="temp" direction="horizontal">
                            <van-radio name="1">临时</van-radio>
                            <van-radio name="2">周期</van-radio>
                        </van-radio-group>
                    </div>
                </div>
                <div class="form_item">
                    <van-button @click="selectnew" style="width: 60%;margin-left: 10px;" size="small"
                        type="info">查询</van-button>
                    <van-button @click="clear" style="width: 60%;margin:0 10px;background-color: white;color: #687dbb;"
                        size="small" type="info">清空</van-button>
                </div>
            </div>
            <van-field label="维护标题">
                <template #input>
                    <el-select @change="maintainChang" style="width: 100% !important;" v-model="form.itemId"
                        placeholder="请选择">
                        <el-option v-for="item, i in maintainTitleList" :key="item.itemId" :label="item.maintainTitle"
                            :value="i">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field v-model="form.maintainDetails" disabled label="维护内容"></van-field>
            <van-field label="维护前照片">
                <template #input>
                    <van-uploader accept="*" v-model="form.beforeMaintainPic" multiple />
                </template>
            </van-field>
            <van-field label="计划完成时间">
                <template #input>
                    <van-cell :value="form.planFinishDate" @click="show = true" />
                    <van-calendar :min-date="new Date(2000, 0, 1)" :max-date="new Date(2100, 0, 31)" v-model="show"
                        @confirm="onConfirm" />
                </template>
            </van-field>
        </van-cell-group>
        <div class="bottom_box">
            <van-button class="bt" @click="edit(1)" type="info">提交</van-button>
            <van-button class="bt" @click="edit(2)" type="default">取消</van-button>
        </div>
        <br />
        <br />
    </div>
</template>

<script>
import { maintaincreatenew, querysimpleinfo, queryinfo, queryallline } from '@/api/rollers'
import { ImagePreview } from 'vant';
export default {
    name: "Home",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            line: '',
            temp: 0,
            form: {
                deviceId: '',
                resultDetails: '',
                planFinishDate: '',
                maintainTitle: '',
                maintainDetails: '',
                beforeMaintainPic: []
            },
            date: '',
            eform: {

            },
            itemId: 0,
            checkPic: [],
            show: false,
            Branch: '宝日汽车板',
            repairPic: [],
            lineList: [],
            deviceList: [],
            maintainTitleList: []
        };
    },
    mounted() {
        this.my.title = "创建精密维护计划"; //页面标题
        this.my.left = true; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar
        queryallline().then((res) => {
            console.log(res.result);
            this.lineList = res.result.line;
        })
    },
    watch: {
        'form.baoRobotNumber'(newVal) {
            if (newVal != "") {
                this.$eiInfo.parameter = {
                    productionLine: 0,
                    deviceNumber: "",
                    baoRobotNumber: newVal
                }
                querysimpleinfo(this.$eiInfo).then((res) => {
                    this.deviceList = res.result.deviceList
                    this.form.deviceId = res.result.deviceList[0].deviceName
                    this.deviceId = res.result.deviceList[0].deviceId
                    this.form.deviceNumber = res.result.deviceList[0].deviceNumber
                    this.selectnew();
                })
            } else {
                this.clear();
            }

        },
    },
    methods: {
        clear() {
            this.tableData = []
            this.form.deviceId = ''
            this.form.deviceNumber = ''
            this.form.baoRobotNumber = ''
            this.form.itemId = ''
            this.line = ''
            this.dataCount = null
            this.temp = 0
        },
        // 扫码
        toQrCode() {
            this.$router.push({ path: '/test' })
        },
        // 设备名称选择事件
        selectdevice(i) {
            console.log(i);
            this.form.baoRobotNumber = this.deviceList[i].baoRobotNumber
            this.form.deviceNumber = this.deviceList[i].deviceNumber
            this.deviceId = this.deviceList[i].deviceId
            this.selectnew();
        },
        // 维护标题选择事件
        maintainChang(i) {
            console.log(i);
            this.form.maintainDetails = this.maintainTitleList[i].maintainDetails
            this.itemId = this.maintainTitleList[i].itemId
            this.selectnew();
        },
        selectnew() {
            this.$eiInfo.parameter = {
                deviceId: this.deviceId,
                code: this.my.code,
                pageNum: 1,
                temp: parseInt(this.temp)
            }
            this.$eiInfo.parameter
            queryinfo(this.$eiInfo).then((res) => {
                this.maintainTitleList = res.result.maintain;
                // this.tableData = res.result.maintain
                // this.dataCount = res.result.dataCount
                // this.option.series[0].data = res.result.countFinish
            })
        },
        // 查询机组下设备列表
        selectline(i) {
            this.form.deviceId = ''
            this.form.deviceNumber = ''
            this.form.baoRobotNumber = ''
            this.$eiInfo.parameter = {
                productionLine: i
            }
            querysimpleinfo(this.$eiInfo).then((res) => {
                console.log(res.result.deviceList);
                this.deviceList = res.result.deviceList;
            })
        },
        formatDate(date) {
            console.log(date);
            let y = date.getFullYear()
            let m = date.getMonth() + 1
            m = m < 10 ? ('0' + m) : m
            let d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            let dateTime = y + '-' + m + '-' + d;
            return dateTime;
        },
        onConfirm(date) {
            this.show = false;
            this.form.planFinishDate = this.formatDate(date);
        },
        Preview(x, index) {
            console.log(x);
            let imgList = []
            for (let i = 0; i < x.length; i++) {
                imgList.push(x[i].url)
            }
            ImagePreview(
                {
                    images: imgList,
                    startPosition: index,
                }
            )
        },
        edit(s) {
            switch (s) {
                case 1:
                    // if (this.form.) {
                    //     this.$notify({ type: "warning", message: "请上传维护前照片！" })
                    // } else if (this.form.checkResult == "") {
                    //     this.$notify({ type: "warning", message: "请选择点检结果！" })
                    // } else {
                    let formData = new FormData();
                    formData.append('itemId', this.itemId);
                    formData.append('userId', this.my.userInfo.id);
                    formData.append('planFinishDate', this.form.planFinishDate);
                    // formData.append('beforeMaintainPic', this.form.beforeMaintainPic);
                    for (let i = 0; i < this.form.beforeMaintainPic.length; i++) {
                        formData.append('beforeMaintainPic', this.form.beforeMaintainPic[i].file);
                    }
                    // console.log(cList);
                    // console.log(rList);
                    maintaincreatenew(formData).then((res) => {
                        this.$notify({ type: "success", message: res.sys.msg })
                        this.$router.back();
                    })
                    // }

                    break;
                case 2:
                    this.$router.back();
                    break;
            }
        }
    },
};
</script>



<style scoped>
.form {
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    padding: 14px 0;
}

.van-button--info {
    color: #fff;
    background-color: #687dbb;
    border: 1px solid #687dbb;
}

/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #687dbb;
}

/* /deep/.el-input {
    width: 110px !important;
    margin-left: 4px;
    height: 32px;
} */


/deep/.el-input__inner {
    /* width: 110px !important; */
    margin-left: 4px;
    height: 32px;
}

/* 
/deep/ .el-input--suffix .el-input__inner {
    width: 110px !important;
    margin-left: 4px;
    height: 32px;
} */

/deep/.el-input__icon {
    height: 116%;
}

.pag {
    background-color: white;
    padding: 10px 0;
    justify-content: center;
    display: flex;
    overflow: hidden;
    border-top: 1px solid #ededed;
}

.chart {
    width: 100%;
    height: 400px;
}


.tableBox {
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    padding: 14px 10px;
    border-top: 1px solid #ededed;
}

.form_item {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;
}

.form_item2 {
    width: 100%;
    margin-left: 7%;
}

.inp {
    width: 42%;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    margin: 0 10px;
}

label {
    width: 35%;
    display: flex;
    font-size: 0.7rem;
    justify-content: space-between;
    text-align: right;
    white-space: nowrap;
}

.van-button--info {
    color: #fff;
    background-color: #687dbb;
    border: 1px solid #687dbb;
}

/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #687dbb;
}

/* /deep/.el-input {
    width: 110px !important;
    margin-left: 4px;
    height: 32px;
}

/deep/.el-input__inner {
    width: 110px !important;
    margin-left: 4px;
    height: 32px;
}

/deep/ .el-input--suffix .el-input__inner {
    width: 110px !important;
    margin-left: 4px;
    height: 32px;
} */

/* /deep/.el-input__icon {
    height: 116%;
} */

.upimg {
    width: 80px;
    height: 80px;
    object-fit: cover;
}

/deep/ .van-button--plain.van-button--info {
    color: white;
}

.bottom_box {
    width: 100%;
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-evenly;
}

.bt {
    width: 150px;
}
</style>