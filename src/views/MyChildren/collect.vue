<template>
  <div>
    <van-nav-bar :title="$route.meta.title" left-arrow @click-left="onClickLeft" />
    <div class="content" v-if="data.length != 0">
      <div class="content_item" v-for="item in data" :key="item.collect_id">
        <div class="title">
          <div class="title_left">{{item.title}}</div>
          <div class="title_right" @click="editCollect(item.collect_id)">
            <i class="iconfont icon-shoucang"></i>
          </div>
        </div>
        <div class="time">
          <span>共{{item.section_num}}课时</span>
        </div>
        <div class="teachers">
          <img :src="item.teachersAvatar" alt />
          <span>{{item.teachers}}</span>
        </div>
        <div class="info">
          <div class="infn_left">{{item.sales_num}}人已关注</div>
          <div class="info_right">
            <i class="iconfont icon-jinbi"></i>
            {{item.price}}
          </div>
        </div>
      </div>
    </div>
    <div class="img" v-if="data.length == 0">
        <img src="/images/empty.png" alt="">
        <p>暂无收藏</p>
    </div>
  </div>
</template>

<script>
import { NavBar } from "vant";
import { getCollectAll, putCollect } from "../../utils/api/api";
export default {
  data() {
    return {
      page: 1,
      limit: 10,
      type: 1,
      data: [],
    };
  },
  components: {
    [NavBar.name]: NavBar,
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getCollectAll({
        page: this.page,
        limit: this.limit,
        type: this.type,
      }).then((res) => {
        this.data = res.data.data.list;
      });
    },
    editCollect(id) {
      putCollect({ id, type: 1 }).then((res) => {
        this.getData();
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 14px;
  .content_item {
    background-color: #fff;
    border-radius: 6px;
    padding: 14px 10px;
    margin-bottom: 14px;
    font-size: 16px;
    .title {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      margin-bottom: 16px;
      .icon-shoucang {
        color: red;
      }
    }
    .time {
      margin-bottom: 16px;
    }
    .teachers {
      color: #ccc;
      margin-bottom: 16px;
      img {
        width: 36px;
        height: 36px;
        vertical-align: middle;
        margin-right: 8px;
      }
    }
    .info {
      display: flex;
      justify-content: space-between;
      .info_right {
        color: red;
        .icon-jinbi {
          color: #ffa500;
        }
      }
    }
  }
}
.img{
    width: 100%;
    text-align: center;
}
</style>