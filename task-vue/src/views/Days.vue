<template>
  <section>
    <header>
      <button @click="setDate(-1)"><i class="material-icons">navigate_before</i></button>
      <span>{{ date }}</span>
      <button @click="setDate(1)"><i class="material-icons">navigate_next</i></button>
    </header>
    <article>
      <data-filter
        v-bind:code="code"
        v-bind:disabled="false">
      </data-filter>
      <ol>
        <days-date
          v-for="item in data"
          v-bind:data="item"
          v-bind:key="item.key"
          v-bind:code="code"
        ></days-date>
      </ol>
    </article>
    <span class="menu">
      <button @click="write"><i class="material-icons">edit</i></button>
    </span>
  </section>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import DateInfo from '../mixins/DateInfo'
import DataFilter from '../components/DataFilter'
import DaysDate from '../components/DaysDate'

export default {
  data(){
    return {
      code: 'C01'
    }
  },
  components: {
    DataFilter,
    DaysDate
  },
  mixins: [DateInfo],
  methods: {
    setDate(number){
      this.$store.commit('setDate', number)
    },
    write(){
      this.$router.push({
        name: 'write',
        params: {
          data: {
            CODE: this.code,
            DATE: moment().format('YYYYMMDD')
          }
        }
      })
    }
  },
  computed: {
    date(){
      return this.$store.state.date.join('.')
    },
    data(){
      let result = {}

      _.forIn(this.$store.state.data, (item, key) => {
        result[key] = {
          date: this.getDate(key),
          week: this.getWeek(key),
          weekend: this.getWeekend(key),
          data: item
        }
      })

      return result
    }
  },
  watch: {
    date(value){
      this.$store.dispatch('getRecord', value)
    }
  },
  beforeCreate(){
    this.$store.commit('setData')
  },
  mounted(){
    this.$store.dispatch('getRecord', this.date)
  }
}
</script>

<style lang="scss" scoped>
  section {
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #fff;

    header {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 1;
      box-sizing: border-box;
      height: 40px;
      border-bottom: 1px solid #333;
      background-color: #444;
      box-shadow: 0 1px 7px #777;
      text-align: center;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 100%;
        border: 0;
        background-color: transparent;
        color: #fff;
        cursor: pointer;
      }

      span {
        font-family: 'Noto Sans KR', 'Malgun Gothic';
        font-weight: 400;
        font-size: 12px;
        color: #fff;
      }
    }

    .menu {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      height:40px;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        width: 40px;
        height: 100%;
        border: 0;
        border-left: 1px solid #222;
        background-color: #333;
        box-shadow: inset 1px 0 #444;
        text-decoration: none;
        color: #fff;
        cursor: pointer;
      }
    }

    article {
      overflow-x: hidden;
      overflow-y: auto;
      display: flex;
      flex: 1;
      flex-direction: column;

      ol {
        margin: 0;
        padding: 0;
        list-style: none;
      }
    }
  }
</style>