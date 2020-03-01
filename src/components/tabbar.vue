<template>
  <div class="tabbar">
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace :to="{name: 'food_home', query: { geohash } }" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item replace to="/food/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item replace to="/food/order" icon="wap-nav">订单</van-tabbar-item>
      <van-tabbar-item replace to="/food/user" icon="friends">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  // props:{
  //     geohash:{
  //       type:String,
  //     }
  // },
  data() {
    return {
      active: 1, //默认选中第一个
      geohash: ""
    };
  },
  mounted() {
    this.geohash = JSON.parse(localStorage.getItem("geohash"));
  }
};
</script>

<style lang="less" scoped>
</style>