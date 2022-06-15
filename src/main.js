import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins'
import store from './store'
import { sync } from 'vuex-router-sync'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$file = 'https://qeoja-api.my.id/'

sync(store, router)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
