import Vue from 'vue'
import Vuex from 'vuex'
import Dexie from 'dexie'
import _ from 'lodash'
import moment from 'moment'

Vue.use(Vuex)

let db = new Dexie('frameout')

db.version(1).stores({
  tasks: "&KEY, INDEX, CODE, TAG, DATE, TITLE, CONTS"
})

db.tasks.bulkPut([
  { KEY: 1558484706196, INDEX: 0, CODE: "C01", TAG: '룰렛', DATE: '20190501', TITLE: "머니즐기기 룰렛TV 아이콘 추가 관련", CONTS: "머니즐기기 룰렛TV 아이콘 추가 관련" },
  { KEY: 1558484706197, INDEX: 1, CODE: "C01", TAG: '출석', DATE: '20190501', TITLE: "제휴사 신규가입 이벤트 팝업 (WEB버전)", CONTS: "제휴사 신규가입 이벤트 팝업 (WEB버전)" },
  { KEY: 1558484706198, INDEX: 0, CODE: "C01", TAG: '신규', DATE: '20190502', TITLE: "말톡 대만결제 제휴배너&랜딩페이지", CONTS: "말톡 대만결제 제휴배너&랜딩페이지" },
  { KEY: 1558484706199, INDEX: 0, CODE: "C01", TAG: '룰렛', DATE: '20190503', TITLE: "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청", CONTS: "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청" },
  { KEY: 1558484706200, INDEX: 1, CODE: "C01", TAG: '출석', DATE: '20190503', TITLE: "머니즐기기 룰렛TV 아이콘 추가 관련", CONTS: "머니즐기기 룰렛TV 아이콘 추가 관련" },
  { KEY: 1558484706201, INDEX: 0, CODE: "C01", TAG: '신규', DATE: '20190506', TITLE: "제휴사 신규가입 이벤트 팝업 (WEB버전)", CONTS: "제휴사 신규가입 이벤트 팝업 (WEB버전)" },
  { KEY: 1558484706202, INDEX: 0, CODE: "C01", TAG: '룰렛', DATE: '20190509', TITLE: "말톡 대만결제 제휴배너&랜딩페이지", CONTS: "말톡 대만결제 제휴배너&랜딩페이지" },
  { KEY: 1558484706203, INDEX: 1, CODE: "C01", TAG: '출석', DATE: '20190509', TITLE: "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청", CONTS: "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청" },
  { KEY: 1558484706204, INDEX: 0, CODE: "C01", TAG: '신규', DATE: '20190510', TITLE: "머니즐기기 룰렛TV 아이콘 추가 관련", CONTS: "머니즐기기 룰렛TV 아이콘 추가 관련" },
  { KEY: 1558484706205, INDEX: 1, CODE: "C01", TAG: '룰렛', DATE: '20190510', TITLE: "제휴사 신규가입 이벤트 팝업 (WEB버전)", CONTS: "제휴사 신규가입 이벤트 팝업 (WEB버전)" },
  { KEY: 1558484706206, INDEX: 0, CODE: "C01", TAG: '출석', DATE: '20190513', TITLE: "말톡 대만결제 제휴배너&랜딩페이지", CONTS: "말톡 대만결제 제휴배너&랜딩페이지" },
  { KEY: 1558484706207, INDEX: 1, CODE: "C01", TAG: '신규', DATE: '20190513', TITLE: "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청", CONTS: "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청" },
  { KEY: 1558484706208, INDEX: 2, CODE: "C01", TAG: '룰렛', DATE: '20190513', TITLE: "머니즐기기 룰렛TV 아이콘 추가 관련", CONTS: "머니즐기기 룰렛TV 아이콘 추가 관련" },
  { KEY: 1558484706209, INDEX: 0, CODE: "C01", TAG: '출석', DATE: '20190514', TITLE: "제휴사 신규가입 이벤트 팝업 (WEB버전)", CONTS: "제휴사 신규가입 이벤트 팝업 (WEB버전)" },
  { KEY: 1558484706210, INDEX: 0, CODE: "C01", TAG: '신규', DATE: '20190515', TITLE: "말톡 대만결제 제휴배너&랜딩페이지", CONTS: "말톡 대만결제 제휴배너&랜딩페이지" },
  { KEY: 1558484706211, INDEX: 0, CODE: "C01", TAG: '룰렛', DATE: '20190516', TITLE: "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청", CONTS: "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청" },
  { KEY: 1558484706212, INDEX: 0, CODE: "C01", TAG: '출석', DATE: '20190517', TITLE: "머니즐기기 룰렛TV 아이콘 추가 관련", CONTS: "머니즐기기 룰렛TV 아이콘 추가 관련" },
  { KEY: 1558484706213, INDEX: 1, CODE: "C01", TAG: '신규', DATE: '20190517', TITLE: "제휴사 신규가입 이벤트 팝업 (WEB버전)", CONTS: "제휴사 신규가입 이벤트 팝업 (WEB버전)" },
  { KEY: 1558484706214, INDEX: 0, CODE: "C01", TAG: '룰렛', DATE: '20190520', TITLE: "말톡 대만결제 제휴배너&랜딩페이지", CONTS: "말톡 대만결제 제휴배너&랜딩페이지" },
  { KEY: 1558484706215, INDEX: 1, CODE: "C01", TAG: '출석', DATE: '20190520', TITLE: "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청", CONTS: "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청" },
  { KEY: 1558484706216, INDEX: 0, CODE: "C01", TAG: '신규', DATE: '20190521', TITLE: "머니즐기기 룰렛TV 아이콘 추가 관련", CONTS: "머니즐기기 룰렛TV 아이콘 추가 관련" },
  { KEY: 1558484706217, INDEX: 0, CODE: "C01", TAG: '룰렛', DATE: '20190522', TITLE: "제휴사 신규가입 이벤트 팝업 (WEB버전)", CONTS: "제휴사 신규가입 이벤트 팝업 (WEB버전)" },
  { KEY: 1558484706218, INDEX: 0, CODE: "C01", TAG: '출석', DATE: '20190523', TITLE: "말톡 대만결제 제휴배너&랜딩페이지", CONTS: "말톡 대만결제 제휴배너&랜딩페이지" },
  { KEY: 1558484706219, INDEX: 1, CODE: "C01", TAG: '신규', DATE: '20190523', TITLE: "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청", CONTS: "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청" },
  { KEY: 1558484706220, INDEX: 0, CODE: "C01", TAG: '룰렛', DATE: '20190524', TITLE: "머니즐기기 룰렛TV 아이콘 추가 관련", CONTS: "머니즐기기 룰렛TV 아이콘 추가 관련" },
  { KEY: 1558484706221, INDEX: 0, CODE: "C01", TAG: '출석', DATE: '20190527', TITLE: "제휴사 신규가입 이벤트 팝업 (WEB버전)", CONTS: "제휴사 신규가입 이벤트 팝업 (WEB버전)" },
  { KEY: 1558484706222, INDEX: 1, CODE: "C01", TAG: '신규', DATE: '20190527', TITLE: "말톡 대만결제 제휴배너&랜딩페이지", CONTS: "말톡 대만결제 제휴배너&랜딩페이지" },
  { KEY: 1558484706223, INDEX: 0, CODE: "C01", TAG: '룰렛', DATE: '20190528', TITLE: "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청", CONTS: "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청" },
  { KEY: 1558484706224, INDEX: 0, CODE: "C01", TAG: '출석', DATE: '20190529', TITLE: "머니즐기기 룰렛TV 아이콘 추가 관련", CONTS: "머니즐기기 룰렛TV 아이콘 추가 관련" },
  { KEY: 1558484706225, INDEX: 0, CODE: "C01", TAG: '신규', DATE: '20190530', TITLE: "제휴사 신규가입 이벤트 팝업 (WEB버전)", CONTS: "제휴사 신규가입 이벤트 팝업 (WEB버전)" },
  { KEY: 1558484706226, INDEX: 0, CODE: "C01", TAG: '수정', DATE: '20190531', TITLE: "말톡 대만결제 제휴배너&랜딩페이지", CONTS: "말톡 대만결제 제휴배너&랜딩페이지" }
])

