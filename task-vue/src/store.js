import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    date: moment().format('YYYY.MM')
  },
  mutations: {
    increment(state){
      state.date = moment(state.date).add(1, 'M').format('YYYY.MM')
    },
    decrement(state){
      state.date = moment(state.date).subtract(1, 'M').format('YYYY.MM')
    }
  },
  actions: {

  }
})
