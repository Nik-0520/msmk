<template>
  <div class="setPass">
    <van-nav-bar :title="$route.meta.title" left-text="返回"  right-text="跳过" left-arrow  @click-right="onClickRight" @click-left="onClickLeft" />
    <van-form>
      <van-field v-model="password" type="text" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" @click="setPassWord">确定</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { NavBar, Field, Form, Button } from "vant";
import { setPass } from "../../utils/api/api";
export default {
  data() {
    return {
      password: "",
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Form.name]: Form,
    [Button.name]: Button,
  },
  methods: {
    setPassWord() {
      setPass({
        password: this.password,
        mobile: this.$store.state.loginData.mobile,
        sms_code: this.$store.state.loginData.sms_code,
      }).then((res) => {
        this.$router.push('/my')
        this.$store.commit('loginData',{})
      });
    },
    onClickLeft() {
      this.$router.push("/index");
    },
    onClickRight(){
        this.$router.push("/my");
        this.$store.commit('loginData',{})
    }
  },
};
</script>

<style lang="scss" scoped>
</style>