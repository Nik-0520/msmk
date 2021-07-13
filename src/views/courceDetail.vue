<template>
  <div>
    <van-nav-bar :title="$route.meta.title" right-text="按钮" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="cluster-o" style="18" />
      </template>
    </van-nav-bar>

    <div class="wrap">
      <div class="detail_hand w">
        <div class="detail_title">{{detail.title}}</div>
        <div class="detail_price"><span>{{detail.price}}</span></div>
        <div class="detail_zong">共{{detail.total_periods}}课 | {{detail.browse_num}}人已报名</div>
      </div>
    </div>

    <div class="wrap">
      <div class="detail_team w">
        <div class="detail_title">教学团队</div>
        <ul class="teachers_Content">
          <li v-for="item in teachersData" :key="item.teacher_id">
            <img :src="item.teacher_avatar" alt />
            <p>{{item.teacher_name}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="wrap">
      <div class="detail_introduce w">
        <div class="detail_title">课程介绍</div>
        <div class="detail_text">{{detail.course_statement}}</div>
      </div>
    </div>
    <div class="wrap">
      <div class="detail_introduce w">
        <div class="detail_title">课程大纲</div>
        <div class="detail_text">{{detail.course_statement}}</div>
      </div>
    </div>

    <div class="btn">立即报名</div>
  </div>
</template>

<script>
import { NavBar, Toast, Icon, Button } from "vant";
import { getCourseInfo } from "../utils/api/api";
export default {
  data() {
    return {
      detail: {},
      teachersData: [],
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Button.name]: Button,
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
  created() {
    getCourseInfo(this.$route.query.id).then((res) => {
      this.detail = res.data.data.info;
      this.teachersData = res.data.data.teachers;
    });
  },
};
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
  height: 44px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #eb6100;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #fff;
}
.detail_hand {
  overflow: hidden;
  .detail_title {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .detail_price {
    font-size: 16px;
    color: #eb6100;
    margin-bottom: 10px;
  }
  .detail_zong {
    font-size: 16px;
    color: #797979;
    margin-bottom: 20px;
  }
}
.detail_team {
  overflow: hidden;
  .detail_title {
    font-size: 18px;
    margin: 10px 0 16px;
  }
  .teachers_Content {
    display: flex;
    li {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      margin-right: 10px;
      text-align: center;
    }
  }
}
.detail_introduce {
  overflow: hidden;
  height: 92px;
  .detail_title {
    font-size: 18px;
    margin: 10px 0 16px;
  }
}
.w {
  margin: 0 18px;
}
.wrap {
  width: 100%;
  background-color: #fff;
  margin-bottom: 15px;
}
</style>