import moment from 'moment'

export default {
  name: 'DateInfo',
  methods: {
    getDate(date){
      return moment(date).format('YYYY.MM.DD')
    },
    getWeek(date){
      const WEEK = {
        EN: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        KR: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
      }

      return WEEK.KR[moment(date).days()]
    },
    getWeekend(date){
      return moment(date).days() % 6 ? false : true
    }
  }
}