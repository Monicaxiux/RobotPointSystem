<template>
  <mu-container style="max-height: 90vh">
    <div style="text-align: center; font-size: 100px">
      <!-- <i class="iconfont icon-guanlizhongxin-shezhi-03 i"></i> -->
      <van-icon class="i" name="shield-o" />
    </div>
    <h1>设备智能化运维<br />管理系统</h1>
    <div class="form">
      <span style="text-align: left;">工号</span>
      <div class="input">
        <van-icon name="manager" />
        <input v-model="userForm.workNumber" placeholder="请输入工号" />
      </div>
      <span style="text-align: left;">密码</span>
      <div class="input">
        <van-icon name="lock" />
        <input v-model="userForm.password" type="password" placeholder="请输入密码" />
      </div>
      <div class="form_tools">
        <!-- <div style="text-align: right;">忘记密码?</div> -->
        <div @click="qh" style="text-align: right;">{{ status }}</div>
      </div>
      <div class="btn" @click="submit">登录</div>
      <!-- <span>注册</span> -->
    </div>
    <br />
    <br />
  </mu-container>
</template>

<script>
import { login } from "@/api/user";
export default {
  data() {
    return {
      my: this.$myStore(), //使用Pinia
      // 登录表单验证
      // 登录表单
      userForm: {
        workNumber: "",
        password: "",
      },
      status: localStorage.baseURL == 'http://47.101.183.203:8192' ? '当前：正式环境' : '当前：测试环境'
    };
  },
  mounted() {
    this.my.isTabBar = false; //是否开启TabBar
    this.my.isNavBar = false; //是否开启NavBar
  },
  methods: {
    qh() {
      if (localStorage.baseURL == 'http://47.101.183.203:8192') {
        localStorage.baseURL = 'http://192.168.0.92:8192'
        this.$toast.success('地址切换成功');
        console.log('正式');
        setTimeout(() => {
          location.reload();
        }, 500)
      } else {
        localStorage.baseURL = 'http://47.101.183.203:8192'
        this.$toast.success('地址切换成功');
        console.log('测式');
        setTimeout(() => {
          location.reload();
        }, 500)
      }
    },
    // 登录
    submit() {
      this.$eiInfo.parameter = this.userForm
      if (this.userForm.workNumber == "" || this.userForm.password == "") {
        this.$toast.fail('请输入账号或密码！');
      } else {
        login(this.$eiInfo).then((res) => {
          if (res.sys.status != -1) {
            this.$toast.success('欢迎回来');
            this.my.userInfo = res.userInfo.user;
            this.$router.replace({ path: "/home" })
            this.my.userStatus = true
          } else {
            this.$toast.fail('工号或密码错误');
            this.clear();
          }
        })
      }
    },
    // 清空文本框与验证规则
    clear() {
      this.userForm = {
        workNumber: "",
        password: "",
      };
    },
  },
};
</script>
<style lang="less" scoped>
.form {
  max-width: 87%;
  // max-height: 281px;
  padding: 20px;
  margin: 0 auto;
  text-align: center;
  border-radius: 20px;
  box-shadow: 1px 4px 10px 1px rgb(0 0 0 / 17%);
}

.form_tools {
  width: 100%;
  text-align: left;
  margin-bottom: 9px;
}

span {
  margin: 10px 0px;
  display: block;
  font-size: 16px;
  width: 100%;
}

.i {
  color: #687dbb;
  font-size: 83px;
}

.mu-form-item-content {
  justify-content: center;
}

.input {
  width: 100%;
  display: flex;
  align-items: center;
  height: 32px;
  margin-bottom: 20px;
  border: 1px solid #bdb6b68f;
  padding: 20px;
  border-radius: 9px;

  input {
    border: none;
    background-color: #4a484500;
  }

  i {
    font-size: 21px;
    margin-right: 5px;
  }
}

h1 {
  /* margin-top: 220px !important; */
  text-align: center;
  color: #687dbb;
  font-size: 1.6rem;

  font-weight: bold;
}

.btn {
  color: rgba(255, 255, 255, 0.9);
  border-radius: 9px;
  width: 100%;
  height: 40px;
  font-size: 15px;
  text-align: center;
  font-weight: bold;
  line-height: 40px;
  // background: linear-gradient(-45deg, #338aff, #3cf0c5, #338aff, #3cf0c5);
  background: linear-gradient(-45deg, #338aff, #687dbb, #338aff, #687dbb);
  background-size: 600%;
  -webkit-animation: anime 8s linear infinite;
  animation: anime 8s linear infinite;
}

@keyframes anime {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@-webkit-keyframes anime {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>