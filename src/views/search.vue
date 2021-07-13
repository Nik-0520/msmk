<template>
  <div class="search">
    <form action="/">
      <!-- <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" /> -->
      <div class="top">
        <i class="iconfont icon-arrow-left-bold" @click="$router.back()"></i>
        <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch">
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </div>
    </form>
    <div class="content">
      <div class="record" v-show="!flag">
        <div class="title">
          <div class="left">搜索历史</div>
          <div class="delAll">
            <i class="iconfont icon-ashbin" @click="delAll"></i>
          </div>
        </div>
        <ul class="record_content">
          <li v-for="(item,index) in arr" :key="index" @click="clickSearch(item)">{{item}}</li>
        </ul>
      </div>
      <featureCart v-show="flag" v-for="item in searchData" :key="item.id" :data="item"></featureCart>
      <van-empty v-if="searchData.length == 0 && flag == true" description="暂无数据" />
    </div>
  </div>
</template>

<script>
import { Search, Empty } from "vant";
import featureCart from "@/components/featureCart.vue";
import { getCourseBasis } from "../utils/api/api";
export default {
  name: "search",
  data() {
    return {
      value: "",
      searchData: [],
      flag: false,
      arr: [],
    };
  },
  components: {
    [Search.name]: Search,
    [Empty.name]: Empty,
    featureCart,
  },
  created () {
      this.arr = JSON.parse(localStorage.getItem('arr') || '[]')
  },
  methods: {
    onSearch() {
      getCourseBasis({
        keywords: this.value,
      }).then((res) => {
        this.searchData = res.data.data.list;
      });

      if (this.arr.length != 0) {
        this.arr.unshift(this.value);
        this.arr = Array.from(new Set(this.arr));
        console.log(this.arr);
        if (this.arr.length > 5) {
          this.arr.pop();
        }
      } else {
        this.arr.push( this.value);
      }
    },
    clickSearch(val) {
      this.value = val;
      getCourseBasis({
        keywords: this.value,
      }).then((res) => {
        this.searchData = res.data.data.list;
      });
    },
    delAll() {
      this.arr = [];
    },
  },
  watch: {
    value: function (a, b) {
      if (a == "") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    arr:function(){
        localStorage.setItem('arr',JSON.stringify(this.arr))
    },
    deep:true
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  display: flex;
  .icon-arrow-left-bold {
    width: 10%;
    text-align: center;
    line-height: 54px;
    background-color: #fff;
    font-size: 18px;
  }
  .van-search {
    width: 90%;
  }
}
.content {
  padding: 10px;
  .title {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: bold;
  }
}
.record_content {
  display: flex;
  list-style: none;
  padding-top: 20px;
  li {
    background-color: #fff;
    border-radius: 4px;
    padding: 4px 10px;
    margin-right: 8px;
    font-size: 14px;
  }
}
</style>