<template>
  <mu-container style="max-height: 90vh">
    <div style="text-align: center; font-size: 100px">
      <!-- <i class="iconfont icon-guanlizhongxin-shezhi-03 i"></i> -->
      <van-icon class="i" name="shield-o" />
    </div>
    <h1>机器人智能点检系统</h1>
    <br />
    <div class="form">
      <div class="input">
        <!-- <i class="iconfont icon-weibiaoti562"></i> -->
        <van-icon name="manager" />
        <input v-model="userForm.loginName" placeholder="请输入用户名" />
      </div>
      <div class="input">
        <van-icon name="lock" />
        <input v-model="userForm.password" type="password" placeholder="请输入密码" />
      </div>
      <div class="form_tools">
        <!-- <div>忘记密码?</div> -->
      </div>
      <div class="btn" @click="submit">登录</div>
      <span>注册</span>
    </div>

  </mu-container>
</template>

<script>
import { login } from "@/api/user";
export default {
  data() {
    return {
      my: this.$myStore(), //使用Pinia
      // 登录表单验证
      loginNameRules: [
        { validate: (val) => !!val, message: "必须填写用户名" },
        { validate: (val) => val.length >= 3, message: "用户名长度大于3" },
      ],
      passwordRules: [
        { validate: (val) => !!val, message: "必须填写密码" },
        {
          validate: (val) => val.length >= 1 && val.length <= 10,
          message: "密码长度大于1小于10",
        },
      ],
      // 登录表单
      userForm: {
        loginName: "Admin0",
        password: "0",
      },
    };
  },
  mounted() {
    this.my.isTabBar = false; //是否开启TabBar
    this.my.isNavBar = false; //是否开启NavBar
  },
  methods: {
    // 登录
    submit() {

      this.$notify({ type: "success", message: "欢迎回来！" }),
        this.$router.replace({ path: "/home" }),
        this.my.userStatus = true
      // login(this.$alex).then((res) => {
      //   res
      //     ? (this.$notify({ type: "primary", message: "欢迎回来！" }),
      //       this.$router.replace({ path: "/home" }),
      //       (this.my.userStatus = true))
      //     : this.clear();
      // })
    },
    // 清空文本框与验证规则
    clear() {
      this.$refs.form.clear();
      this.userForm = {
        loginName: "",
        password: "",
      };
    },
  },
};
</script>
<style lang="less" scoped>
.form {
  max-width: 95%;
  // max-height: 281px;
  padding: 20px;
  margin: 0 auto;
  text-align: center;
  border-radius: 20px;
  /* box-shadow: 1px 4px 10px 1px rgb(0 0 0 / 22%); */
}

.form_tools {
  width: 100%;
  text-align: left;
  margin-bottom: 40px;
}

span {
  margin: 30px 0px;
  display: block;
  font-size: 18px;
  width: 100%;
}

.i {
  color: #4291fb;
  font-size: 83px;
}

.mu-form-item-content {
  justify-content: center;
}

.input {
  width: 100%;
  display: flex;
  align-items: center;
  height: 55px;
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
  color: #1d92d7;
  font-size: 2rem;
  font-weight: normal;
}

.btn {
  color: rgba(255, 255, 255, 0.9);
  border-radius: 9px;
  width: 100%;
  height: 55px;
  font-size: 18px;
  text-align: center;
  line-height: 55px;
  background: linear-gradient(-45deg, #338aff, #3cf0c5, #338aff, #3cf0c5);
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