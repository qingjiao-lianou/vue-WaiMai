<template>
  <div class="shop_detail">
    <!-- 标题部分 -->
    <div class="detail_head">
      <div class="detail_info_warp">
        <div class="detail_bg">
          <img :src="imgBaseUrl1+shopInfo.image_path" alt />
        </div>
        <img :src="imgBaseUrl1+shopInfo.image_path" alt />
        <div class="detail_info">
          <div class="detail_name">{{shopInfo.name}}</div>
          <div class="detail_delivery">商家配送 / 分钟送达 / {{shopInfo.piecewise_agent_fee.tips}}</div>
          <div class="detail_notice">公告：{{shopInfo.promotion_info}}</div>
        </div>
      </div>
      <van-icon name="arrow" class="detail_icon" @click="$router.go(-1)" />
      <div v-if="shopInfo.activities.length !== 0" class="detail_event">
        <div class="event_info_wrap">
          <div
            class="event_icon_name"
            :style="{ backgroundColor: '#' + shopInfo.activities[0].icon_color}"
          >{{shopInfo.activities[0].icon_name}}</div>
          <div class="event_info">{{shopInfo.activities[0].description}} (APP专享)</div>
        </div>
        <div class="event_num">{{shopInfo.activities.length}}个活动</div>
        <van-icon name="arrow-down" @click="isShow = true" />
      </div>
      <!-- 弹框 -->
      <van-action-sheet v-model="isShow" :title="shopInfo.name">
        <div class="discounts_wrap">
          <div class="discounts">优惠</div>
          <div class="discounts_item" v-for="(item,index) in shopInfo.activities" :key="index">
            <span class="discounts_item_icon_name">{{item.icon_name}}</span>
            <span class="discounts_item_name">{{item.description}}</span>
          </div>
          <div class="notice">公告</div>
          <div class="notice_content">{{shopInfo.promotion_info}}</div>
        </div>
      </van-action-sheet>
    </div>
    <!-- 导航 -->
    <div class="tap">
      <div class="tap_name" v-for="(item,index) in tap" :key="item">
        <span @click="tapIndex = index" :class="[tapIndex === index?'active':'']">{{item}}</span>
      </div>
    </div>

    <div class="food_list" v-if="tapIndex === 0">
      <!-- 左侧菜单 -->
      <div class="menu-wrapper">
        <ul>
          <li
            @click="menuList(index)"
            :class="[menuIndex === index?'active2':'']"
            v-for="(item,index) in foodList"
            :key="index"
          >
            <span>{{item.name}}</span>
          </li>
          <div class="item_height"></div>
        </ul>
      </div>
      <!-- 右侧餐饮 -->
      <div class="foods-wrapper">
        <ul>
          <div class="foods_info" v-for="(item,index) in foodList" :key="index">
            <span class="foods_title">{{item.name}}</span>
            <span class="foods_title_info">{{item.description}}</span>
            <div class="foods_content" v-for="(item2,index2) in item.foods" :key="index2">
              <div class="img_wary">
                <img
                  :src="imgBaseUrl1 + item2.image_path"
                  onerror="javascript:this.src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585052692654&di=a627dfad2fa0f725ff0955c41390415d&imgtype=0&src=http%3A%2F%2Ffile.saige.com%2Fupload%2F2012%2F2012-07-31%2F2a5160ea-2ea2-4650-a9f3-2c63223e056d.jpg'"
                />
              </div>
              <div class="foods_name">
                <div class="foods_name_title">
                  <div class="foods_shop_name">{{item2.name}}</div>
                  <div
                    :style="{color:'#'+ item2.attributes[0].icon_color}"
                    class="foods_shop"
                    v-if="item2.attributes[0]&&item2.attributes[0].icon_name==='招牌'"
                  >{{item2.attributes[0].icon_name}}</div>
                  <div
                    class="foods_shop2"
                    :style="{backgroundColor:'#'+ item2.attributes[0].icon_color}"
                    v-else-if="item2.attributes[0]&&item2.attributes[0].icon_name==='新'"
                  >{{item2.attributes[0].icon_name}}品</div>
                </div>
                <div class="foods_state">{{item2.description}}</div>
                <div class="foods_sell_wrap">
                  <span class="foods_sell">月售{{item2.month_sales}}份</span>
                  <span class="foods_good">好评率{{item2.satisfy_rate}}%</span>
                </div>
                <div class="foods_any" v-if="item2.activity">
                  <span
                    :style="{borderColor:'#' +item2.activity.icon_color,color:'#'+item2.activity.image_text_color }"
                  >{{item2.activity.image_text}}</span>
                </div>
                <div class="foods_price">￥{{item2.specfoods[0].price}}起</div>
              </div>
            </div>
          </div>
          <div class="item_height"></div>
        </ul>
      </div>
    </div>

    <div v-else-if="tapIndex===1">2</div>
  </div>
</template>

<script>
// import BScroll from 'better-scroll'
import BScroll from '@better-scroll/core'
import { foodDetail, getFoodList } from '@/api/food_api.js'

