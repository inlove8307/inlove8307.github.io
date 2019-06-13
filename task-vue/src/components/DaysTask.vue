<template>
  <li>
    <div>
      <button @click="show = !show">{{ data.TITLE }}</button>
      <span class="menu">
        <button v-show="show" @click="write"><i class="material-icons">edit</i></button>
        <button v-show="show" @click="setAlert"><i class="material-icons">clear</i></button>
      </span>
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
        message: message,
        button: {
          confirm: true,
          cancle: true,
          close: false
        }
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

    & > button {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 0 10px;
      height: 38px;
      border: 0;
      background-color: transparent;
      font-family: 'Noto Sans KR', 'Malgun Gothic';
      font-size: 12px;
      cursor: pointer;

      &:hover {
        background-color: #ffc;
      }
    }

    .menu {
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        padding: 0;
        width: 38px;
        height: 38px;
        border: 0;
        border-left: 1px solid #ccc;
        background-color: transparent;
        vertical-align: top;
        cursor: pointer;

        &:hover {
          background-color: #ffc;
        }
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