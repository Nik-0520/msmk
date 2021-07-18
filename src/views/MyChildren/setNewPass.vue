<template>
  <div class="setPass">
    <van-nav-bar :title="$route.meta.title" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form>
      <van-field center clearable v-model="getsmscodeData.mobile" placeholder="请输入手机号">
        <template #button>
          <van-button :disabled="flag" :class="flag?'verification active':'verification'" size="small" @click="getCode" type="primary">获取验证码</van-button>
          <!-- <p>获取验证码</p> -->
        </template>
      </van-field>
      <van-field v-model="getsmscodeData.smscode" type="text" name="验证码" placeholder="请输入短信验证码">
        <template #button>
          <span v-show="flag" class="active">( {{time}} )</span>
          <!-- <p>获取验证码</p> -->
        </template>
      </van-field>
      <van-field v-model="getsmscodeData.password" type="text" name="密码" placeholder="密码" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" @click="setPassWord">确定</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { NavBar, Field, Form, Button } from "vant";
import { setPass , getSmsCode } from "../../utils/api/api";
export default {
  data() {
    return {
      getsmscodeData: {
        mobile: "",
        password: "",
        smscode: "",
        sms_type: "login",
      },
      flag: false,
      time: 60,
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Form.name]: Form,
    [Button.name]: Button,
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
    setPassWord() {
      setPass({
        password: this.getsmscodeData.password,
        mobile: this.getsmscodeData.mobile,
        sms_code: this.getsmscodeData.smscode,
      }).then((res) => {
        this.$router.push("/my");
      });
    },
    onClickLeft() {
      this.$router.push("/index");
    },
  },
};
</script>

<style lang="scss" scoped>
.verification {
  background-color: #fff;
  color: #eb6100;
  border: 0;
}
.active {
  color: #ccc;
}
</style>