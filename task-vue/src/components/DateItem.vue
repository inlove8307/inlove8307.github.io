<template>
  <li>
    <button v-bind:class="{ weekend: weekend }">{{ text }}</button>
    <ul>
      <task-item
        v-for="item in data"
        v-bind:data="item"
        v-bind:key="item.KEY"
      ></task-item>
    </ul>
  </li>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import TaskItem from '../components/TaskItem'

export default {
  name: 'DateItem',
  props: ['date', 'data'],
  data(){
    return {
      store: null
    }
  },
  components: {
    TaskItem
  },
  computed: {
    text(){
      const WEEK = {
        EN: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        KR: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
      };

      return moment(this.date).format('YYYY.MM.DD') + ' ' + WEEK.KR[this.week];
    },
    week(){
      return moment(this.date).days();
    },
    weekend(){
      return _.indexOf([0, 6], this.week) < 0 ? false : true;
    }
  },
  created(){}
}
</script>

<style lang="scss" scoped>
  ol {
    & > li {
      overflow: hidden;
      display: flex;
      flex-direction: row;
      margin: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 1px 1px 5px #ddd;
      background-color: #fff;

      & > button {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 10px;
        border: 0;
        border-right: 1px solid #ccc;
        background-color: transparent;
        font-family: 'Malgun Gothic';
        font-weight: 800;
        font-size: 12px;
        cursor: pointer;

        &:hover {
          background-color: #ffc;
        }

        &.weekend {
          color: #f00;
        }
      }

      ul {
        flex: 1;
        margin: 0;
        padding: 0;
        list-style: none;
      }
    }
  }
</style>