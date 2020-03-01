<template>
  <div class="head">
    <!-- <div class="header">
      <div class="city_back">
        <slot name="icon"></slot>
    </div>-->
    <!-- <van-icon class="city_back" name="arrow-left" /> -->
    <!-- <div class="city_name">
        <slot name="address"></slot>
      </div>
      <div class="header_city">
        <slot name="login"></slot>
      </div>
    </div>-->
    <!-- <slot name="aa">
      <div class="header">
        <div class="city_back">
          <slot name="icon"></slot>
        </div>

        <slot name="address"></slot>
        <slot name="login"></slot>
      </div>
    </slot> -->
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
// .header {
//   display: flex;
//   background-color: #3190e8;
//   height: 50px;
//   padding: 0 10px;
//   .city_back {
//     flex: 1;
//     color: #fff;
//     line-height: 50px;
//   }
//   .city_name {
//     flex: 5;
//     color: #fff;
//     font-size: 20px;
//     font-weight: 600;
//     text-align: center;
//     line-height: 50px;
//   }
//   .header_city {
//     color: #fff;
//     font-size: 14px;
//     line-height: 50px;
//   }
// }
</style>