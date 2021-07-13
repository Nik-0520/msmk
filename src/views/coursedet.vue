<template>
  <div class="coursedet">
    <van-nav-bar :title="$route.meta.title" right-text="按钮" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="cluster-o" style="18" />
      </template>
    </van-nav-bar>

    <div class="wrap">
      <div class="detail_hand w">
        <div class="detail_title">{{detail.title}}</div>
        <div class="detail_price">
          <span>
            <i class="iconfont icon-jinbi"></i>
            {{detail.price == 0?'免费':detail.price}}
          </span>
          <i @click="setCollect(detail.id)" :class="flag?'iconfont icon-shoucang1 iconactive':'iconfont icon-shoucang1'"></i>
        </div>
        <div class="detail_zong">共{{detail.total_periods}}课 | {{detail.browse_num}}人已报名</div>
        <div class="detail_time">
          开课时间:
          <span>{{detail.start_play_date | fnTimes}}</span> -
          <span>{{detail.end_play_date | fnTimes}}</span>
        </div>
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
        <div class="detail_text" v-html="detail.course_details"></div>
      </div>
    </div>
    <div class="wrap">
      <div class="detail_introduce w">
        <div class="detail_title">课程大纲</div>
        <div class="detail_text">
          <span class="hui">回访</span>
          <span class="title">{{detail.title}}</span>
          <p>{{Number(detail.created_at) | fnTimes}}</p>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="detail_ping w">
        <div class="detail_title">课程评论</div>
        <div class="content">
          <img src="http://xl.9yuecloud.com/assets/img/empty.0d284c2e.png" alt />
        </div>
      </div>
    </div>

    <div class="btn">立即报名</div>
  </div>
</template>

<script>
import { NavBar, Toast, Icon, Button } from "vant";
import { getCourseInfo, getCollect, delCollect } from "../utils/api/api";
import times from "../utils/times";
export default {
  data() {
    return {
      detail: {},
      teachersData: [],
      flag: false,
    };
  },
  filters: {
    fnTimes: function (value) {
      return times(value);
    },
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
    setCollect(id) {
      if (this.flag) {
        delCollect({ id, type: 1 }).then((res) => {
          if (res.data.data == 1) {
            this.flag = false;
          }
        });
      } else {
        getCollect({ course_basis_id: id, type: 1 }).then((res) => {
          this.flag = true
        });
      }
    },
  },
  created() {
    getCourseInfo(this.$route.query.id).then((res) => {
      console.log(res.data.data);
      this.detail = res.data.data.info;
      this.teachersData = res.data.data.teachers;
    });
  },
};
</script>

<style lang="scss" scoped>
.coursedet {
  width: 100%;
  padding: 45px 0;
  .van-nav-bar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
}
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
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .detail_price {
    font-size: 16px;
    color: #eb6100;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    span i {
      color: #e9bf17;
    }
    .icon-shoucang1 {
      color: #000;
    }
    .iconactive {
      color: #eb6100;
    }
  }
  .detail_zong {
    font-size: 12px;
    color: #797979;
    margin-bottom: 20px;
  }
  .detail_time {
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
    justify-content: space-around;
    li {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      text-align: center;
    }
  }
}
.detail_introduce {
  overflow: hidden;
  .detail_title {
    font-size: 18px;
    margin: 10px 0 16px;
  }
  .detail_text {
    margin-bottom: 10px;
    .hui {
      padding: 4px 4px;
      border-radius: 3px;
      background-color: #eb6100;
      color: #fff;
      margin-right: 6px;
    }
  }
}
.detail_ping {
  overflow: hidden;
  .detail_title {
    font-size: 18px;
    margin: 10px 0 16px;
  }
  .content {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    img {
      width: 100px;
      height: 100px;
    }
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