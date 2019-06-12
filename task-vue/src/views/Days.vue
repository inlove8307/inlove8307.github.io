<template>
  <section>
    <header>
      <button @click="setDate(-1)">PREV</button>
      <span>{{ date }}</span>
      <button @click="setDate(1)">NEXT</button>
      <button class="write" @click="write">WRITE</button>
    </header>
    <article>
      <data-filter
        v-bind:code="code">
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
      position: relative;
      z-index: 1;
      box-sizing: border-box;
      border-bottom: 1px solid #333;
      background-color: #444;
      box-shadow: 0 1px 7px #777;
      text-align: center;

      button {
        padding: 10px;
        border: 0;
        background-color: transparent;
        font-family: 'Malgun Gothic';
        font-weight: 800;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
      }

      button.write {
        position: absolute;
        top: 0;
        right: 0;
        border: 0;
      }

      span {
        display: inline-block;
        padding: 10px;
        font-family: 'Malgun Gothic';
        font-weight: 800;
        font-size: 12px;
        color: #fff;
      }
    }

    article {
      overflow-x: hidden;
      overflow-y: auto;
      display: flex;
      flex: 1;
      flex-direction: column;

      fieldset {
        margin: 0 10px;
        padding: 10px 0;
        border: 0;
        border-bottom: 1px solid #ccc;
        background-color: transparent;

        label {
          float:left;
          padding: 5px;
          border-top: 1px solid #333;
          border-bottom: 1px solid #333;
          border-left: 1px solid #333;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
          background-color: #444;
          box-shadow: inset 1px 1px 0 #555;
          font-family: 'Malgun Gothic';
          font-weight: 800;
          font-size: 12px;
          color: #fff;
          cursor: pointer;
        }

        select {
          float:left;
          margin-right:5px;
          padding: 4px;
          border: 1px solid #333;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          background-color: #444;
          box-shadow: inset 1px 1px 0 #555;
          font-family: 'Malgun Gothic';
          font-weight: 800;
          font-size: 12px;
          color: #fff;
          outline: none;
          cursor: pointer;

          option {
            font-family: 'Malgun Gothic';
            font-weight: 800;
            font-size: 12px;
          }
        }

        input {
          float:left;
          margin-right:5px;
          padding: 5px;
          border: 1px solid #333;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          background-color: #444;
          box-shadow: inset 1px 1px 4px #333;
          font-family: 'Malgun Gothic';
          font-weight: 800;
          font-size: 12px;
          color: #fff;
          outline: none;

          &[type=number]::-webkit-inner-spin-button,
          &[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }
        }

        button {
          float:left;
          margin-right:5px;
          padding: 5px;
          border: 1px solid #333;
          border-radius: 3px;
          background-color: #444;
          box-shadow: inset 1px 1px 0 #555;
          font-family: 'Malgun Gothic';
          font-weight: 800;
          font-size: 12px;
          color: #fff;
          cursor: pointer;
        }
      }

      ol {
        margin: 0;
        padding: 0;
        list-style: none;
      }
    }
  }
</style>