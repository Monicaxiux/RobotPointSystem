<template>
    <div class='box'>
        <van-uploader accept="*" :after-read="afterRead" />
        <img :src="image">
        <h3 v-if="words_result.length != 0">识别内容：</h3>
        <span v-for="item, i in words_result" :key="item">
            {{ '内容' + (i + 1) + '：' + item.words }}<br />
        </span>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    components: {},
    data() {
        return {
            key: {
                grant_type: 'client_credentials',
                client_id: 'BQGA16cGuZSymRnTwht0MDGg',
                client_secret: 'fCB6gLtTGtg8QlPjfEXbj5pPoxnXw5bW'
            },
            imgdata: {
                image: '',
            },
            access_token: '',
            words_result: [],
            image: ''
        }
    },
    computed: {},
    watch: {},
    methods: {
        // 上传图像
        afterRead(file) {
            // 页面回显图片
            this.image = file.content
            // 拿到图片base64编码之后进行urlencode转换
            this.imgdata.image = encodeURIComponent(file.content)
            // 上传图片 access_token：路径参数 image：body参数 请求头应为'Content-Type': 'application/x-www-form-urlencoded'
            axios({
                url: `/api/rest/2.0/ocr/v1/general_basic?access_token=${this.access_token}`,
                method: 'POST',
                data: 'image=' + this.imgdata.image,
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((res) => {
                // words_result 收到的识别结果
                this.words_result = res.data.words_result
            })
        }
    },
    created() {

    },
    mounted() {
        // 获取access_token
        axios.get(`/api/oauth/2.0/token?grant_type=${this.key.grant_type}&client_id=${this.key.client_id}&client_secret=${this.key.client_secret}`).then((res) => {
            this.access_token = res.data.access_token;
        })
    },
}
</script>
<style lang='less' scoped>
.box {
    margin-left: 10px;

    h3 {
        margin: 0, 0, 0, 20px;
    }

    span {
        margin-left: 20px;
    }
}
</style>