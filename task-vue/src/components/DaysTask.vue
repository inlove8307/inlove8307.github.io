<template>
  <li>
    <div>
      <button @click="show = !show">{{ data.TITLE }}</button>
      <button v-show="show" @click="write">EDIT</button>
      <button v-show="show" @click="setAlert">DEL</button>
    </div>
    <pre v-show="show">{{ data.CONTS }}</pre>
  </li>
</template>

<script>
import DateInfo from '../mixins/DateInfo'

export default {
  name: 'DaysTask',
  props: ['code', 'data'],
  mixins: [DateInfo],
  data(){
    return {
      show: false
    }
  },
  computed: {
    alert(){
      return this.$store.state.alert
    }
  },
  watch: {
    'alert.confirm'(value){
      if(value) this.clear()
    }
  },
  methods: {
    write(){
      this.$router.push({ name: 'write', params: { data: this.data } })
    },
    setAlert(){
      let message

      message = [this.getDate(this.data.DATE), this.getWeek(this.data.DATE)].join(' ')
      message = [message, this.data.TITLE, '일정을 삭제합니다'].join('\n')

      this.$store.commit('setAlert', {
        show: true,
        title: '알림',
        message: message
      })
    },
    clear(){
      this.$store.dispatch('delete', this.data)
      this.$store.dispatch('getTag', this.code)
      this.$store.commit('setAlert', { confirm: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  li {
    border-bottom: 1px solid #ccc;
    text-align: right;

    div {
      display: flex;

      button {
        padding: 10px;
        border: 0;
        border-left: 1px solid #ccc;
        background-color: transparent;
        vertical-align: top;
        font-family: 'Noto Sans KR', 'Malgun Gothic';
        font-weight: 400;
        font-size: 12px;
        cursor: pointer;

        &:first-child {
          flex: 1;
          border-left: 0;
          text-align: left;
        }

        &:hover {
          background-color: #ffc;
        }
      }
    }

    pre {
      margin: 0;
      padding: 10px;
      border-top: 1px dashed #ccc;
      background-color:#efefef;
      font-family: 'Noto Sans KR', 'Malgun Gothic';
      font-size: 12px;
      text-align: left;
    }
  }

  li:last-child {
    border-bottom: 0;
  }
</style>