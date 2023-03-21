<template>
    <div>
        <van-cell-group>
            <!-- <van-field v-model="Branch" disabled label="分厂">

            </van-field> -->
            <van-field label="机组">
                <template #input>
                    <el-select @change="selectline" v-model="line" placeholder="请选择">
                        <el-option v-for="item in lineList" :key="item.lineId" :label="item.lineName" :value="item.lineId">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field label="设备名称">
                <template #input>
                    <el-select v-model="form.deviceId" placeholder="请选择">
                        <el-option v-for="item in deviceList" :key="item.deviceId" :label="item.deviceName"
                            :value="item.deviceId">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field v-model="form.itemId" label="项次编号"></van-field>
            <van-field label="维护日期">
                <template #input>
                    <van-cell :value="form.planFinishDate" @click="show = true" />
                    <van-calendar :min-date="new Date(2000, 0, 1)" :max-date="new Date(2100, 0, 31)" v-model="show"
                        @confirm="onConfirm" />
                </template>
            </van-field>
            <!-- <van-field v-model="form.maintainTitle" label="维护标题"></van-field> -->
            <!-- <van-field label="维护标题">
                <template #input>
                    <el-select v-model="form.maintainTitle" placeholder="请选择">
                        <el-option v-for="item in maintainTitleList" :key="item.value" :label="item.title"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </van-field> -->
            <!-- <van-field v-model="form.maintainDetails" label="维护内容"></van-field> -->
            <van-field label="维护前照片">
                <template #input>
                    <van-uploader accept="*" v-model="form.beforeMaintainPic" multiple />
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
import { maintaincreatenew, querysimpleinfo, queryallline } from '@/api/rollers'
import { ImagePreview } from 'vant';
export default {
    name: "Home",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            line: '',
            form: {
                deviceId: '',
                resultDetails: '',
                planFinishDate: '',
                maintainTitle: '',
                maintainDetails: '',
                beforeMaintainPic: []
            },
            date: '',
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

    methods: {
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
                    formData.append('deviceId', this.form.deviceId);
                    formData.append('planFinishDate', this.form.planFinishDate);
                    formData.append('maintainTitle', this.form.maintainTitle);
                    formData.append('maintainDetails', this.form.maintainDetails);
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
.van-button--info {
    color: #fff;
    background-color: #687dbb;
    border: 1px solid #687dbb;
}

/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #687dbb;
}

/deep/.el-input {
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
}

/deep/.el-input__icon {
    height: 116%;
}

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