<template>
  <div class="food">
    <Head>
      <!-- 外面首页 -->
      <div class="header" v-if="$route.path === '/food/food_home'">
        <van-icon class="food_back" name="search" @click="$router.push({name: 'search'})" />
        <div class="food_name" @click="$router.push({name: 'home'})">{{address}}</div>
        <div class="login" @click="$router.push({name: 'login'})">登录 / 注册</div>
      </div>
      <!-- 其它页面 -->
      <div class="header" v-else>
        <van-icon class="food_back" name="arrow-left" @click="$router.go(-1)" />
        <div class="food_name" v-if="$route.path === '/food/search'">搜索</div>
        <div class="food_name" v-else-if="$route.path === '/food/order'">订单</div>
        <div class="food_name" v-else>个人中心</div>
        <div class="login"></div>
      </div>
    </Head>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <Tabbar />
  </div>
</template>

<script>
import { getAddress } from "@/api/food_api.js";
import Head from "@/components/head.vue";
import Tabbar from "@/components/tabbar.vue";
export default {
  data() {
    return {
      address: "" //位置
    };
  },
  async mounted() {
    // 获取地址信息
    let geohash = JSON.parse(localStorage.getItem("geohash"));
    const res = await getAddress(geohash);
    this.address = res.data.name;
  },
  components: {
    Head,
    Tabbar
  }
};
</script>
<style lang="less" scoped>
/* 页面切换时候过渡样式 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
/* 打开时候过渡样式 */
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.header {
  display: flex;
  background-color: #3190e8;
  height: 50px;
  padding: 0 10px;
  .food_back {
    flex: 1;
    color: #fff;
    line-height: 50px;
  }
  .food_name {
    flex: 3;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    line-height: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .login {
    flex: 1;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 50px;
  }
}
</style>