import Vue from 'vue'
import App from './App.vue'
import '@/assets/style/index.less'
import router from "@/router/router.js"
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import store from '@/store/city.js'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

Vue.use(Vant);
Vue.config.productionTip = false


new Vue({
  router,store,
  render: h => h(App)
}).$mount('#app')
