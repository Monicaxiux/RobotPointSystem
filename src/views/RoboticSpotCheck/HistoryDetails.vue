<template>
    <div>
        <van-cell-group>
            <van-field label="委托单号">
                <template #input>
                    {{ form.recordNumber }}
                </template>
            </van-field>
            <van-field label="点检类型">
                <template #input>
                    {{ form.itemCycleResult }}
                </template>
            </van-field>
            <van-field label="点检日期">
                <template #input>
                    {{ form.checkRecordDate }}
                </template>
            </van-field>
            <van-field label="分厂">
                <template #input>
                    {{ form.factory }}
                </template>
            </van-field>
            <van-field label="产线">
                <template #input>
                    {{ form.productionLine }}
                </template>
            </van-field>
            <van-field label="设备名称">
                <template #input>
                    {{ form.deviceName }}
                </template>
            </van-field>
            <van-field label="点检标题">
                <template #input>
                    {{ form.checkItem }}
                </template>
            </van-field>
            <van-field label="点检内容">
                <template #input>
                    {{ form.checkDetails }}
                </template>
            </van-field>
            <van-field label="检查照片">
                <template #input>
                    <div style="display: flex;flex-wrap: wrap;">
                        <div v-if="form.checkPic">
                            <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                <div style="width: 100%;">
                                    <img class="upimg" v-for="item, index in form.checkPic[0]"
                                        @click="Preview(form.checkPic[0], index)" :src="item.url">
                                </div>
                                <div style="width: 100%;">
                                    <video style="width: 100%;height: 100px;" controls
                                        v-for="item, index in form.checkPic[1]" @click="play(item)" :src="item.url"></video>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </van-field>
            <van-field label="点检结果">
                <template #input>
                    {{ form.checkResult }}
                </template>
            </van-field>
            <van-field label="检查时间">
                <template #input>
                    {{ form.checkDate }}
                </template>
            </van-field>
            <van-field label="问题描述">
                <template #input>
                    {{ form.resultDetails }}
                </template>
            </van-field>
            <van-field label="责任方">
                <template #input>
                    {{ form.responsible }}
                </template>
            </van-field>
            <van-field label="检查人">
                <template #input>
                    {{ form.checkUser }}
                </template>
            </van-field>
            <van-field label="修复照片">
                <template #input>
                    <div style="display: flex;flex-wrap: wrap;">
                        <div v-if="form.repairPic">
                            <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                <div style="width: 100%;">
                                    <img class="upimg" v-for="item, index in form.repairPic[0]"
                                        @click="Preview(form.repairPic[0], index)" :src="item.url">
                                </div>
                                <div style="width: 100%;">
                                    <video style="width: 100%;height: 100px;" controls
                                        v-for="item, index in form.repairPic[1]" @click="play(item)"
                                        :src="item.url"></video>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </van-field>
            <van-field label="修复结果">
                <template #input>
                    {{ form.repairResult }}
                </template>
            </van-field>
            <van-field label="修复时间">
                <template #input>
                    {{ form.repairDate }}
                </template>
            </van-field>
            <van-field label="修复人">
                <template #input>
                    {{ form.repairUser }}
                </template>
            </van-field>
            <van-field label="备注">
                <template #input>
                    {{ form.remark }}
                </template>
            </van-field>
        </van-cell-group>
        <br />
        <br />
        <br />
    </div>
</template>

<script>
import { recordhistoryall } from '@/api/rollers'
import { ImagePreview } from 'vant';

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
            if (this.form.checkPic) {
                for (let i = 0; i < this.form.checkPic[0].length; i++) {
                    this.form.checkPic[0][i] = { url: this.form.checkPic[0][i] }
                }
                if (this.form.checkPic[1]) {
                    for (let i = 0; i < this.form.checkPic[1].length; i++) {
                        this.form.checkPic[1][i] = { url: this.form.checkPic[1][i] }
                    }
                }
            }
            if (this.form.repairPic) {
                for (let i = 0; i < this.form.repairPic[0].length; i++) {
                    this.form.repairPic[0][i] = { url: this.form.repairPic[0][i] }
                }
                if (this.form.repairPic[1]) {
                    for (let i = 0; i < this.form.repairPic[1].length; i++) {
                        this.form.repairPic[1][i] = { url: this.form.repairPic[1][i] }
                    }
                }
            }
        })
    },

    methods: {
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
.bottom_box {
    width: 100%;
    display: flex;
    height: 60px;
    /* flex-wrap: wrap; */
    align-items: center;
    justify-content: space-evenly;
}

.upimg {
    width: 80px;
    height: 80px;
    object-fit: cover;
}

.bt {
    width: 100px;
}
</style>