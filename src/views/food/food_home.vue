<template>
  <div class="food_home">
    <!-- 菜单导航 -->
    <van-swipe class="tab" indicator-color="#1989fa">
      <van-swipe-item class="tab_marp" v-for="(item,index1) in foodTab" :key="index1">
        <router-link
          class="tab_marp_item"
          :to="{name: 'food_cate',query:{geohash,title:item2.title}}"
          v-for="(item2,index2) in item"
          :key="index2"
        >
          <img :src="imgBaseUrl + item2.image_url" alt />
          <div class="iten_name">{{item2.title}}</div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
    <!-- 商铺 -->
    <div class="shops">
      <!-- 附近商家 -->
      <div class="nearby_shops">
        <van-icon name="shop-collect-o" />
        <span>附近商家</span>
      </div>
      <!-- 商铺列表 -->
      <shopList></shopList>
    </div>
  </div>
</template>

<script>
import { getFoodCataList } from "@/api/food_api.js";
import shopList from "@/components/shop_list.vue";
export default {
  data() {
    return {
      geohash: "", //经纬度
      foodTab: [], //分类导航
      imgBaseUrl: "https://fuss10.elemecdn.com" //导航图片域名地址
    };
  },

  created() {
    this.geohash = this.$route.query.geohash;
    console.log(this.geohash);
  },
  mounted() {
    this.getfoodTab();
  },
  methods: {
    // 获取外卖分类导航
    async getfoodTab() {
      const res = await getFoodCataList();
      console.log(res);
      let foodCla = res.data;
      //每组显示8个
      let num = 8;
      // 将一维数组转换成多维数组
      let pageNum =
        foodCla.length % num === 0
          ? foodCla.length / num
          : Math.ceil(foodCla.length / num);
      for (let i = 0; i < pageNum; i++) {
        let temp = foodCla.slice(i * num, i * num + num);
        this.foodTab.push(JSON.parse(JSON.stringify(temp)));
      }
      // console.log(this.foodTab);
    }
  },
  components: {
    shopList
  }
};
</script>

<style lang="less" scoped>
.food_home {
  background-color: #f5f5f5;
  padding-top: 50px;
  .tab_marp {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .tab_marp_item {
      width: 25%;
      margin-top: -20px;
      img {
        width: 60%;
        display: block;
        margin: 0 auto;
      }
      .iten_name {
        margin-top: 10px;
        font-size: 12px;
        text-align: center;
      }
    }
  }
  /deep/ .van-swipe__indicator {
    width: 6px;
    height: 6px;
    background-color: #626466;
  }
  .shops {
    height: 100%;
    background-color: #fff;
    border-top: 1px solid rgb(190, 190, 190);
    .nearby_shops {
      height: 24px;
      color: #b1b0b0;
      /deep/ .van-icon {
        font-size: 20px;
        padding: 0 10px;
      }
      span {
        font-size: 13px;
        vertical-align: middle;
      }
    }
  }
  .tab {
    height: 222px;
    background-color: #fff;
    margin-bottom: 10px;
    border-bottom: 1px solid rgb(190, 190, 190);
  }
}
</style>

