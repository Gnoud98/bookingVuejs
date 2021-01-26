import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import moment from "moment";
import  '@/assets/style.scss'
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
Vue.use(Buefy)
Vue.use(moment)
Vue.config.productionTip = false

const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
