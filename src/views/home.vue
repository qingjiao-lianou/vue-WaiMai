<template>
  <div class="home">
    <!-- 头部 -->
    <div class="header">
      <div class="header_text">外卖demo</div>
      <router-link to="/login" class="header_login">登录 / 注册</router-link>
    </div>
    <!-- 定位城市 -->
    <van-cell-group>
      <van-cell class="location_item" title="当前定位城市：" value="定位不准时，请在列表中选择" />
      <van-cell
        class="location_city"
        :title="locationCity.name"
        is-link
        :to="{name:'city',params:{id:locationCity.id}}"
        @click="handleCityItem(locationCity)"
      />
    </van-cell-group>
    <!-- 热门城市 -->
    <div class="hot_city">
      <div class="hot_city_title">热门城市</div>
      <van-grid clickable :column-num="4">
        <van-grid-item
          v-for="(item,index) in hotCity"
          :key="index"
          class="hot_city_item"
          :text="item.name"
          :to="{name:'city',params:{id:item.id}}"
          @click="handleCityItem(item)"
        />
      </van-grid>
    </div>
    <!-- 所有城市 -->
    <div class="all_city" v-for="(item,key,index) in allCity" :key="index">
      <div class="all_city_title">{{key}}</div>
      <van-grid clickable :column-num="4">
        <van-grid-item
          v-for="(item,index) in item"
          :key="index"
          class="all_city_item"
          :text="item.name"
          :to="{name:'city',params:{id:item.id}}"
          @click="handleCityItem(item)"
        />
      </van-grid>
    </div>
    <!-- ------------ -->
    <!-- <van-index-bar :sticky-offset-top="46">
      <div v-for="(item,key,index) in allCity" :key="index">
        <van-index-anchor :index="key" />
        <van-cell :title="item2.name" v-for="(item2,index2) in item" :key="index2" />
      </div>
    </van-index-bar>-->
  </div>
</template>

<script>
import { getCityList } from "@/api/homeApi";
export default {
  data() {
    return {
      locationCity: {}, //定位城市信息
      hotCity: [], //热门城市
      allCity: {} //所有城市
    };
  },
  async mounted() {
    // 获取定位城市 (接口失效)
    const res = await getCityList("guess");
    // console.log(res);

    this.locationCity = res.data;
    //获取热门城市
    const res2 = await getCityList("hot");
    this.hotCity = res2.data;
    // 获取所有城市
    const res3 = await getCityList("group");
    // console.log(res3);
    this.allCity = res3.data;
  },
  methods: {
    handleCityItem(item) {
      this.$store.commit("setCityInfo", item);
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  // width: 100%;
  // height: 100%;
  background-color: #f5f5f5;
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 46px;
    background-color: #3190e8;
    z-index: 100;
    .header_text {
      position: absolute;
      top: 15px;
      left: 10px;
      font-size: 15px;
      color: #fff;
      font-weight: 600;
    }
    .header_login {
      position: absolute;
      right: 10px;
      font-size: 15px;
      color: #fff;
      top: 15px;
    }
  }
  .location_item {
    padding-top: 53px;
    font-size: 12px;
    border-bottom: 1px solid #efefef;
  }
  .location_city {
    font-size: 18px;
    color: #3190e8;
    border-bottom: 2px solid #e4e4e4;
  }
  .hot_city {
    margin-top: 10px;
    border-bottom: 2px solid #e4e4e4;
    .hot_city_title {
      // width: 100%;
      height: 30px;
      background-color: #fff;
      font-size: 12px;
      color: #666666;
      line-height: 30px;
      padding-left: 17px;
    }
    /deep/ .van-grid-item__text {
      color: #3190e8;
      font-size: 0.4rem;
    }
  }
  .all_city {
    margin-top: 10px;

    .all_city_title {
      // width: 100%;
      height: 30px;
      background-color: #fff;
      font-size: 0.37rem;
      color: #666666;
      line-height: 30px;
      padding-left: 0.45rem;
    }
    /deep/ .van-grid-item__text {
      color: #666666;
      font-size: 0.4rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      word-break: break-all;
    }
  }
}
// /deep/  .van-index-anchor{
//   // padding-top: 45px;
//   // z-index:100
//   top:46px;

// }
</style>
