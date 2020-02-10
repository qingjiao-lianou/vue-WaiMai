<template>
  <div class="city">
    <div class="header">
      <van-icon class="city_back" name="arrow-left" @click="handleBack" />
      <div class="city_name">{{this.$store.state.cityInfo.name}}</div>
      <router-link to="/home" class="header_city">切换城市</router-link>
    </div>
    <div class="city_input">
      <van-cell-group>
        <van-field
          v-model="keyword"
          :clearable="true"
          placeholder="输入学校、商务楼、地址"
          @clear="clearContent"
        />
      </van-cell-group>
      <van-button type="info" size="normal" @click="searchShop">查询</van-button>
    </div>
  </div>
</template>

<script>
import { getShopList } from '@/api/homeApi.js'

export default {
  data() {
    return {
      keyword: "", //搜索内容
      shopList:[], //商铺列表
    };
  },
  methods: {
    //  返回上一页
    handleBack() {
      this.$router.go(-1);
    },
    // 清除内容
    clearContent() {},
    //  获取商店列表
async searchShop(){
  const {id} = this.$route.params
  
  
}
  },
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
  }
}
</style>