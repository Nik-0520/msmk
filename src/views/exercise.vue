<template>
  <div>
    <van-nav-bar :title="$route.meta.title" />
      <div class="question">
        <ul>
          <li v-for="(item,index) in navData" :key="index">
            <div class="imgmin">
                <img :src="item.images" alt />
            </div>
            <p>{{item.title}}</p>
          </li>
        </ul>
      </div>

      <div class="recent">
          <div class="title">
              近期模考
          </div>
          <div class="sort_time">
              <div class="sort">默认排序</div>
              <div class="time">时间</div>
          </div>
          <div class="content">
              <img src="/images/empty@2x.png" alt="">
              <p>暂无安排,敬请期待</p>
          </div>
      </div>
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  data() {
    return {
      navData: [
        {
          title: "考点专练",
          images: "/images/exam-point.png",
        },
        {
          title: "套卷练习",
          images: "/images/paper-package.png",
        },
        {
          title: "仿真模考",
          images: "/images/exam.png",
        },
        {
          title: "错题练习",
          images: "/images/wrong-test.png",
        },
        {
          title: "测评记录",
          images: "/images/assess.png",
        },
        {
          title: "习题收藏",
          images: "/images/question-collocet.png",
        },
      ],
    };
  },
  components: {
    [NavBar.name]: NavBar,
  },
};
</script>

<style lang="scss" scoped>
    .question{
        margin: 16px 10px;
        padding: 10px 16px;
        background-color: #fff;
        border-radius: 6px;
        ul{
            width: 100%;
            display: flex;
            // justify-content: space-between;
            list-style: none;
            flex-wrap: wrap;
            li{
                width: 25%;
                text-align: center;
                margin-bottom: 6px;
                .imgmin{
                    width: 40px;
                    height: 40px;
                    text-align: center;
                    border: 1px solid #eee;
                    border-radius: 50%;
                    display: inline-block;
                    line-height: 50px;
                    img{
                        width: 19px;
                        height: 19px;
                    }
                }
            }
        }
    }
    .recent{
        background-color: #fff;
        padding: 14px 10px;
        .title{
            margin-bottom: 8px;
            font-size: 16px;
        }
        .sort_time{
            display: flex;
            justify-content: space-between;
            .sort{
                color: red;
            }
        }
        .content{
            text-align: center;
            img{
                width: 33%;
            }
        }
    }
</style>