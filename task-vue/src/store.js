import Vue from 'vue'
import Vuex from 'vuex'
import Dexie from 'dexie'
import router from './router'
import _ from 'lodash'
import moment from 'moment'

Vue.use(Vuex)

let db = new Dexie('frameout')

db.version(1).stores({tasks: "&KEY, INDEX, CODE, TAG, DATE, TITLE, CONTS"})

export default new Vuex.Store({
  state: {
    date: moment().format('YYYY.MM').split('.'),
    data: null,
    tag: null,
    alert: {
      show: false,
      modal: true,
      title: null,
      message: null,
      confirm: false,
      button: {
        confirm: false,
        cancle: false,
        close: false
      }
    }
  },
  mutations: {
    setDate(state, payload){
      let date = moment(state.date.join('.'), 'YYYY.MM')
        , value = Math.abs(payload)

      date = payload > 0
        ? date.add(value, 'M')
        : date.subtract(value, 'M')

      state.date = date.format('YYYY.MM').split('.')
    },
    setData(state, payload){
      state.data = _.groupBy(payload, 'DATE')
    },
    setRecord(state, payload){
      let group = _.groupBy(payload, 'DATE')
        , length = moment(state.date.join('.'), 'YYYY.MM').endOf('month').format('DD') * 1
        , count = 0
        , object = {}

      while(count < length){
        let date = moment(state.date.join('.'), 'YYYY.MM').add(count, 'd')

        object[date.format('YYYYMMDD')] = group[date.format('YYYYMMDD')] || []
        count++
      }

      state.data = object
    },
    setOrigin(state, payload){
      state.data = payload
    },
    setTag(state, payload){
      state.tag = payload
    },
    delete(state, payload){
      let array

      switch(payload.code){
        case 'C01':
          array = state.data[payload.data.DATE]
          break
        case 'C02':
          array = state.data
          break
        default: break
      }

      array.splice(array.indexOf(payload.data), 1)
    },
    setAlert(state, payload){
      this.alert = _.merge(state.alert, payload)
    }
  },
  actions: {
    getRecord({commit}, payload){
      let result = []
      , filter = new RegExp(payload.replace('.', ''))

      db.tasks.where('CODE').equals('C01')
      .filter(data => filter.test(data.DATE))
      .each(data => result.push(data))
      .then(() => commit('setRecord', result))
    },
    getData({commit}, payload){
      let result = []
        , filter = {}

      filter.date = new RegExp(payload.date || '')
      filter.tag = new RegExp(payload.tag || '')
      filter.title = new RegExp(payload.title || '')

      db.tasks.where('CODE').equals(payload.code)
      .filter(data => filter.tag.test(data.TAG))
      .filter(data => filter.date.test(data.DATE))
      .filter(data => filter.title.test(data.TITLE))
      .each(data => result.push(data))
      .then(() => {
        switch(payload.code){
          case 'C01':
            commit('setData', result)
            break
          case 'C02':
            commit('setOrigin', _.reverse(result))
            break
          default: break
        }
      })
    },
    getAllData({commit}, payload){
      let result = []

      db.tasks.bulkPut(payload)
      .then(() => {
        db.tasks
        .each(data => result.push(data))
        .then(() => {
          commit('setOrigin', result)
        })
      })
    },
    getTag({commit}, payload){
      let array = []

      db.tasks.where('CODE').equals(payload)
      .each(data => array.push(data))
      .then(() => commit('setTag', _.keys(_.groupBy(array, 'TAG'))))
    },
    create({commit}, payload){
      db.tasks.add(payload).then(() => router.go(-1))
    },
    update({commit}, payload){
      db.tasks.put(payload).then(() => router.go(-1))
    },
    delete({commit}, payload){
      db.tasks.delete(payload.KEY)
      .then(() => {
        switch(payload.CODE){
          case 'C01':
            commit('delete', { code: 'C01', data: payload })
            break
          case 'C02':
            commit('delete', { code: 'C02', data: payload })
            break
          default: break
        }
      })
    }
  }
})
