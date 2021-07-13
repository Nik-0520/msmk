<template>
  <div class="coures">
    <van-nav-bar :title="$route.meta.title">
      <template #right>
        <van-icon name="search" size="20" color="#000" @click="$router.push('/search')" />
      </template>
    </van-nav-bar>
    <van-dropdown-menu>
      <van-dropdown-item title="分类" ref="item">
        <van-cell center class="btn">
          <template #right-icon>
            <van-button color="#3597FB" type="default" @click="reset" plain>重置</van-button>
            <van-button color="#EB6100" @click="reset">确认</van-button>
          </template>
        </van-cell>
      </van-dropdown-item>
      <van-dropdown-item title="排序" ref="item1">
        <van-cell center>
          <template #right-icon>
            <ul class="sort">
              <li v-for="item in sortData" :key="item.id" :class="item.id == sortCurrentId?'active':''" @click="sort(item.id)">{{item.text}}</li>
            </ul>
          </template>
        </van-cell>
      </van-dropdown-item>
      <van-dropdown-item title="筛选" ref="item2">
        <van-cell center>
          <template #right-icon>
            <ul class="filtrate">
              <li v-for="item in appCourseType" :key="item.id" :class="item.id == filterCurrentId?'activeBgc':''" @click="filterList(item.id)">{{item.name}}</li>
            </ul>
          </template>
        </van-cell>
      </van-dropdown-item>
    </van-dropdown-menu>

    <div class="content">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <featureCart v-for="item in CourseBasisData" :key="item.id" :data="item" @toDetail="toDetail"></featureCart>
      </van-list>
    </div>
  </div>
</template>

<script>
import {
  NavBar,
  Toast,
  Icon,
  Button,
  List,
  Cell,
  DropdownMenu,
  DropdownItem,
} from "vant";
import featureCart from "@/components/featureCart.vue";
import {
  getCourseBasis,
  getCourseClassify,
} from "../utils/api/api";
export default {
  data() {
    return {
      value: 0,
      switch1: false,
      switch2: false,
      CourseBasisData: [],
      sortData: [
        { text: "综合排序", id: 0 },
        { text: "最新", id: 1 },
        { text: "最热", id: 2 },
        { text: "价格从低到高", id: 3 },
        { text: "价格从高到底", id: 4 },
      ],
      sortCurrentId: 0,
      params: {
        limit: 10,
        page: 1,
      },
      loading: false,
      finished: false,
      flag: false,
      appCourseType: [],
      filterCurrentId: 0,
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [List.name]: List,
    [Cell.name]: Cell,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    featureCart,
  },
  mounted() {
    this.basis(); //获取课程详情

    getCourseClassify().then((res) => {
      this.appCourseType = res.data.data.appCourseType;
      this.appCourseType.push({ id: 1, name: "会员", is_show: 1 });
    });
  },
  methods: {
    toDetail(id){
      this.$router.push({
        path:'/course/coursedet',
        query:{
          id
        }
      })
    },
    basis() {
      this.flag = true;
      getCourseBasis({
        page: this.params.page,
        limit: this.params.limit,
      }).then((res) => {
        console.log(res.data.data.list);
        this.CourseBasisData = res.data.data.list.slice(0, 10);
        this.flag = false;
      });
    },
    onLoad() {
      if (!this.flag) {
        this.params.page++;
        getCourseBasis({
          page: this.params.page,
          limit: this.params.limit,
        }).then((res) => {
          this.CourseBasisData = this.CourseBasisData.concat(
            res.data.data.list
          );
          this.loading = false;
          if (
            this.params.page * this.params.limit >=
            res.data.data.list.length
          ) {
            this.finished = true;
          }
        });
      } else {
        this.loading = false;
      }
    },
    reset() {
      this.loading = false;
      this.finished = false;
      this.flag = false;
      this.params.page = 1;
      this.params.limit = 10;
      this.basis();
      this.$refs.item.toggle();
    },
    sort(id) {
      this.sortCurrentId = id;
      this.$refs.item1.toggle();
       getCourseBasis({
        order_by: id,
        page: this.params.page,
      }).then((res) => {
          this.CourseBasisData = res.data.data.list
      });
    },
    filterList(id) {
      this.filterCurrentId = id;
      getCourseBasis({
        course_type: id,
        page: this.params.page,
      }).then((res) => {
          this.CourseBasisData = res.data.data.list
      });

      this.$refs.item2.toggle();
    },
  },
};
</script>

<style lang="scss" scoped>
.coures {
  padding-bottom: 40px;
}
.content {
  padding: 15px;
}
.van-cell {
  padding: 0;
}
.btn {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 30px;
  overflow: hidden;
  color: #323233;
  font-size: 0.373rem;
  line-height: 0.64rem;
  background-color: #fff;
  .van-button {
    width: 140px;
    height: 32px;
  }
}
.sort {
  width: 100%;
  list-style: none;
  li {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
  .active {
    color: #f97622;
  }
}

.filtrate {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 70px;
    height: 33px;
    text-align: center;
    line-height: 33px;
    margin: 10px 11px;
    border-radius: 4px;
  }
  .activeBgc {
    background-color: #ebeefe;
    color: #f97622;
  }
}
</style>