export default new Vuex.Store({
  state: {
    date: moment().format('YYYY.MM').split('.'),
    data: []
  },
  getters: {
    group: state => {
      let date = moment(state.date).endOf('month').format('YYYY.MM.DD').split('.')
        , index = 7 - moment(state.date).startOf('month').days()
        , weeks = []
        , object = {}
        , result = []

      while(index <= date[2] * 1){
        weeks.push([date[0], date[1], _.padStart(index, 2, '0')].join(''))
        index += 7

        if(index > date[2] * 1) weeks.push(date.join(''))
      }

      _.forIn(state.data, function(value, key){
        object[key] = value

        if(weeks[0] == key){
          result.push(object)
          object = {}
          weeks.shift()
        }
      })

      return result
    }
  },
  mutations: {
    setData(state, payload){
      state.data = _.groupBy(payload, 'DATE')
    },
    setRecord(state, payload){
      let group = _.groupBy(payload, 'DATE')
        , length = moment(state.date.join('.')).endOf('month').format('DD') * 1
        , count = 0
        , object = {}

      while(count < length){
        let date = moment(state.date.join('.')).add(count, 'd')

        object[date.format('YYYYMMDD')] = group[date.format('YYYYMMDD')] || []
        count++
      }

      state.data = object
    },
    setDate(state, payload){
      let date = moment(state.date.join('.'))
        , value = Math.abs(payload)

      date = payload > 0
        ? date.add(value, 'M')
        : date.subtract(value, 'M')

      state.date = date.format('YYYY.MM').split('.')
    }
  },
  actions: {
    getRecord({commit}, payload){
      let result = []
        , filter = new RegExp(payload.replace('.', ''))

      db.tasks
      .where('CODE')
      .equals('C01')
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

      db.tasks
      .where('CODE')
      .equals('C01')
      .filter(data => filter.tag.test(data.TAG))
      .filter(data => filter.date.test(data.DATE))
      .filter(data => filter.title.test(data.TITLE))
      .each(data => result.push(data))
      .then(() => { commit('setData', result) })
    }
  }
})
