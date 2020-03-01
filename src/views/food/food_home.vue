<template>
  <div class="food_home">
    <!-- <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
    </van-swipe> -->
  </div>
</template>

<script>
import { getFoodCataList } from "@/api/food_api.js";
export default {
  async mounted() {
    // // 获取地址信息
    // const { geohash } = this.$route.query;
    // const res = await getAddress(geohash);
    // // console.log(res);
    const res2 = await getFoodCataList();
    console.log(res2);
  }
};
</script>

<style>
</style>

