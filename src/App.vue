<template>
  <div id="app">
    <transition name="fade" mode="out-in">
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="less">
/* 页面切换时候过渡样式 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
 }
 /* 打开时候过渡样式 */
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
