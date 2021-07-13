<template>
  <div class="cart" @click="toSporDetail(elem.id)">
    <div class="name">{{elem.title || elem.teacher_name}}</div>
    <div class="click_rate">共{{elem.click_rate?elem.click_rate:0}}点击量</div>
    <div class="cart_item">
      <img class="cart_img" :src="elem.cover_img" />
      <span class="cart_description">{{elem.description}}</span>
    </div>
    <div class="cart_footer">
      <span>{{elem.id}}人报名</span>
      <span class="price"><i class="iconfont icon-jinbi"></i>{{elem.price}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["elem"],
  methods: {
    toSporDetail(id) {
      this.$emit('toSporDetail',id)
    }
  },
};
</script>

<style lang="scss" scoped>
.price{
  color:#ff3c00;
  font-size: 16px;
  font-weight: bold;
  .icon-jinbi{
    color: orange;
    font-size: 18px;
  }
}
</style>