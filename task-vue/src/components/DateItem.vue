<template>
  <li>
    <button v-bind:class="{ weekend: data.weekend }" @click="write">{{ [data.date, data.week].join(' ') }}</button>
    <ul>
      <task-item
        v-for="item in data.data"
        v-bind:date="data"
        v-bind:data="item"
        v-bind:key="item.KEY"
      ></task-item>
    </ul>
  </li>
</template>

<script>
import TaskItem from '../components/TaskItem'

export default {
  name: 'DateItem',
  props: ['data'],
  components: {
    TaskItem
  },
  methods: {
    write(){
      this.$router.push({ name: 'write', params: { date: this.data }})
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