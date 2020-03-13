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
    <van-dropdown-menu class="cate_filt" :close-on-click-outside="false">
      <!-- 分类 -->
      <van-dropdown-item
        :title="cateTitle"
        ref="cates"
        @open="cateTitle = '分类'"
        @close="cateTitle=rightCurrentIndex !== null?rightCateList[rightCurrentIndex].name:title"
      >
        <div class="shop_cates">
          <scroller width="50%">
            <div class="shop_cates_left">
              <div
                class="shop_cates_item"
                :class="[currentIndex === index?'active':'']"
                v-for="(item,index) in cateList"
                :key="index"
                @click="handleCateItem(index)"
              >
                <img :src="getImgPath(item.image_url)" alt />
                <div class="cates_name">{{item.name}}</div>
                <div class="count_num">{{item.count}}</div>
              </div>
            </div>
          </scroller>
          <scroller style="left: 50%">
            <div class="shop_cates_right">
              <div
                ref="items"
                class="shop_cates_item"
                :class="[rightCurrentIndex == index?'active2':'']"
                v-for="(item,index) in rightCateList"
                :key="index"
                @click="handleRightCate(item,index)"
              >
                <div class="item_name">{{item.name}}</div>
                <div class="item_count">{{item.count}}</div>
              </div>
            </div>
          </scroller>
        </div>
      </van-dropdown-item>
      <!-- 排序 -->
      <van-dropdown-item v-model="value" title="排序" :options="option" @change="sortId = value" />
      <!-- 筛选 -->
      <van-dropdown-item title="筛选" ref="item">
        <div class="mode_way">配送方式</div>
        <div
          class="mode_way_item"
          v-for="item in modeWay"
          :key="item.id"
          :class="[item.__v?'active3':'']"
          @click="sortWay(item)"
        >
          <van-icon class="way_item_icon" name="logistics" size="15" />
          <div class="way_item_name">{{item.text}}</div>
        </div>
        <div class="mode_way">商家属性（可以多选）</div>
        <div class="mode_way_warp">
          <div
            class="mode_way_item"
            :class="[item.__v?'active3':'']"
            v-for="item in shopsProps"
            :key="item.id"
            @click="sortWay(item)"
          >
            <div
              class="way_item_tag"
              :style="{color: '#' + item.icon_color, borderColor: '#' + item.icon_color}"
            >{{item.icon_name}}</div>
            <div class="way_item_name">{{item.name}}</div>
          </div>
        </div>
        <div class="confirm">
          <van-button round type="default" @click="reset">重置</van-button>
          <van-button round type="primary" @click="handleConfirm">
            确定
            <span v-if="optionNum">({{optionNum}})</span>
          </van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 筛选内容 -->

    <!-- 商铺列表 -->
    <shopList class="shop_list" :ShopCateId="ShopCateId" :sortId="sortId" :supportIds="supportIds"></shopList>
  </div>
</template>

