<template>
  <!-- 商铺列表 -->
  <div class="shop_list">
    <div
      @click="$router.push({name: 'shop_detail',query:{geohash,id:item.id}})"
      class="shop_item"
      v-for="(item,index) in shopList"
      :key="index"
    >
      <img
        :src="imgBaseUrl1 + item.image_path"
        onerror="javascript:this.src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584111989342&di=b1310e1b675a986da63d2b65705a3df0&imgtype=0&src=http%3A%2F%2Fi-1.shouji56.com%2F2014%2F8%2F28%2Fdd41b9e1-fd62-4f93-b20f-48d476777b45.jpg'"
      />
      <div class="item_title">
        <div class="item_name">
          <div :class="item.is_premium?'premium':''">{{item.name}}</div>
        </div>
        <div class="item_grade">
          <van-rate class="item_grade_xin" v-model="item.rating" readonly allow-half size="13" />
          <span class="grade_content">{{item.rating}}</span>
          <span class="sell_num">月售{{item.recent_order_num}}</span>
        </div>
        <div
          class="item_give"
        >￥{{item.float_minimum_order_amount}}起送 / {{item.piecewise_agent_fee.tips}}</div>
      </div>
      <div class="item_path">
        <div class="tag">
          <span v-for="item2 in item.supports" :key="item2.id">{{item2.icon_name}}</span>
        </div>
        <div class="path_mode_time">
          <span class="path_mode" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
          <span class="just_time">准时宝</span>
        </div>
        <div class="path_length">
          {{item.distance}} /
          <span>{{item.order_lead_time}}</span>
        </div>
      </div>
    </div>
    <!-- 底线 -->
    <!-- <div class="base_line">正在加载更多..</div> -->
    <div v-if="newArr.length === 0" class="base_line">暂无更多数据</div>
  </div>
</template>

<script>
import { getShopList } from "@/api/food_api.js";

export default {
  props: ["ShopCateId", "sortId", "supportIds"],
  data() {
    return {
      geohash: '',
      newArr: [],
      shopList: [], //商铺列表
      imgBaseUrl1: "//elm.cangdu.org/img/", //商铺图片域名地址
      // 商铺参数
      shopQuery: {
        longitude: "", //经度
        latitude: "", //纬度
        offset: 0, //跳过多少条数据
        limit: 10, //请求数据的数量，默认10
        restaurant_category_id: "", //餐馆分类id
        order_by: "", //排序方式id
        delivery_mode: [], //配送方式id
        support_ids: [], //餐馆支持特权的id
        restaurant_category_ids: [] //餐馆分类id
      }
    };
  },

  mounted() {
    this.getShops();
    this.scrollEvent();
  },
  methods: {
    // 获取商铺
    async getShops() {
      const { geohash } = JSON.parse(localStorage.getItem("item"));
      this.geohash = geohash
      // 分割字符串
      let temp = geohash.split(",");
      this.shopQuery.latitude = temp[0];
      this.shopQuery.longitude = temp[1];
      const res = await getShopList(this.shopQuery);
      // console.log(res);
      let oldArr = this.shopList;
      this.newArr = res.data;
      this.shopList = [...oldArr, ...this.newArr];
    },
    // 下滑触底
    scrollEvent() {
      //使用window.onscroll = function(){}this指向出现问题
      //故应该使用箭头函数，因为箭头函数无this，会从上一级找，故会找到vue实例的this
      window.onscroll = () => {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(scrollTop);
        // this.scrollTop = scrollTop
        //变量windowHeight是可视区的高度
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        //滚动条到底部的条件(距底部20px时触发加载)//滚动条到底部的条件
        if (scrollTop + windowHeight >= scrollHeight - 1) {
          this.shopQuery.offset += 10;
          this.getShops();
        }
      };
    },
    // 数据格式化
    formatting() {
      this.shopList.length = 0;
      this.shopQuery.offset = 0;
      this.getShops();
    }
  },
  watch: {
    // 食品分类监听
    ShopCateId() {
      this.shopQuery.restaurant_category_ids[0] = this.ShopCateId;
      this.formatting()
    },
    // 排序监听
    sortId() {
      this.shopQuery.order_by = this.sortId;
      this.formatting()
    },
    // 筛选监听
    supportIds() {
      this.shopQuery.support_ids = this.supportIds[1];
      this.shopQuery.delivery_mode = this.supportIds[0];
      this.formatting()
    }
  }
};
</script>

<style lang='less' scoped>
.shop_list {
  padding-bottom: 50px;
  .shop_item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(221, 221, 221);
    font-size: 12px;
    padding: 15px 8px;
    img {
      width: 20%;
    }
    .item_title {
      width: 50%;
      padding-left: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .item_name {
        font-size: 14px;
        font-weight: 600;
      }
      .item_grade {
        // margin: 12px 0;
        .item_grade_xin {
        }
        .grade_content {
          margin-left: 5px;
          color: #ffd930;
        }
        .sell_num {
          margin-left: 10px;
          color: #b1b0b0;
        }
      }
      .item_give {
        color: #b1b0b0;
      }
    }
    .item_path {
      width: 30%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // padding:1px 0;
      .tag {
        padding-left: 50px;
        span {
          color: #b1b0b0;
          border-radius: 3px;
          border: 1px solid #e8e9eb;
        }
      }
      .path_mode_time {
        .path_mode {
          width: 55%;
          padding: 1px;
          color: #f5f5f5;
          border-radius: 3px;
          margin-right: 2px;
          background-color: rgb(0, 140, 255);
        }
        .just_time {
          color: rgb(0, 140, 255);
          border-radius: 3px;
          border: 1px solid rgb(0, 140, 255);
        }
      }

      .path_length {
        // font-size: 5px;
        color: #b1b0b0;
        span {
          color: rgb(0, 140, 255);
        }
      }
    }
  }
  .base_line {
    font-size: 14px;
    color: #b1b0b0;
    padding: 15px;
    text-align: center;
  }
}
.premium::before {
  content: "品牌";
  display: inline-block;
  font-size: 12px;
  line-height: 16px;
  color: #333;
  background-color: #ffd930;
  padding: 2.5px;
  border-radius: 0.1rem;
  margin-right: 0.2rem;
}
</style>