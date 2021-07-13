<template>
  <div class="detail">
    <div class="header">
      <van-nav-bar :title="$route.meta.title" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="detail_wrap">
      <div class="detail_cart">
        <img :src="personal.avatar" alt />
        <div class="cart_xq">
          <div class="left">
            <span class="sex">女</span>
            <span>5年教龄</span>
          </div>
          <div class="right" @click="editCollect(personal.id)">{{flag == 1?'取消关注':'关注'}}</div>
        </div>
      </div>
    </div>

    <van-tabs v-model="active">
      <van-tab title="讲师介绍">内容 1</van-tab>
      <van-tab title="主讲课程">内容 2</van-tab>
      <van-tab title="学员评价">
        <img class="null" src="http://xl.9yuecloud.com/assets/img/empty.0d284c2e.png" alt />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Tabs, Tab } from "vant";
import { getIndexDetail, setCollect } from "../utils/api/api";
export default {
  data() {
    return {
      personal: {},
      flag: 0,
      active: 0,
      evaluateData: [],
    };
  },
  created() {
    getIndexDetail(this.$route.query.id).then((res) => {
      this.personal = res.data.data.teacher;
      this.flag = res.data.data.flag;
    });
  },
  components: {
    [NavBar.name]: NavBar,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    editCollect(id) {
      setCollect(id).then((res) => {
        getIndexDetail(id).then((res) => {
          this.flag = res.data.data.flag;
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  .header {
    width: 100%;
    height: 100px;
    background-color: #5ba2f4;
  }
  .detail_wrap {
    height: 70px;
    width: 100%;
  }
  .detail_cart {
    overflow: hidden;
    box-sizing: border-box;
    background-color: #fff;
    margin: 0 10px;
    padding: 10px;
    margin: 0 10px;
    height: 100px;
    width: 95%;
    border-radius: 8px;
    position: absolute;
    top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .cart_xq {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-right: 10px;
      span {
        margin-right: 10px;
      }
      .right {
        background-color: #ebeefe;
        color: #eb6100;
        padding: 4px 6px;
        border-radius: 10px;
      }
    }
  }
}
.van-nav-bar {
  background-color: #5ba2f4;
  color: #fff;
  /deep/ {
    .van-icon-arrow-left::before,
    .van-nav-bar__title {
      color: #fff;
    }
  }
}
.null {
  width: 100%;
  height: 100%;
}
</style>