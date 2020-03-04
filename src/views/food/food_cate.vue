<template>
  <div class="food_cate">
    <!-- 标题 -->
    <Head>
      <div class="header">
        <van-icon class="food_back" name="arrow-left" @click="$router.go(-1)" />
        <div class="food_name">{{title}}</div>
        <div class="login"></div>
      </div>
    </Head>
    <!-- 筛选栏 -->
    <van-dropdown-menu
      class="cate_filt"
      :close-on-click-overlay="false"
      :close-on-click-outside="false"
    >
      <van-dropdown-item
        v-for="(item,index) in cateTitle"
        :key="index"
        :title="item"
        @open="handleOpen(index)"
        @close="handleClose(index)"
      />
    </van-dropdown-menu>
    <!-- 筛选内容 -->
    <van-tree-select
      class="food_cate_list"
      height="8rem"
      v-show="isFoodCate"
      :items="renderCateList"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
    />
    <!-- 商铺列表 -->
    <shopList class="shop_list"></shopList>
  </div>
</template>

<script>
import Head from "@/components/head.vue";
import shopList from "@/components/shop_list.vue";
import { getShopCate } from "@/api/food_api";
export default {
  data() {
    return {
        activeId: 1,
      activeIndex: 0,
      isFoodCate: false, //商铺分类列表显示
      cateList: [], //分类列表
      renderCateList: [], //要渲染的分类列表
      cateTitle: ["", "排序", "筛选"], //分类标题
      title: "" //标题
    };
  },

  async created() {
    const { title, geohash } = this.$route.query;
    this.title = title;
    this.cateTitle[0] = title;
    const res = await getShopCate();
    console.log(res);
    this.cateList = res.data;
    this.renderCateList = this.cateList.map(v => {
      return (v = {
        text: v.name,
        children: v.sub_categories
      });
    });
    // console.log(this.renderCateList);
    this.renderCateList.map(v => {
      return v.children.map(v => {
        return (v.text = v.name);
      });
    });
  },
  methods: {
    //  点开筛选栏时触发
    handleOpen(index) {
      if (index === 0) {
        this.cateTitle[0] = "分类";
        // 替换原来的title
        this.cateTitle.splice(0, this.cateTitle[0]);
        this.isFoodCate = true;
      }
    },
    //  关闭筛选栏时触发
    handleClose(index) {
      if (index === 0) {
        this.cateTitle[0] = this.$route.query.title;
        this.cateTitle.splice(0, this.cateTitle[0]);
        this.isFoodCate = false;
      }
    }
  },

  components: {
    Head,
    shopList
  }
};
</script>

<style lang="less" scoped>
.food_cate {
  .header {
    width: 100%;
    display: flex;
    background-color: #3190e8;
    height: 50px;
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    .food_back {
      flex: 0.9;
      color: #fff;
      text-align: center;
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
      margin-left: 5px;
    }
    .login {
      flex: 1;
      color: #fff;
      font-size: 14px;
      text-align: center;
      line-height: 50px;
      margin-right: 5px;
    }
  }
  .cate_filt {
    position: fixed;
    top: 50px;
    width: 100%;
    z-index: 99;
  }
  .shop_list {
    padding-top: 100px;
  }
  .food_cate_list {
    position: fixed;
    top: 100px;
    width: 100%;
    // height: 300px;
    z-index: 99;
  }
}
</style>