<template>
  <div class="city">
    <!-- 头部 -->
    <div class="header">
      <van-icon class="city_back" name="arrow-left" @click="handleBack" />
      <div class="city_name">{{this.$store.state.cityInfo.name}}</div>
      <router-link to="/home" class="header_city">切换城市</router-link>
    </div>
    <!-- 搜索查询 -->
    <div class="city_input">
      <van-cell-group>
        <van-field
          v-model="keyword"
          :clearable="true"
          placeholder="输入学校、商务楼、地址"
          @clear="isShow = false"
          @focus="inputFocus"
        />
      </van-cell-group>
      <!-- 搜索关键字历史记录 -->
      <div class="search_his" v-show="hisShow">
        <div
          class="search_item"
          v-for="(item,index) in searchHistory"
          :key="index"
          @click="searchHistoryItem(index)"
        >{{item}}</div>
        <span @click="delHis">清除历史</span>
        <span style="float:right" @click="hisShow=false">关闭</span>
      </div>
      <!-- 按钮 -->
      <van-button type="info" size="normal" @click="searchShop">查询</van-button>
    </div>
    <!-- 商铺历史记录 -->
    <div v-if="shopList.length === 0 && isShow === false">
      <span class="histoty" v-if="shopHistory.length !== 0">历史记录</span>
      <div class="shop_list">
        <div
          class="shop_list_item"
          v-for="(item,index) in shopHistory"
          :key="index"
          @click="handleFood(item)"
        >
          <div class="shop_name">{{item.name}}</div>
          <div class="shop_address">{{item.address}}</div>
        </div>
      </div>
      <span class="del_all" v-if="shopHistory.length !== 0" @click="delFoodShop">清空所有</span>
    </div>
    <!-- 商铺列表 -->
    <div v-else class="shop_list">
      <div
        class="shop_list_item"
        v-for="(item,index) in shopList"
        :key="index"
        @click="handleFood(item)"
      >
        <div class="shop_name">{{item.name}}</div>
        <div class="shop_address">{{item.address}}</div>
      </div>
    </div>
    <!-- 图片 -->
    <img
      v-show="isShow"
      src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=416722945,3632396234&fm=26&gp=0.jpg"
      alt
    />
  </div>
</template>

<script>
import { getShopList } from "@/api/homeApi.js";
import { Dialog } from "vant";

export default {
  data() {
    return {
      keyword: "", //搜索内容
      shopList: [], //商铺列表
      isShow: false, //图片显示
      searchHistory: [], //搜索关键字历史记录
      shopHistory: [], //商铺历史记录
      hisShow: false, //搜索历史框
    };
  },
  methods: {
    //  返回上一页
    handleBack() {
      this.$router.go(-1);
    },
    //  获取商店列表
    async searchShop() {
      const { id } = this.$route.params;
      const res = await getShopList({
        city_id: id,
        keyword: this.keyword
      });
      this.shopList = res.data;
      if (this.shopList.length === 0) {
        this.isShow = true;
      } else if (res.data.message === "参数错误" || this.keyword === "") {
        Dialog.alert({
          title: "提示！",
          message: "内容不能为空"
        });
        // 此步是为了“参数错误”所造成的bug
        this.shopList = [];
      } else {
        this.isShow = false;
        // 如果请求成功则把关键字存储到历史记录中
        this.searchHistory = JSON.parse(localStorage.getItem("keyword")) || [];
        this.searchHistory.push(this.keyword);
        this.searchHistory = [...new Set(this.searchHistory)];
        localStorage.setItem("keyword", JSON.stringify(this.searchHistory));
      }
    },
    // 输入框聚焦事件
    inputFocus() {
      try {
        if (this.searchHistory.length === 0) {
          this.hisShow = false;
          return;
        } else {
          this.hisShow = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 历史记录赋值于输入框
    searchHistoryItem(index) {
      this.keyword = this.searchHistory[index];
      this.hisShow = false;
    },
    // 清除搜索历史
    delHis() {
      this.searchHistory = [];
      localStorage.setItem("keyword", JSON.stringify(this.searchHistory));
    },
    // 清除商铺历史
    delFoodShop() {
      this.shopHistory = [];
      localStorage.setItem("shopHis", JSON.stringify(this.shopHistory));
    },
    // 跳转外卖首页
    handleFood(item) {
      const { geohash } = item;
      localStorage.setItem('item',JSON.stringify(item))
      this.$router.push({name: 'food_home', query: { geohash } });
      this.shopHistory = JSON.parse(localStorage.getItem("shopHis")) || [];
      // 对象数组去重
      const index = JSON.stringify(this.shopHistory).indexOf(
        JSON.stringify(item.name)
      );
      if (index === -1) {
        this.shopHistory.push(item);
      }
      localStorage.setItem("shopHis", JSON.stringify(this.shopHistory));
    }
  },
  mounted() {
    this.searchHistory = JSON.parse(localStorage.getItem("keyword"));
    this.shopHistory = JSON.parse(localStorage.getItem("shopHis"));
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  }
};
</script>

<style lang="less" scoped>
.city {
  height: 100vh;
  background-color: #f5f5f5;
  .header {
    display: flex;
    background-color: #3190e8;
    height: 50px;
    padding: 0 10px;
    .city_back {
      flex: 1;
      color: #fff;
      line-height: 50px;
    }
    .city_name {
      flex: 5;
      color: #fff;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
      line-height: 50px;
    }
    .header_city {
      color: #fff;
      font-size: 14px;
      line-height: 50px;
    }
  }
  .city_input {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px 20px;
    /deep/ .van-cell {
      border: 1px solid #f5f5f5;
    }
    /deep/ .van-button {
      margin-top: 10px;
      width: 100%;
    }
    .search_his {
      position: absolute;
      z-index: 100;
      width: 295px;
      padding: 10px 20px;
      box-shadow: 5px 5px 5px #888888;
      background-color: rgb(199, 245, 205);
      .search_item {
        border-bottom: 1px solid rgb(168, 164, 164);
        font-size: 14px;
        height: 40px;
        line-height: 40px;
      }
      span {
        font-size: 12px;
        color: #c7c7c0;
        line-height: 40px;
      }
    }
  }
  .shop_list {
    .shop_list_item {
      height: 45px;
      border-top: 1px solid #c7c7c0;
      background-color: #fff;
      padding: 15px 15px;
      .shop_name {
        font-size: 16px;
      }
      .shop_address {
        font-size: 12px;
        color: darkgray;
        margin-top: 15px;
      }
    }
  }
  img {
    margin-top: 10px;
    width: 100%;
    // height: 100%;
  }
  .histoty {
    display: block;
    font-size: 10px;
    line-height: 18px;
    padding: 5px;
  }
  .del_all {
    display: block;
    height: 40px;
    width: 100%;
    font-size: 18px;
    background-color: #fff;
    border-top: 1px solid #c7c7c0;
    text-align: center;
    line-height: 40px;
  }
}
</style>