<template>
  <div class="index">
    <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
      <van-swipe-item v-for="(item,index) in banner" :key="index">
        <img :src="item.banner_img" />
      </van-swipe-item>
    </van-swipe>

    <div class="nav_wrap">
      <ul class="nav">
        <li>
          <i class="iconfont icon-shuben" style="color:#5251da"></i>
          <p>特色课</p>
        </li>
        <li>
          <i class="iconfont icon-weixin" style="color:#73b3a5"></i>
          <p>一对一辅导</p>
        </li>
        <li>
          <i class="iconfont icon-xuexijihua"  style="color:#d88f72"></i>
          <p>学习日历</p>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="cartList" v-for="item in CartData" :key="item.channel_info.id">
        <div class="title">{{item.channel_info.name}}</div>
        <teachCart v-show="item.channel_info.type == 3" class="teachCart" v-for="elem in item.list" @toDetail="toTeachDetail" :key="elem.teacher_id" :elem="elem"></teachCart>
        <sportsCart v-show="item.channel_info.type == 1" class="cart" v-for="elem in item.list" @toSporDetail="toSporDetail" :key="elem.id" :elem="elem"></sportsCart>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner, cartList } from "../utils/api/api";
import { Swipe, SwipeItem } from "vant";
import sportsCart from "@/components/sportsCart.vue";
import teachCart from "@/components/teachCart.vue";
export default {
  data() {
    return {
      banner: [],
      CartData: [],
    };
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    sportsCart,
    teachCart
  },
  created() {
    getBanner().then((res) => {
      this.banner = res.data.data;
    });
    cartList().then((res) => {
      this.CartData = res.data.data;
    });
  },
  methods: {
      toTeachDetail(id) {
          this.$router.push({
            path:`/index/indexDetail`,
            query:{
              id
            }
          })
      },
      toSporDetail(id){
        this.$router.push({
          path:'/index/courceDetail',
          query:{
            id
          }
        })
      }
  },
};
</script>

<style lang="scss" scoped>
.index {
  padding-bottom: 60px;
}
.my-swipe {
  width: 100%;
  height: 110px;
  img {
    width: 100%;
    height: 100%;
  }
}
.nav_wrap {
  position: relative;
  height: 103px;
  width: 90%;
  margin: 0 auto;
  .nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    li {
      width: 103px;
      height: 103px;
      border-radius: 10px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: #fff;
      font-size: 14px;
      i {
        font-size: 26px;
      }
    }
  }
}

.content {
  padding: 0 10px;
  overflow: hidden;
  box-sizing: border-box;
  .title {
    box-sizing: border-box;
    margin: 10px 0;
    padding-left: 10px;
    border-left: 3px solid #ff0000;
    font-size: 18px;
  }
  /deep/ {
    .cart {
      background: #fff;
      padding: 10px;
      margin-bottom: 6px;
      .name {
        font-size: 18px;
      }
      .click_rate {
        font-size: 14px;
        color: rgb(173, 173, 173);
      }
      .cart_item {
        margin: 15px 0;
        font-size: 14px;
        margin-bottom: 15px;
        .cart_img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 20px;
        }
      }
      .cart_footer {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
      }
    }
  }
}
</style>