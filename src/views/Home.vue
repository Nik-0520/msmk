<template>
  <div class="home">
    <router-view />
    <van-tabbar v-model="active" route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/index" icon=" iconfont icon--xiaolu ">首页</van-tabbar-item>
      <van-tabbar-item to="/course" icon=" iconfont icon-yigoukecheng ">课程</van-tabbar-item>
      <van-tabbar-item to="/record" icon=" iconfont icon-dianji ">约课记录</van-tabbar-item>
      <van-tabbar-item to="/exercise" icon=" iconfont icon-lianxi ">练习</van-tabbar-item>
      <van-tabbar-item to="/my" icon=" iconfont icon-wode1 ">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem  } from "vant";
export default {
  data() {
    return {
      active: 0,
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
};
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
}
</style>