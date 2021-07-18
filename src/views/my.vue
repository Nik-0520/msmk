<template>
  <div class="my">
    <div class="my_header">
      <div class="header_content">
        <div class="hander_info">
          <div class="avitar">
            <img class="userImg" :src="userInfo.avatar" alt />
            <img class="vip_logo" src="/images/皇冠-2@2x.png" alt />
          </div>
          <div class="username">
            <div class="name">
              <span>{{userInfo.nickname}}</span>
              <img @click="toInfo" src="/images/修改@2x.png" alt />
            </div>
            <div class="right">去约课</div>
          </div>
        </div>
        <div class="hander_mine">
          <ul>
            <li v-for="(item,index) in mineList" :key="index" @click="tostudy(index)">
              <div class="count">{{item.count}}</div>
              <div class="name">{{item.name}}</div>
              <div class="note">{{item.note}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box_left">
        <img src="/images/xin.png" alt />
      </div>
      <div class="box_content">
        <p>邀请好友注册APP，享多重好礼</p>
        <p>显示特惠，多邀多得</p>
      </div>
      <div class="box_right">
        <i class="iconfont icon-arrow-right"></i>
      </div>
    </div>
    <div class="menu_box">
      <ul>
        <li v-for="(item,index) in navData" :key="index">
          <p class="title">{{item.title}}</p>
          <div class="item-box">
            <div class="item" v-for="elem in item.children" :key="elem.id" @click="toMychildren(elem.route)">
              <img :src="elem.icon" alt />
              <p>{{elem.text}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { GetuserInfo } from "../utils/api/api";
export default {
  data() {
    return {
      userInfo: {},
      mineList: [
        {
          count: 0,
          name: "我的特色课",
          note: "已购特色课程的学习",
          style: "my-study",
          url: "MyStudy",
        },
        {
          count: 0,
          name: "一对一辅导",
          note: "我的一对一老师辅导",
          style: "my-plan",
          url: "Record",
        },
        {
          count: 0,
          name: "剩余学习币",
          note: "查看剩余学习币",
          style: "my-period",
          url: "MyCurrency",
        },
      ],
      navData: [
        {
          title: "课程相关",
          children: [
            {
              icon: "/images/关注的老师.png",
              text: "关注的老师",
              route: "/my/concern",
              id: Math.random(),
            },
            {
              icon: "/images/我的收藏.png",
              text: "我的收藏",
              route: "/my/collect",
              id: Math.random(),
            },
          ],
        },
        {
          title: "客服相关",
          children: [
            {
              icon: "/images/订单.png",
              text: "课程订单",
              route: "/my/order",
              id: Math.random(),
            },
            {
              icon: "/images/订单.png",
              text: "会员订单",
              route: "/",
              id: Math.random(),
            },
            {
              icon: "/images/订单.png",
              text: "约课订单",
              route: "/",
              id: Math.random(),
            },
          ],
        },
        {
          title: "我的账户",
          children: [
            {
              icon: "/images/优惠券.png",
              text: "优惠券",
              route: "/",
              id: Math.random(),
            },
            {
              icon: "/images/学习卡.png",
              text: "学习卡",
              route: "/",
              id: Math.random(),
            },
            {
              icon: "/images/会员.png",
              text: "会员",
              route: "/",
              id: Math.random(),
            },
          ],
        },
        {
          title: "自助服务",
          children: [
            {
              icon: "/images/我的消息.png",
              text: "我的消息",
              route: "/",
              id: Math.random(),
            },
            {
              icon: "/images/意见反馈.png",
              text: "意见反馈",
              route: "/",
              id: Math.random(),
            },
            {
              icon: "/images/在线客服.png",
              text: "在线客服",
              route: "/",
              id: Math.random(),
            },
            {
              icon: "/images/设置1.png",
              text: "设置",
              route: "/my/setNewPass",
              id: Math.random(),
            },
          ],
        },
      ],
    };
  },
  methods: {
    toMychildren(path) {
      if (path == "/my/order") {
        console.log(1);
        this.$router.push({
          path,
          query: {
            order_type: 2,
          },
        });
      } else {
        this.$router.push(path);
      }
    },
    toInfo() {
      this.$router.push("/my/info");
    },
    tostudy(index) {
      if (index == 0) {
        this.$router.push("/my/study");
      }
    },
  },
  created() {
    GetuserInfo().then((res) => {
      this.userInfo = res.data.data;
      this.mineList[0].count = res.data.data.courses;
      this.mineList[1].count = res.data.data.integral;
      this.mineList[2].count = res.data.data.oto.toFixed(2);
    });
  },
};
</script>

<style lang="scss" scoped>
.my {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-bottom: 100px;
  .my_header {
    width: 100%;
    height: 218px;
    background: url("/images/user_bg.ab306a5c.png") no-repeat;
    background-size: 100%;
    position: relative;
    .header_content {
      background-color: #fff;
      width: 90%;
      height: 173px;
      border-radius: 6px;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      .hander_info {
        margin-left: 15px;
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .avitar {
          width: 52px;
          height: 52px;
          border: 1px solid #777;
          border-radius: 50%;
          position: relative;
          .userImg {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
          .vip_logo {
            position: absolute;
            top: -7px;
            right: -7px;
            width: 19px;
            height: 19px;
          }
        }
        .username {
          width: 75%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .name {
            font-size: 16px;
            span {
              margin-right: 4px;
            }
            img {
              width: 15px;
              height: 15px;
            }
          }
          .right {
            background-color: #fc5500;
            color: #fff;
            padding: 4px 8px;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }
        }
      }
      .hander_mine {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        height: 90px;
        ul {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          list-style: none;
          li {
            width: 32%;
            height: 100%;
            border: 1px solid #eee;
            text-align: center;
            .count {
              font-size: 18px;
              color: #fc5500;
              font-weight: bold;
              margin: 6px 0;
            }
            .name {
              font-size: 16px;
              margin-bottom: 6px;
            }
            .note {
              width: 90%;
              margin: 0 auto;
              display: block;
              letter-spacing: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: normal;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1; /*规定最多显示两行*/
              text-align: center;
            }
          }
        }
      }
    }
  }
  .box {
    margin: 15px 18px;
    width: 90%;
    height: 44px;
    background: linear-gradient(to right, #ff944b, #fd5702);
    border-radius: 30px;
    display: flex;
    justify-content: space-between;
    .box_left,
    .box_right {
      width: 10%;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      img {
        width: 20px;
        height: 20px;
        margin-left: 20px;
      }
    }
    .box_content {
      width: 70%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #fff;
      p {
        margin: 0;
      }
    }
  }
  .menu_box {
    width: 90%;
    margin: 0 auto;
    ul {
      width: 100%;
      list-style: none;
      li {
        border-bottom: 1px solid #eee;
        .title {
          font-size: 16px;
        }
        .item-box {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          .item {
            width: 25%;
            text-align: center;
            margin-bottom: 10px;
            img {
              width: 20px;
              height: 20px;
              margin-bottom: 6px;
            }
            p {
              margin: 0;
            }
          }
        }
      }
    }
  }
}
</style>