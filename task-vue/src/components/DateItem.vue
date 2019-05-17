<template>
  <li>
    <button>{{ date.date }}</button>
    <ul>
      <task-item
        v-for="task in tasks"
        v-bind:task="task"
        v-bind:key="task.key"
      ></task-item>
    </ul>
  </li>
</template>

<script>
import TaskItem from '../components/TaskItem'

export default {
  name: 'DateItem',
  props: ['date'],
  data(){
    return {
      tasks: [
        { title: 'title0', text: 'text', key: 0 },
        { title: 'title1', text: 'text', key: 1 },
        { title: 'title2', text: 'text', key: 2 },
        { title: 'title3', text: 'text', key: 3 },
        { title: 'title4', text: 'text', key: 4 },
        { title: 'title5', text: 'text', key: 5 },
        { title: 'title6', text: 'text', key: 6 },
        { title: 'title7', text: 'text', key: 7 },
        { title: 'title8', text: 'text', key: 8 },
        { title: 'title9', text: 'text', key: 9 }
      ]
    }
  },
  components: {
    TaskItem
  },
  created(){}
}
</script>

<style lang="scss" scoped>
  ol {
    & > li {
      display: flex;
      flex-direction: row;
      margin: 10px;
      border: 1px solid #dfdfdf;
      border-radius: 5px;
      box-shadow: 2px 2px 10px #efefef;

      & > button {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 5px 5px 0 5px;
        border: 0;
        border-right: 1px solid #dfdfdf;
        background-color: transparent;
        cursor: pointer;
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