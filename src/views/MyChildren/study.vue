<template>
  <div class="study">
    <van-nav-bar :title="$route.meta.title" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template #right>
        <i style="font-size:24px" class="iconfont icon-xuexijihua"></i>
      </template>
    </van-nav-bar>
    <div class="content">
      <div class="topTitle">{{titleData.name}}({{titleData.num}})</div>
      <div class="item" v-for="item in data" :key="item.course_id">
        <div class="title">{{item.title}}</div>
        <div class="times"><i class="iconfont icon-shijian" style="font-size:12px"> </i> {{item.start_play_date}}~{{item.end_play_date}} | 共{{item.section_num}}课时</div>
        <div class="hour">
          <div class="hour_item"></div>
          <div class="hour_text">已学习0%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from "vant";
import { myStudy } from "../../utils/api/api";
export default {
  data() {
    return {
      data: [],
      titleData: {},
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
        this.$router.push('/my/studyCalendar')
    },
  },
  components: {
    [NavBar.name]: NavBar,
  },
  created() {
    myStudy(2).then((res) => {
      this.data = res.data.data.courseList;
      this.titleData = res.data.data.typeNum[0];
    });
  },
};
</script>

<style lang="scss" scoped>
.study{
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.content {
  background-color: #fff;
  padding: 0 20px;
  .topTitle {
    font-size: 14px;
    margin-bottom: 10px;
    padding-bottom: 14px;
    text-align: center;
    position: relative;
    &::after {
      content: "";
      width: 60%;
      height: 3px;
      background-color: red;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .item{
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 0 10px;
      .title{
          margin: 10px 0;
          font-size: 14px;
      }
      .times{
          margin-bottom: 10px;
      }
      .hour{
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          .hour_item{
              width: 100px;
              height: 3px;
              background-color: #ccc;
              margin-right: 6px;
          }
      }
  }
}
</style>