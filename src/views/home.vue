<template>
  <div class="home">
    <div class="header">
    
    </div>
  </div>
</template>

<script>
import  {getCityList} from "@/api/homeApi";
export default {
async mounted() {
  const res = await getCityList('guess') //获取定位城市
  console.log(res);
  },
  
};
</script>

<style lang="less" scoped>
.header{
  // width: 100%;
  // height: 46px;
  // background-color:#3190e8;
}
</style>
