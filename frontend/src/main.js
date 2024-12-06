import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import * as util from './util/function'
import axios from 'axios'
import { sync } from 'vuex-router-sync'
import './plugins'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$function = util
Vue.prototype.$axios = axios

sync(store, router)


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
