import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// import _ from 'lodash'
// import moment from 'moment'
// import dexie from 'dexie'
// import tweenmax from 'gsap/TweenMax'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  // _,
  // moment,
  // dexie,
  // tweenmax,
  render: h => h(App)
}).$mount('#app')
