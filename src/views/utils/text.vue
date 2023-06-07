<template>
    <div class="saoma">
        <qrcode-stream @decode="onDecode" @init="onInit" style="height: 100vh;width:100vw">
            <div>
                <div class="qr-scanner">
                    <div class="box">
                        <div class="line"></div>
                        <div class="angle"></div>
                    </div>
                </div>
            </div>
        </qrcode-stream>
    </div>
</template>
 
<script>
import {
    QrcodeStream
} from 'vue-qrcode-reader';
export default {
    components: {
        QrcodeStream
    },
    data() {
        return {
            result: '', // 扫码结果信息
            error: '' // 错误信息
        }
    },
    methods: {
        onDecode(result) {
            if (result) {
                this.$router.push({
                    path: '/',
                    query: {
                        code: result,
                    }
                })
            }
        },
        async onInit(promise) {
            try {
                await promise
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    window.alert('您需要授予相机访问权限')
                    this.$router.push({ path: '/' })
                } else if (error.name === 'NotFoundError') {
                    this.$router.push({ path: '/' })
                    window.alert('这个设备上没有摄像头')
                } else if (error.name === 'NotSupportedError') {
                    this.$router.push({ path: '/' })
                    window.alert('所需的安全上下文(HTTPS、本地主机)')
                } else if (error.name === 'NotReadableError') {
                    this.$router.push({ path: '/' })
                    window.alert('相机被占用')
                } else if (error.name === 'OverconstrainedError') {
                    this.$router.push({ path: '/' })
                    window.alert('安装摄像头不合适')
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.$router.push({ path: '/' })
                    window.alert('此浏览器不支持流API')
                }
            }
        },
    }
}
</script>
 
<style scoped>
.saoma {
    width: 100vw;
    height: 100vh;
}

.qr-scanner {
    background-image:
        linear-gradient(0deg,
            transparent 24%,
            rgba(32, 255, 77, 0.1) 25%,
            rgba(32, 255, 77, 0.1) 26%,
            transparent 27%,
            transparent 74%,
            rgba(32, 255, 77, 0.1) 75%,
            rgba(32, 255, 77, 0.1) 76%,
            transparent 77%,
            transparent),
        linear-gradient(90deg,
            transparent 24%,
            rgba(32, 255, 77, 0.1) 25%,
            rgba(32, 255, 77, 0.1) 26%,
            transparent 27%,
            transparent 74%,
            rgba(32, 255, 77, 0.1) 75%,
            rgba(32, 255, 77, 0.1) 76%,
            transparent 77%,
            transparent);
    background-size: 3rem 3rem;
    background-position: -1rem -1rem;
    width: 100%;
    /* height: 100%; */
    height: 100vh;
    position: relative;
    background-color: #1110;
    /* background-color: #111; */
}

.qr-scanner .box {
    width: 213px;
    height: 213px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    border: 0.1rem solid rgba(0, 255, 51, 0.2);
    /* background: url('http://resource.beige.world/imgs/gongconghao.png') no-repeat center center; */
}

.qr-scanner .line {
    height: calc(100% - 2px);
    width: 100%;
    background: linear-gradient(180deg, rgba(0, 255, 51, 0) 43%, #00ff33 211%);
    border-bottom: 3px solid #00ff33;
    transform: translateY(-100%);
    animation: radar-beam 2s infinite alternate;
    animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
    animation-delay: 1.4s;
}

.qr-scanner .box:after,
.qr-scanner .box:before,
.qr-scanner .angle:after,
.qr-scanner .angle:before {
    content: '';
    display: block;
    position: absolute;
    width: 3vw;
    height: 3vw;
    border: 0.2rem solid transparent;
}

.qr-scanner .box:after,
.qr-scanner .box:before {
    top: 0;
    border-top-color: #00ff33;
}

.qr-scanner .angle:after,
.qr-scanner .angle:before {
    bottom: 0;
    border-bottom-color: #00ff33;
}

.qr-scanner .box:before,
.qr-scanner .angle:before {
    left: 0;
    border-left-color: #00ff33;
}

.qr-scanner .box:after,
.qr-scanner .angle:after {
    right: 0;
    border-right-color: #00ff33;
}

@keyframes radar-beam {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(0);
    }
}
</style>