import Vue from 'vue'
import App from './App.vue'
import '@/assets/style/index.less'
import router from "@/router/router.js"
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible';

Vue.use(Vant);
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
