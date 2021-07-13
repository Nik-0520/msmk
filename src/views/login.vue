<template>
  <div class="login_page">
    <div class="logo">
      <img src="http://xl.9yuecloud.com/assets/img/login.a4c656a9.png" alt />
    </div>
    <div class="login">
      <van-form>
        <van-field v-model="mobile" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
        <div class="others">
          <span class="forget">找回密码</span>
          <span class="login_CAPTCHA" @click="$router.push('/smslogin')">注册/验证码登录</span>
        </div>
        <div class="btn">
          <van-button style="background: #FD6614;" round block type="warning" @click="login">提交</van-button>
        </div>
        <div class="otherLogin">
          第三方登录
          <div class="txLogin">
            <div class="wxLogin">
              <img src="../.././public/weixin.png" alt />
              <span>微信登录</span>
            </div>
            <div class="qqLogin">
              <img src="../.././public/qq.png" alt />
              <span>QQ登录</span>
            </div>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Form, Field, Button } from "vant";
import { SmsLogin } from "../utils/api/api";
export default {
  data() {
    return {
      mobile: "",
      password: "",
    };
  },
  methods: {
    login() {
      SmsLogin({ mobile: this.mobile, password: this.password,type:1 }).then(res=>{
        localStorage.setItem("adminToken", res.data.data.remember_token);
        localStorage.setItem("user_id", res.data.data.id);
        this.$router.push('/my')
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
    .otherLogin {
      margin: 20px 8px;
      text-align: center;
      .txLogin {
        height: 34px;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        .wxLogin {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 38px;
            height: 28px;
            margin-right: 20px;
          }
        }
        .qqLogin {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 34px;
            height: 34px;
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>