<script>
import Head from "@/components/head.vue";
import shopList from "@/components/shop_list.vue";
import { getShopCate, getModeWay, shopsPropList } from "@/api/food_api";
export default {
  data() {
    return {
      optionNum: null, //筛选的个数
      modeWayId: [], //配送id
      supportIds: [], //传给子组件的商铺属性id
      sortId: "", //传给子组件的排序id
      ShopCateId: "", //传给子组件的分类id
      objIndex: {}, //点击后的左右侧索引
      modeWay: [], //配送方式
      shopsProps: [], //商品属性
      value: null, //排序选择索引
      currentIndex: 0, //左侧分类当前索引
      rightCurrentIndex: null, //右侧侧分类当前索引
      cateList: [], //分类列表
      rightCateList: [], //右侧分类
      cateTitle: "", //分类标题
      title: "", //标题
      // 排序内容
      option: [
        { text: "智能排序", value: 4, icon: "exchange" },
        { text: "距离最近", value: 5, icon: "location-o" },
        { text: "销量最高", value: 6, icon: "fire-o" },
        { text: "起送价最低", value: 1, icon: "gold-coin-o" },
        { text: "配送速度最快", value: 2, icon: "underway-o" },
        { text: "评分最高", value: 3, icon: "star-o" }
      ]
    };
  },

  created() {
    this.getData();
  },
  methods: {
    // 点击左侧分类时触发
    handleCateItem(index) {
      this.currentIndex = index;
      this.rightCateList = this.cateList[index].sub_categories;
      this.rightCurrentIndex = this.currentIndex !== this.objIndex.left ? null : this.objIndex.right;
    },
    // 点击右侧分类触发
    handleRightCate(item, index) {
      this.rightCurrentIndex = index;
      this.cateTitle = this.title = item.name;
      this.ShopCateId = item.id;
      this.$refs.cates.toggle(false);
      this.objIndex.left = this.currentIndex;
      this.objIndex.right = this.rightCurrentIndex;
    },
    // 点击配送筛选
    sortWay(item) {
      item.__v = !item.__v;
      item.__v ? this.optionNum++ : this.optionNum--;
    },
    // 点击重置按钮触发
    reset() {
      this.shopsProps.forEach(v => {
        v.__v = 0;
      });
      this.modeWay[0].__v = 0;
      this.optionNum = null;
    },
    // 点击确定按钮触发
    handleConfirm() {
      let supportIds = this.disArr(this.shopsProps, this.supportIds);
      let modeIds = this.disArr(this.modeWay, this.modeWayId);
      this.supportIds = [modeIds, supportIds];
      this.$refs.item.toggle(false);
    },
    // 获取所有分类数据
    async getData() {
      const { title, geohash } = this.$route.query;
      this.cateTitle = this.title = title;
      const res = await getShopCate();
      // console.log(res);
      this.cateList = res.data;
      this.rightCateList = this.cateList[0].sub_categories;
      const res2 = await getModeWay(geohash);
      this.modeWay = res2.data;
      const res3 = await shopsPropList(geohash);
      // console.log(res3);
      this.shopsProps = await res3.data;
    },
    // 图片加工
    getImgPath(path) {
      let suffix;
      if (!path) {
        return "//elm.cangdu.org/img/default.jpg";
      }
      if (path.indexOf("jpeg") !== -1) {
        suffix = ".jpeg";
      } else {
        suffix = ".png";
      }
      let url = "/" + path.substr(0, 1) + "/" + path.substr(1, 2) + "/" + path.substr(3) + suffix;
      return "https://fuss10.elemecdn.com" + url;
    },
    //处理数组
    disArr(a, b) {
      b.length = 0;
      a.forEach(v => {
        if (v.__v) {
          b.push(v.id);
          [...new Set(b)];
        }
      });
      return b;
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
    .shop_cates {
      display: flex;
      height: 375px;
      // overflow: hidden;
      .shop_cates_left {
        flex: 1;
        background-color: #f1f1f1;
        .shop_cates_item {
          img {
            width: 10%;
          }
          .cates_name {
            color: #797979;
            margin-left: 10px;
            line-height: 20px;
          }
        }
      }
      .shop_cates_right {
        .shop_cates_item {
          // color: red;
        }
        // position: relative;
        flex: 1;
        .item_name {
          // flex:1;
          // color: #797979;
          // margin-left: 10px;
          line-height: 22px;
        }
        .item_count {
          position: absolute;
          margin-left: 135px;
        }
      }
    }
    .mode_way {
      padding: 15px;
      font-size: 12px;
    }
    .mode_way_warp {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    .confirm {
      padding: 5px 10px;
      background-color: #f1f1f1;
    }
    .mode_way_item {
      display: flex;
      width: 90px;
      height: 25px;
      border: 1px solid rgb(168, 163, 163);
      margin-left: 15px;
      margin-bottom: 5px;
      padding: 5px;
      border-radius: 5%;

      .way_item_tag {
        height: 16px;
        width: 16px;
        margin-top: 5px;
        font-size: 12px;
        text-align: center;
        line-height: 15px;
        border: 1px solid;
      }
      .way_item_name {
        margin-left: 5px;
        font-size: 12px;
        line-height: 25px;
        color: rgb(158, 158, 158);
      }
      .way_item_icon {
        line-height: 25px;
        color: deepskyblue;
      }
    }
  }
  .shop_list {
    padding-top: 100px;
  }
  .active {
    background-color: #fff;
  }
  .active:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: auto;
    right: auto;
    height: 22px;
    width: 3px;
    background-color: rgb(91, 158, 247);
  }
  .count_num,
  .item_count {
    width: 30px;
    font-size: 10px;
    text-align: center;
    margin-left: 10px;
    color: #797979;
    background-color: #fff;
    margin-left: 60px;
    box-sizing: border-box;
    border: 1px solid #afafaf;
    border-radius: 50%;
  }
  .shop_cates_item {
    display: flex;
    font-size: 12px;
    padding: 10px;
    line-height: 20px;
  }
  /deep/.van-button {
    margin-left: 5px;
    width: 170px;
  }
  .active2 {
    color: rgb(69, 126, 231);
    .item_count {
      color: #fff;
      border-color: rgb(69, 126, 231);
      background-color: rgb(69, 126, 231);
    }
  }
  .active3 {
    background-color: rgb(172, 201, 255);
  }
}
</style>