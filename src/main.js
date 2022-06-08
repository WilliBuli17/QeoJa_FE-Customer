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
// Vue.prototype.$file = 'http://127.0.0.1:8000/'
Vue.prototype.$file = 'https://7ffa-180-249-206-70.ap.ngrok.io/'

sync(store, router)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
