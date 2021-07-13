<template>
  <div>
    <van-nav-bar :title="$route.meta.title" />
    <van-tabs v-model="active" color="red" title-active-color="red">
      <van-tab title="待上课">
          <img src="http://xl.9yuecloud.com/assets/img/no-message.8d3ca5af.png" alt="">
      </van-tab>
      <van-tab title="已上课"><img src="http://xl.9yuecloud.com/assets/img/no-message.8d3ca5af.png" alt=""></van-tab>
      <van-tab title="已取消"><img src="http://xl.9yuecloud.com/assets/img/no-message.8d3ca5af.png" alt=""></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from "vant";
export default {
  data() {
    return {
      active: 0,
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
};
</script>

<style lang="scss" scoped>
</style>