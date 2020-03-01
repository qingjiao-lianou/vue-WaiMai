<template>
  <div class="food_home">
    <van-swipe style="height: 222px;" indicator-color='#1989fa'>
      <van-swipe-item class="tab_marp" v-for="(item,index1) in foodTab" :key="index1">
        <router-link class="tab_marp_item" to="#" v-for="(item2,index2) in item" :key="index2">
          <img :src="imgBaseUrl + item2.image_url" alt />
          <div class="iten_name">{{item2.title}}</div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getFoodCataList } from "@/api/food_api.js";
export default {
  data() {
    return {
      foodTab: [], //分类导航
      imgBaseUrl: "https://fuss10.elemecdn.com" //图片域名地址
    };
  },
  mounted() {
    this.getfoodTab();
  },
  methods: {
    // 获取外卖分类导航
    async getfoodTab() {
      const res = await getFoodCataList();
      // console.log(res);
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
      console.log(this.foodTab);
    }
  }
};
</script>

<style lang="less" scoped>
.food_home {
  background-color: #f5f5f5;
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
  /deep/ .van-swipe__indicator{
        width: 6px;
        height: 6px;
        background-color: #626466;;
  }
}
</style>

