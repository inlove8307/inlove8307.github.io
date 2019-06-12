<template>
  <li>
    <button v-bind:class="{ weekend: data.weekend }" @click="write">{{ [data.date, data.week].join(' ') }}</button>
    <ul>
      <days-task
        v-for="item in data.data"
        v-bind:key="item.key"
        v-bind:date="data"
        v-bind:data="item"
        v-bind:code="code"
      ></days-task>
    </ul>
  </li>
</template>

<script>
import DaysTask from '../components/DaysTask'

export default {
  name: 'DaysDate',
  props: ['code', 'data'],
  components: {
    DaysTask
  },
  methods: {
    write(){
      this.$router.push({
        name: 'write',
        params: {
          data: {
            CODE: this.code,
            DATE: this.data.date.replace(/\./g, '')
          }
        }
      })
    }
  }
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
        font-family: 'Noto Sans KR', 'Malgun Gothic';
        font-weight: 400;
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