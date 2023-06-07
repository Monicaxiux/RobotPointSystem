<template>
    <div>
        <van-cell-group>
            <van-field label="委托单号">
                <template #input>
                    {{ form.recordNumber }}
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
            <van-field label="巡检照片">
                <template #input>
                    <div style="display: flex;flex-wrap: wrap;">
                        <div v-if="form.checkPic">
                            <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                    <div style="text-align: center;margin: 3px;" v-for="item, index in form.checkPic[0]"
                                        :key="item">
                                        <img class="upimg" @click="Preview(form.checkPic[0], index)" :src="item.url"><br />
                                        <van-button style="width: 40px;" @click="imgdelete(item.url)" size="mini"
                                            type="danger">删除</van-button>
                                    </div>
                                </div>
                                <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                    <div style="text-align: center;margin: 3px;" v-for="item, index in form.checkPic[1]"
                                        :key="item">
                                        <video class="upimg" controls :src="item.url"></video><br />
                                        <van-button style="width: 40px;" @click="imgdelete(item.url)" size="mini"
                                            type="danger">删除</van-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 100%;">
                            <van-uploader accept="*" v-model="checkPic" multiple />
                        </div>
                    </div>
                </template>
            </van-field>
            <van-field label="点检结果">
                <template #input>
                    <van-radio-group v-model="form.checkResult" direction="horizontal">
                        <van-radio name="检查正常">检查正常</van-radio>
                        <van-radio name="检查异常">检查异常</van-radio>
                    </van-radio-group>
                    <!-- <el-select size="mini" v-model="form.checkResult" placeholder="请选择">
                        <el-option v-for="item in checkResultList" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select> -->
                </template>
            </van-field>
            <van-field label="检查时间">
                <template #input>
                    {{ form.checkDate }}
                </template>
            </van-field>
            <van-field v-if="form.checkResult == '检查异常'" label="是否添加到精密维护关注项">
                <template #input>
                    <van-radio-group v-model="form.needMaintain" direction="horizontal">
                        <van-radio name="1">是</van-radio>
                        <van-radio name="0">否</van-radio>
                    </van-radio-group>
                    <el-button @click="help">帮助</el-button>
                </template>
            </van-field>
            <van-dialog v-model="show" title="帮助">
                <div style="padding: 20px;">
                    <div style="display: flex;">
                        <el-input style="width: 300px;" size="mini" placeholder="故障标题" v-model="from.title" clearable>
                        </el-input>
                        <!-- <el-select @change="getData()" size="mini" v-model="from.faultResponsible" placeholder="责任方">
                            <el-option v-for="item in faultResponsibleList" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select> -->
                        &nbsp;&nbsp;
                        <van-button style="width: 70px;height: 28px;" @click="getData()" size="mini" plain
                            type="info">查询</van-button>
                    </div>
                    <br />
                    <el-table :row-style="{ height: '30px' }" align="center" :cell-style="{ padding: '0px' }"
                        :data="tableData" border style="width: 100%;font-size: 0.6rem">
                        <!-- <el-table-column prop="faultTitle" label="故障标题">
                        </el-table-column> -->
                        <el-table-column prop="faultTitle" label="故障描述">
                        </el-table-column>
                        <el-table-column prop="address" width="63" label="操作">
                            <template slot-scope="scope">
                                <van-button style="width: 40px;" @click="handleEdit(scope.row)" size="mini" plain
                                    type="info">查看</van-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </van-dialog>
            <van-field label="问题描述">
                <template #input>
                    <van-field v-model="form.resultDetails" placeholder="请输入问题" />
                </template>
            </van-field>
            <van-field label="下一步责任方">
                <template #input>
                    <el-select size="mini" v-model="form.responsible" placeholder="请选择">
                        <el-option v-for="item in responsibleList" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </van-field>
            <van-field label="检查人">
                <template #input>
                    {{ form.checkUser }}
                    <!-- <van-field v-model="form.checkUser" disabled placeholder="请输入检查人" /> -->

                </template>
            </van-field>
            <van-field label="修复图片">
                <template #input>
                    <div style="display: flex;flex-wrap: wrap;">
                        <div v-if="form.repairPic">
                            <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                    <div style="text-align: center;margin: 3px;" v-for="item, index in form.repairPic[0]"
                                        :key="item">
                                        <img class="upimg" @click="Preview(form.repairPic[0], index)" :src="item.url"><br />
                                        <van-button style="width: 40px;" @click="imgdelete(item.url)" size="mini"
                                            type="danger">删除</van-button>
                                    </div>
                                </div>
                                <div style="width: 100%;display: flex;flex-wrap: wrap;">
                                    <div style="text-align: center;margin: 3px;" v-for="item, index in form.repairPic[1]"
                                        :key="item">
                                        <video class="upimg" controls :src="item.url"></video><br />
                                        <van-button style="width: 40px;" @click="imgdelete(item.url)" size="mini"
                                            type="danger">删除</van-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width: 100%;">
                            <van-uploader accept="*" v-model="repairPic" multiple />
                        </div>
                    </div>
                </template>
            </van-field>
            <van-field label="修复结果">
                <template #input>
                    <el-select size="mini" v-model="form.repairResult" placeholder="请选择">
                        <el-option v-for="item in repairResultList" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
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
                    <!-- <van-field v-model="form.repairUser" disabled placeholder="请输入修复人" /> -->
                </template>
            </van-field>
            <van-field label="点检备注">
                <template #input>
                    <van-field v-model="form.remark" placeholder="请输入备注信息" />
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
import { recordallinfo, recorduploaddata, querytypical, checkrecorddeletepic } from '@/api/rollers'
import { ImagePreview } from 'vant';
export default {
    name: "Home",
    data() {
        return {
            my: this.$myStore(), //使用Pinia的值
            form: {},
            from: {
                title: '',
                // faultResponsible: '',
                checkResult: '',
                pageNum: 1
            },
            checkPic: [],
            repairPic: [],
            currentPage: 1,
            dataCount: 0,
            show: false,
            tableData: [],
            checkResultList: [
                {
                    value: '检查正常',
                    label: '检查正常'
                },
                {
                    value: '检查异常',
                    label: '检查异常'
                }
            ],
            repairResultList: [
                {
                    value: '修复正常',
                    label: '修复正常'
                },
                {
                    value: '需要跟踪',
                    label: '需要跟踪'
                },
                {
                    value: '无法修复',
                    label: '无法修复'
                }
            ],
            responsibleList: [
                {
                    value: '机械',
                    label: '机械'
                },
                {
                    value: '电气',
                    label: '电气'
                },
                {
                    value: '仪表',
                    label: '仪表'
                },
                {
                    value: '无需修复',
                    label: '无需修复'
                }
            ],
            faultResponsibleList: [
                {
                    value: '机械',
                    label: '机械'
                },
                {
                    value: '电气',
                    label: '电气'
                },
                {
                    value: '仪表',
                    label: '仪表'
                }
            ],
        };
    },
    mounted() {
        this.my.title = "点检详情"; //页面标题
        this.my.left = true; //NavBar是否开启返回按键
        this.my.isNavBar = true; //是否开启NavBar
        this.my.isTabBar = true; //是否开启TabBar
        console.log(this.my.recordId);
        this.getList();
    },

    methods: {
        handleEdit(row) {
            this.my.faultId = row.faultId;
            this.$router.push({ path: "/addFault" });
        },
        getList() {
            this.$eiInfo.parameter = {
                recordId: this.my.recordId
            }

            recordallinfo(this.$eiInfo).then((res) => {
                console.log(res.result.result);
                this.form = JSON.parse(JSON.stringify(res.result.result))
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
        imgdelete(url) {
            this.$dialog.confirm({
                title: '确认',
                message: '是否删除？',
            })
                .then(() => {
                    this.$eiInfo.parameter = {
                        deletePic: url,
                        recordId: this.my.recordId
                    }
                    checkrecorddeletepic(this.$eiInfo).then((res) => {
                        if (res.sys.status == 1) {
                            this.$notify({ type: "success", message: res.sys.msg })
                            this.getList();
                        }
                    })
                })
                .catch(() => {
                    // on cancel
                });
        },
        handleCurrentChange(val) {
            this.from.pageNum = val;
            this.getData();
        },
        getData() {
            this.$eiInfo.parameter = {
                recordId: this.my.recordId,
                // faultResponsible: this.from.faultResponsible,
                title: this.from.title
            }
            querytypical(this.$eiInfo).then((res) => {
                this.tableData = res.result.faultList
                this.dataCount = res.result.dataCount
            })
        },
        help() {
            // this.getData();
            this.show = true;
        },
        play(url) {
            console.log(url);
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
                    if (!this.form.checkPic && this.checkPic.length == 0) {
                        this.$notify({ type: "warning", message: "请上传检查照片！" })
                    } else {
                        let formData = new FormData();
                        formData.append('recordId', this.form.recordId);
                        formData.append('checkResult', this.form.checkResult);
                        formData.append('resultDetails', this.form.resultDetails);
                        formData.append('responsible', this.form.responsible);
                        formData.append('checkUser', this.form.checkUser);
                        formData.append('repairResult', this.form.repairResult);
                        formData.append('repairUser', this.form.repairUser);
                        formData.append('remark', this.form.remark);
                        formData.append('needMaintain', parseInt(this.form.needMaintain));
                        formData.append('userId', this.my.userInfo.id);
                        console.log(this.checkPic);
                        for (let i = 0; i < this.checkPic.length; i++) {
                            formData.append('checkPic', this.checkPic[i].file);
                        }
                        for (let i = 0; i < this.repairPic.length; i++) {
                            formData.append('repairPic', this.repairPic[i].file);
                        }
                        // console.log(cList);
                        // console.log(rList);
                        recorduploaddata(formData).then((res) => {
                            this.$notify({ type: "success", message: res.sys.msg })
                            this.$router.back();
                        })
                    }

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
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #687dbb;
}

.pag {
    background-color: white;
    padding: 10px 0;
    justify-content: center;
    display: flex;
    overflow: hidden;
    border-top: 1px solid #ededed;
}

.upimg {
    width: 80px;
    height: 80px;
    object-fit: cover;
}

.bottom_box {
    width: 100%;
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-evenly;
}

.van-button--info {
    color: #fff;
    background-color: #687dbb;
    border: 1px solid #687dbb;
}

.bt {
    width: 150px;
}
</style>