<template>
  <div>
    <van-nav-bar :title="$route.meta.title" right-text="保存" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <div class="content">
      <div class="name" v-if="$route.query.tag == 'nickname'">
        <input type="text" v-model="val" placeholder="请输入昵称" />
      </div>
      <div class="sex" v-if="$route.query.tag == 'sex'">
        <div class="item" v-for="item in sexData" :key="item.value" @click="tab(item.value)">
          <div class="item_left">{{item.sex}}</div>
          <div class="item_right">
            <i :class="item.value == currentVal?'iconfont icon-select-bold active':''"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from "vant";
import { editUser, GetInfo } from "../../utils/api/api";
export default {
  data() {
    return {
      val: "",
      sexData: [
        { sex: "男", value: 0 },
        { sex: "女", value: 1 },
      ],
      currentVal: this.$route.query.value
    };
  },
  components: {
    [NavBar.name]: NavBar,
  },
  created() {
    this.val = this.$route.query.value;
  },
  methods: {
    tab(val) {
      this.currentVal = val;
    },
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      if (this.$route.query.tag == "nickname") {
        editUser({ nickname: this.val });
      } else if (this.$route.query.tag == "sex") {
        editUser({ sex: this.currentVal });
      }
      this.$router.push("/my/info");
      GetInfo();
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  .van-nav-bar__text {
    color: #000;
  }
}
.content {
  margin-top: 16px;
  .name {
    background-color: #fff;
    padding: 14px 20px;
    input {
      width: 100%;
      height: 100%;
      border: 0;
      font-size: 14px;
    }
  }
  .sex {
    background-color: #fff;
    .item {
      padding: 0 30px 0 10px;
      height: 50px;
      font-size: 16px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      .item_right {
        .active{
          font-size: 24px;
          font-weight: bold;
          color: red;
        }
      }
    }
  }
}
</style>