export default {
  data() {
    return {
      tapIndex: 0,//导航当前索引
      isShow: false,//底部弹窗
      shopInfo: {
        piecewise_agent_fee: {},
        activities: [{}]
      },//商铺详情
      imgBaseUrl1: "//elm.cangdu.org/img/", //商铺图片域名地址
      styleObject: {},//背景图片
      tap: ['商品', '评价'],//导航名称
      foodList: [],//食品列表
      menuIndex: 0,//左侧菜单当前索引
    }
  },
  async mounted() {
    const { id } = this.$route.query
    const res = await foodDetail(id)
    this.shopInfo = res.data
    // console.log(this.shopInfo);
    //  let wrapper = document.querySelector('.menu-wrapper')
    //   new BScroll(wrapper)
    const res2 = await getFoodList(id)
    console.log(res2);
    this.foodList = res2.data
    this.$nextTick(() => {
      new BScroll('.menu-wrapper')
      new BScroll('.foods-wrapper')
    })

  },

  methods: {
    // 点击左侧菜单
    menuList(index) {
      this.menuIndex = index
    },


  }
}
</script>

<style lang="less" scoped>
.shop_detail {
  height: 100%;
  position: absolute;
  overflow: hidden;
  .detail_head {
    position: relative;
    color: #fff;
    padding: 10px;
    .detail_info_warp {
      display: flex;
      .detail_bg {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        img {
          width: 100%;
          filter: blur(20px);
          -webkit-filter: blur(50px);
        }
      }
    }
    img {
      width: 20%;
    }
    .detail_info {
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .detail_name {
        font-size: 20px;
        font-weight: 600;
      }
      .detail_delivery {
        font-size: 12px;
      }
      .detail_notice {
        font-size: 12px;
      }
    }
    .detail_icon {
      position: absolute;
      font-size: 15px;
      top: 45px;
      right: 5px;
    }
    .detail_event {
      padding-top: 15px;
      font-size: 13px;
      display: flex;
      .event_info_wrap {
        flex: 1;
        display: flex;
        .event_icon_name {
          padding: 2px;
          font-size: 10px;
          margin-right: 5px;
          border-radius: 3px;
        }
        .event_info {
        }
      }
      .event_num {
      }
    }
    .discounts_wrap {
      padding: 0 10px 150px 10px;
      .discounts {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .discounts_item {
        font-size: 15px;
        margin-bottom: 10px;
        .discounts_item_icon_name {
          margin-right: 20px;
          display: inline-block;
          color: red;
          font-size: 13px;
          width: 30px;
          height: 15px;
          border: 1px solid rgb(248, 131, 131);
          text-align: center;
          line-height: 15px;
        }
        .discounts_item_name {
        }
      }
      .notice {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
        margin-top: 20px;
      }
      .notice_content {
        font-size: 15px;
      }
    }
  }
  .tap {
    display: flex;
    padding: 15px;
    .tap_name {
      flex: 1;
      font-size: 16px;
      span {
        text-align: center;
        display: block;
        width: 40px;
        margin: 0 auto;
        padding-bottom: 5px;
      }
    }
    .active {
      color: rgb(91, 158, 247);
      border-bottom: 3px solid rgb(91, 158, 247);
    }
  }
  .food_list {
    display: flex;
    overflow: hidden;
    .menu-wrapper {
      width: 20%;
      height: 100vh;
      ul {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        color: rgb(145, 145, 145);
        li {
          height: 50px;
          padding: 6px 8px;
          margin: 9px 0;
          box-sizing: border-box;
          position: relative;
          border-left: 2px solid rgb(255, 255, 255);
        }
        .active2 {
          font-weight: 600;
          border-left: 2px solid red;
        }
      }
    }
    .foods-wrapper {
      width: 80%;
      height: 100vh;
      .foods_info {
      
        .foods_title {
          font-size: 14px;
          font-weight: 700;
        }
        .foods_title_info {
          font-size: 12px;
          color: rgb(196, 196, 196);
          margin-left: 10px;
        }
        .foods_content {
          height: 95px;
          padding: 10px;
          display: flex;
          .img_wary {
            flex: 1;
            padding-right: 10px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .foods_name {
            flex: 2;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .foods_name_title {
              display: flex;
              .foods_shop_name {
                width: 100px;
                flex: 1;
                font-size: 15px;
                font-weight: 900;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .foods_shop {
                font-size: 10px;
                border: 1px solid red;
                padding: 1px;
                border-radius: 10px;
              }
              .foods_shop2 {
                position: absolute;
                font-size: 10px;
                color: #fff;
                width: 25px;
                // left: 85px;
                right: 261px;
                text-align: center;
                padding: 2px;
              }
            }
            .foods_state {
              width: 150px;
              font-size: 13px;
              color: rgb(175, 175, 175);
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .foods_sell_wrap {
              font-size: 13px;
              .foods_sell {
                margin-right: 10px;
              }
              .foods_good {
              }
            }
            .foods_any {
              font-size: 10px;
              span {
                border: 1px solid;
                padding: 1px;
                border-radius: 5px;
              }
            }
            .foods_price {
              color: #ff6803;
              font-size: 15px;
              font-weight: 900;
            }
          }
        }
      }
    }
  }
}

.item_height{
  height: 150px;
}
</style>