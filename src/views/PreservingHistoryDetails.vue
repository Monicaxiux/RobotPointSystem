<template>
    <div>
        <van-cell-group>
            <van-field label="设备名称">
                <template #input>
                    {{ form.deviceName }}
                </template>
            </van-field>
            <van-field label="设备编号">
                <template #input>
                    {{ form.deviceNumber }}
                </template>
            </van-field>
            <van-field label="宝罗工号">
                <template #input>
                    {{ form.baoRobotNumber }}
                </template>
            </van-field>
            <van-field label="创建日期">
                <template #input>
                    {{ form.createDate }}
                </template>
            </van-field>
            <van-field label="创建人">
                <template #input>
                    {{ form.createUser }}
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
            <van-field label="维护状态">
                <template #input>
                    {{ form.maintainStatus }}
                </template>
            </van-field>
            <van-field label="维护前照片">
                <template #input>
                    <div style="display: flex;flex-wrap: wrap;">
                        <div v-if="form.beforeMaintainPic">
                            <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                <div style="width: 100%;">
                                    <img class="upimg" v-for="item, index in form.beforeMaintainPic[0]"
                                        @click="Preview(form.beforeMaintainPic[0], index)" :src="item.url">
                                </div>
                                <div style="width: 100%;">
                                    <video style="width: 100%;height: 100px;" controls
                                        v-for="item, index in form.beforeMaintainPic[1]" @click="play(item)"
                                        :src="item.url"></video>
                                </div>
                            </div>
                        </div>
                        <div style="width: 100%;">
                            <van-uploader accept="*" v-model="beforeMaintainPic" multiple />
                        </div>
                    </div>
                </template>
            </van-field>
            <!-- <van-field label="维护人">
                <template #input>
                    {{ form.maintainUser }}
                </template>
            </van-field> -->
            <van-field v-model="form.maintainResult" label="维护结果"></van-field>
            <van-field label="维护后照片">
                <template #input>
                    <div style="display: flex;flex-wrap: wrap;">
                        <div v-if="form.afterMaintainPic">
                            <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                <div style="width: 100%;">
                                    <img class="upimg" v-for="item, index in form.afterMaintainPic[0]"
                                        @click="Preview(form.afterMaintainPic[0], index)" :src="item.url">
                                </div>
                                <div style="width: 100%;">
                                    <video style="width: 100%;height: 100px;" controls
                                        v-for="item, index in form.afterMaintainPic[1]" @click="play(item)"
                                        :src="item.url"></video>
                                </div>
                            </div>
                        </div>
                        <div style="width: 100%;">
                            <van-uploader accept="*" v-model="afterMaintainPic" multiple />
                        </div>
                    </div>
                </template>
            </van-field>
            <div class="bottom_box">
                <van-button class="bt" @click="edit(1)" type="info">提交</van-button>
                <van-button class="bt" @click="edit(3)" type="default">取消</van-button>
                <van-button class="bt" @click="edit(2)" type="danger">删除</van-button>
            </div>
            <br />
            <br />
        </van-cell-group>
    </div>
</template>

<script>
import { maintainqueryall, deleterecord, updaterecord } from '@/api/rollers'
import { ImagePreview } from 'vant';

export default {
    name: "Home",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            form: {},
            afterMaintainPic: [],
            beforeMaintainPic: []
        };
    },
    mounted() {
        this.my.title = "维护详情"; //页面标题
        this.my.left = true; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar
        this.$eiInfo.parameter = {
            recordId: this.my.recordId
        }
        maintainqueryall(this.$eiInfo).then((res) => {
            this.form = JSON.parse(JSON.stringify(res.result.maintainRecord));
            if (this.form.beforeMaintainPic) {
                for (let i = 0; i < this.form.beforeMaintainPic[0].length; i++) {
                    this.form.beforeMaintainPic[0][i] = { url: this.form.beforeMaintainPic[0][i] }
                }
                if (this.form.beforeMaintainPic[1]) {
                    for (let i = 0; i < this.form.beforeMaintainPic[1].length; i++) {
                        this.form.beforeMaintainPic[1][i] = { url: this.form.beforeMaintainPic[1][i] }
                    }
                }
            }
            if (this.form.afterMaintainPic) {
                for (let i = 0; i < this.form.afterMaintainPic[0].length; i++) {
                    this.form.afterMaintainPic[0][i] = { url: this.form.afterMaintainPic[0][i] }
                }
                if (this.form.afterMaintainPic[1]) {
                    for (let i = 0; i < this.form.afterMaintainPic[1].length; i++) {
                        this.form.afterMaintainPic[1][i] = { url: this.form.afterMaintainPic[1][i] }
                    }
                }
            }
        })
    },

    methods: {
        edit(i) {
            switch (i) {
                case 1:
                    let formData = new FormData();
                    formData.append('recordId', this.my.recordId);
                    formData.append('maintainResult', this.form.maintainResult);

                    for (let i = 0; i < this.beforeMaintainPic.length; i++) {
                        formData.append('beforeMaintainPic', this.beforeMaintainPic[i].file);
                    }
                    for (let i = 0; i < this.afterMaintainPic.length; i++) {
                        formData.append('afterMaintainPic', this.afterMaintainPic[i].file);
                    }
                    updaterecord(formData).then((res) => {
                        if (res.sys.status == 1) {
                            this.$notify({ type: "success", message: res.sys.msg })
                            this.$router.back();
                        }
                    })
                    break;
                case 2:
                    this.$dialog.confirm({
                        title: '确认',
                        message: '是否删除？',
                    })
                        .then(() => {
                            this.$eiInfo.parameter = {
                                recordId: this.my.recordId
                            }
                            deleterecord(this.$eiInfo).then((res) => {
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
                case 3:
                    this.$router.back();
                    break;
            }

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
    },
};
</script>



<style scoped>
.upimg {
    width: 80px;
    height: 80px;
    object-fit: cover;
}

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