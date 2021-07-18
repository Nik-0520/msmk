<template>
  <div class="info">
    <van-nav-bar :title="$route.meta.title" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <ul>
        <li>
          <div class="left">头像</div>
          <div class="right" @click="showImg = true">
            <img :src="infoData.avatar" alt />
            <i class="iconfont icon-arrow-right"></i>
          </div>
        </li>
        <li>
          <div class="left">昵称</div>
          <div class="right" @click="toSetInfo('nickname',infoData.nickname)">
            <span>{{infoData.nickname}}</span>
            <i class="iconfont icon-arrow-right"></i>
          </div>
        </li>
        <li>
          <div class="left">手机号</div>
          <div class="right">
            <span>{{infoData.mobile}}</span>
            <i></i>
          </div>
        </li>
        <li>
          <div class="left">性别</div>
          <div class="right" @click="toSetInfo('sex',infoData.sex)">
            <span>{{infoData.sex == 0?'男':'女'}}</span>
            <i class="iconfont icon-arrow-right"></i>
          </div>
        </li>
        <li>
          <div class="left">出生日期</div>
          <div class="right" @click="showTime = true">
            <span>{{infoData.birthday}}</span>
            <i class="iconfont icon-arrow-right"></i>
          </div>
        </li>
        <li>
          <div class="left">所在城市</div>
          <div class="right" @click="show = true">
            <span>{{infoData.province_name + ','}}{{infoData.city_name + ','}}{{infoData.district_name}}</span>
            <i class="iconfont icon-arrow-right"></i>
          </div>
        </li>
      </ul>
    </div>
    <!-- 城市列表三级联动 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-area :area-list="areaList" @change="onChange" @cancel="abolish" @confirm="submitCity" />
    </van-popup>

    <!-- 生日选择日期 -->
    <van-popup v-model="showTime" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" @confirm="submitTime" />
    </van-popup>
    <!-- 更换头像 -->
    <van-popup v-model="showImg" position="bottom" :style="{ height: '23%' }">
      <ul class="showImg">
        <li>
          <van-uploader :after-read="afterRead">
            <span>拍照</span>
          </van-uploader>
        </li>
        <li>从相册选择</li>
        <li @click="showImg = false">取消</li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import { NavBar, Area, Popup, DatetimePicker, Uploader } from "vant";
import { GetInfo, getCaty, editUser, avatar } from "../../utils/api/api";
export default {
  data() {
    return {
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
      infoData: {},
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {},
      },
      userInfo: {
        province_id: 0,
        city_id: 0,
        district_id: 0,
      },
      show: false,
      showTime: false,
      showImg: false,
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Area.name]: Area,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [Uploader.name]: Uploader,
  },
  mounted() {
    console.log(this.userInfo.province_id);
  },
  created() {
    GetInfo().then((res) => {
      this.infoData = res.data.data;
      console.log(res);
      this.userInfo.province_id = res.data.data.province_id;
      this.userInfo.city_id = res.data.data.city_id;
      this.userInfo.district_id = res.data.data.district_id;
      this.$nextTick();
    });
    this.requestCity();
    // 转时间
    let arr = this.fn(new Date());
    arr = arr.split("-").join(",");
    this.currentDate = new Date(arr);
  },
  methods: {
    afterRead({ file }) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      let formdata = new FormData();
      formdata.append("file", file);
      avatar(formdata).then((res) => {
        console.log(res);
        editUser({ avatar: res.data.data.path }).then((res) => {
          GetInfo().then((res) => {
            this.infoData = res.data.data;
            this.showImg = false;
          });
        });
      });
    },
    submitTime(data) {
      editUser({ birthday: this.fn(data) }).then((res) => {
        GetInfo().then((res) => {
          this.infoData = res.data.data;
        });
        this.showTime = false;
      });
    },
    fn(time) {
      let y = new Date(time).getFullYear(); // 当前年份
      let m = new Date(time).getMonth(); // 当前月份
      let d = new Date(time).getDate(); // 当前日期
      return y + "-" + (m + 1) + "-" + d;
    },
    abolish(e) {
      this.show = false;
    },
    submitCity(data) {
      console.log(data);
      editUser({
        province_id: data[0].code,
        city_id: data[1].code,
        district_id: data[2] == undefined ? 900110 : data[2].code,
      }).then((res) => {
        GetInfo().then((res) => {
          this.infoData = res.data.data;
        });
        this.show = false;
      });
    },
    onChange(e, data, index) {
      switch (index) {
        case 0:
          getCaty(data[index].code).then((res) => {
            let obj = {};
            res.data.data.forEach((item) => {
              obj[item.id] = item.area_name;
            });
            this.areaList.city_list = obj;
            getCaty(res.data.data[0].id).then((res1) => {
              let obj = {};
              res1.data.data.forEach((item) => {
                obj[item.id] = item.area_name;
              });
              this.areaList.county_list = obj;
            });
          });
          break;
        case 1:
          getCaty(data[index].code).then((res) => {
            let obj = {};
            res.data.data.forEach((item) => {
              obj[item.id] = item.area_name;
            });
            this.areaList.county_list = obj;
          });
          break;
        case 2:
          break;
      }
    },
    requestCity() {
      getCaty(0).then((res) => {
        let obj = {};
        res.data.data.forEach((item) => {
          obj[item.id] = item.area_name;
        });
        this.areaList.province_list = obj;
        let provinceId = this.userInfo.province_id || res.data.data[0].id;
        console.log(this.userInfo.province_id);
        getCaty(provinceId).then((res1) => {
          console.log(res1);
          obj = {};
          res1.data.data.forEach((item) => {
            obj[item.id] = item.area_name;
          });
          this.areaList.city_list = obj;
          let cityId = this.userInfo.city_id || res1.data.data[0].id;
          console.log(this.userInfo.city_id);
          getCaty(cityId).then((res2) => {
            obj = {};
            res2.data.data.forEach((item) => {
              obj[item.id] = item.area_name;
            });
            this.areaList.county_list = obj;
          });
        });
      });
    },
    onClickLeft() {
      this.$router.back();
    },
    toSetInfo(key, val) {
      console.log(val);
      this.$router.push({
        path: "/my/setInfo",
        query: {
          tag: key,
          value: val,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 0 30px;
  margin: 20px 0;
  background-color: #fff;
  ul {
    width: 100%;
    li {
      list-style: none;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 51px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: rgb(141, 141, 141);
        i {
          margin-left: 12px;
          font-size: 20px;
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
    }
  }
}
.showImg {
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  height: 100%;
  li {
    width: 100%;
    height: 33.3%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    border-bottom: 1px solid #eee;
  }
}
</style>