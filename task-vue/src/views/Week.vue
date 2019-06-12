<template>
  <section>
    <header>
      <button @click="setDate(-1)">PREV</button>
      <span>{{ date }}</span>
      <button @click="setDate(1)">NEXT</button>
    </header>
    <article>
      <ol>
        <li
          v-for="week in data"
          v-bind:key="week.key">
          <ol>
            <li
              v-for="date in week"
              v-bind:key="date.key">
              <strong v-bind:class="{ weekend: date.weekend }">{{ date.date + ' ' + date.week }}</strong>
              <ul v-show="date.data.length">
                <li
                  v-for="task in date.data"
                  v-bind:key="task.key">
                  {{ task.TITLE }}
                </li>
              </ul>
            </li>
          </ol>
        </li>
      </ol>
    </article>
  </section>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import DateInfo from '../mixins/DateInfo'

export default {
  mixins: [DateInfo],
  methods: {
    setDate(number){
      this.$store.commit('setDate', number)
    },
    getWeeks(){
      let date = moment(this.date).endOf('month').format('YYYY.MM.DD').split('.')
        , index = 7 - moment(this.date).startOf('month').days()
        , result = []

      while(index <= date[2] * 1){
        result.push([date[0], date[1], _.padStart(index, 2, '0')].join(''))
        index += 7

        if(index > date[2] * 1) result.push(date.join(''))
      }

      return result
    }
  },
  computed: {
    date(){
      return this.$store.state.date.join('.')
    },
    data(){
      let data = this.$store.state.data
        , weeks = this.getWeeks()
        , object = {}
        , result = []

      for(let key in data){
        object[key] = {
          date: this.getDate(key),
          week: this.getWeek(key),
          weekend: this.getWeekend(key),
          data: data[key]
        }

        if(weeks[0] == key){
          result.push(object)
          object = {}
          weeks.shift()
        }
      }

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
      overflow: hidden;
      flex: 1;
      display: flex;
      width: 100%;

      &>ol { /* week */
        flex: 1;
        display: flex;
        margin: 10px;
        padding: 0;
        list-style: none;

        &>li {
          overflow: hidden;
          flex: 1;
          margin: 0 0 0 10px;
          padding: 0;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #fff;
          box-shadow: 1px 1px 5px #ddd;

          &:first-child {
            margin-left: 0;
          }

          &>ol { /* date */
            overflow-x: hidden;
            overflow-y: auto;
            margin: 0;
            padding: 0;
            height: 100%;
            list-style: none;

            &>li {
              margin: 0;
              padding: 0;
              border-bottom: 1px solid #ccc;

              strong {
                display: block;
                padding: 10px;
                font-family: 'Malgun Gothic';
                font-weight: 800;
                font-size: 12px;

                &.weekend{
                  color: #f00;
                }
              }

              ul { /* task */
                margin: 0;
                padding: 0;
                border-top: 1px dashed #ccc;
                background-color: #efefef;
                list-style: none;

                li {
                  margin: 0;
                  padding: 10px;
                  border-top: 1px dashed #ccc;
                  font-family: 'Malgun Gothic';
                  font-size: 12px;

                  &:first-child {
                    border-top: 0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>