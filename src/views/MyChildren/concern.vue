<template>
  <div class="concern">
    <van-nav-bar :title="$route.meta.title" left-arrow @click-left="onClickLeft" />
    <div class="content" v-if="data.length != 0">
      <div class="content_item" v-for="item in data" :key="item.collect_id">
        <img :src="item.avatar" alt />
        <div class="text">
          <div class="name">{{item.teacher_name}}</div>
          <div class="name">{{item.introduction}}</div>
        </div>
        <div class="fouc" @click="EditCollect(item.collect_id)">取消关注</div>
      </div>
    </div>
    <div class="img" v-if="data.length == 0">
        <img src="/images/empty.png" alt="">
        <p>暂无关注</p>
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
      type: 2,
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
    onClickLeft() {
      this.$router.go(-1);
    },
    EditCollect(id) {
      putCollect({ id, type: 2 }).then((res) => {
        this.getData()
      });
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
    padding: 0 10px;
    margin-bottom: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      margin-right: 18px;
    }
    .text {
      width: 75%;
      div {
        margin: 15px 0;
      }
    }
    .fouc {
      width: 20%;
      padding: 6px;
      border-radius: 6px;
      background-color: #fdefe5;
      color: red;
      text-align: center;
    }
  }
}
.img{
    width: 100%;
    text-align: center;
}
</style>