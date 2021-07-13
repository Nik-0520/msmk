<template>
  <div class="featureCart" @click="toDetail(data.id)">
    <div class="feature_title">{{data.title}}</div>
    <div class="feature_time">
      <span>{{data.start_play_date | fnTimes}}</span> |
      <span>共{{data.sales_num}}课时</span>
    </div>
    <div class="feature_teacher">
      <img :src="data.teachers_list[0].teacher_avatar" alt />
      <span>{{data.teachers_list[0].teacher_name}}</span>
    </div>
    <div class="feature_footer">
      <div class="left">{{data.browse_num}}人已报名</div>
      <div class="right_price">{{data.price == 0?'免费':data.price}}</div>
    </div>
  </div>
</template>

<script>
import times from "../utils/times";
export default {
  props: ["data"],
  filters: {
    fnTimes: function (value) {
      return times(value);
    },
  },
  methods: {
    toDetail(id) {
        this.$emit('toDetail',id)
    },
  },
};
</script>

<style lang="scss" scoped>
.featureCart {
  background-color: #fff;
  border-radius: 14px;
  margin-bottom: 15px;
  padding: 12px;
  .feature_title {
    font-size: 16px;
    margin: 14px 0;
  }
  .feature_teacher {
    margin: 8px 0;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
  .feature_footer {
    display: flex;
    justify-content: space-between;
    .right_price {
      font-size: 14px;
      color: #44a426;
    }
  }
}
</style>