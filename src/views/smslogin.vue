<template>
  <div class="login_page">
    <div class="logo">
      <img src="http://xl.9yuecloud.com/assets/img/login.a4c656a9.png" alt />
    </div>
    <div class="login">
      <van-form>
        <van-field center clearable v-model="getsmscodeData.mobile" placeholder="请输入手机号">
          <template #button>
            <van-button :disabled="flag" :class="flag?'verification active':'verification'" size="small" type="primary" @click="getCode">获取验证码</van-button>
            <!-- <p>获取验证码</p> -->
          </template>
        </van-field>
        <!-- <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" /> -->
        <van-field v-model="getsmscodeData.smscode" type="text" name="验证码" placeholder="请输入短信验证码">
          <template #button>
            <span v-show="flag" class="active">( {{time}} )</span>
            <!-- <p>获取验证码</p> -->
          </template>
        </van-field>
        <div class="others">
          <span class="forget">*未注册的手机号将自动注册</span>
          <span class="login_CAPTCHA" @click="$router.push('/login')">使用密码登录</span>
        </div>
        <div class="btn">
          <van-button color="linear-gradient(to right, #FF944B, #FD5702)" round block type="warning" @click="btn">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Form, Field, Button } from "vant";
import { getSmsCode, SmsLogin } from "../utils/api/api";
export default {
  data() {
    return {
      getsmscodeData: {
        mobile: "",
        smscode: "",
        sms_type: "login",
      },
      time: 60,
      flag: false,
    };
  },
  methods: {
    getCode() {
      getSmsCode({
        mobile: this.getsmscodeData.mobile,
        sms_type: this.getsmscodeData.sms_type,
      }).then((res) => {
        this.flag = true;
        this.time = 60;
        var timer = setInterval(() => {
          this.time--;
          if (this.time <= 0) {
            this.flag = false;
            clearInterval(timer);
          }
        }, 1000);
      });
    },
    btn(values) {
      SmsLogin({
        mobile: this.getsmscodeData.mobile,
        sms_code: this.getsmscodeData.smscode,
        type: 2,
        client: 1,
      }).then((res) => {
        localStorage.setItem("adminToken", res.data.data.remember_token);
        localStorage.setItem("user_id", res.data.data.id);
        this.$store.commit("loginData", {
          mobile: this.getsmscodeData.mobile,
          sms_code: this.getsmscodeData.smscode,
        });
        if (res.data.is_new == 1) {
          this.$router.push("/setPass");
        } else {
          this.$router.push("/my");
        }
      });
    },
  },
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
  },
};
</script>

<style lang="scss" scoped>
.login .active {
  color: #ccc;
}
.login_page {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  .logo {
    width: 100%;
    margin: 80px 0;
    display: flex;
    justify-content: center;
    img {
      width: 70%;
    }
  }
  .login {
    width: 100%;
    display: flex;
    justify-content: center;
    /deep/ {
      .van-form {
        width: 314px;
        padding: 0;
        margin: 0;
      }
    }
    .others {
      width: 90%;
      display: flex;
      margin: 0.133rem auto;
      justify-content: space-between;
      color: #ccc;
    }
    .btn {
      margin-top: 40px;
    }
    .van-cell {
      width: 90%;
    }
  }
}
.verification {
  background-color: #fff;
  color: #eb6100;
  border: 0;
}
</style>