<template>
  <div>
    <van-nav-bar :title="$route.meta.title" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
  },
  components: {
      [NavBar.name]:NavBar,
  },
};
</script>

<style lang="scss" scoped>
</style>