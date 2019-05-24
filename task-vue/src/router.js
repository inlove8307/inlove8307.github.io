import Vue from 'vue'
import Router from 'vue-router'
import Days from './views/Days.vue'
import Week from './views/Week.vue'
import Memo from './views/Memo.vue'
import Write from './views/Write.vue'
import Data from './views/Data.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'days',
      component: Days
    },
    {
      path: '/week',
      name: 'week',
      component: Week
    },
    {
      path: '/memo',
      name: 'memo',
      component: Memo
    },
    {
      path: '/write',
      name: 'write',
      component: Write,
      props: true
    },
    {
      path: '/data',
      name: 'Data',
      component: Data
    },
  ]
})
