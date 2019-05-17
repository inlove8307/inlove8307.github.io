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
        { title: '업무명1', text: '내용1', key: 0 },
        { title: '업무명2', text: '내용2', key: 1 },
        // { title: '업무명3', text: '내용3', key: 2 },
        // { title: '업무명1', text: '내용1', key: 3 },
        // { title: '업무명2', text: '내용2', key: 4 },
        // { title: '업무명3', text: '내용3', key: 5 },
        // { title: '업무명1', text: '내용1', key: 6 },
        // { title: '업무명2', text: '내용2', key: 7 },
        // { title: '업무명3', text: '내용3', key: 8 },
        // { title: '업무명1', text: '내용1', key: 9 },
        // { title: '업무명2', text: '내용2', key: 10 },
        // { title: '업무명3', text: '내용3', key: 11 }
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
        font-family: 'Dotum';
        font-weight: 800;
        font-size: 12px;
        cursor: pointer;

        &:hover {
          background-color: #ffc;
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