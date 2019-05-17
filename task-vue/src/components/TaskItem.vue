<template>
  <li>
    <button @click="show = !show">{{ task.title }}</button>
    <button>MODIFY</button>
    <button>DELETE</button>
    <pre v-show="show">{{ task.text }}</pre>
  </li>
</template>

<script>
export default {
  name: 'TaskItem',
  props: ['task'],
  data(){
    return {
      show: false
    }
  },
  created(){}
}
</script>

<style lang="scss" scoped>
  li {
    border-bottom: 1px solid #dfdfdf;
    text-align: right;

    button {
      padding: 5px;
      border: 0;
      background-color: transparent;
      vertical-align: top;
      cursor: pointer;
    }

    button:first-child {
      float: left;
      font-family: inherit;
      font-size: 14px;
    }

    pre {
      margin: 0;
      padding: 5px;
      border-top: 1px solid #dfdfdf;
      background-color:#fff;
      box-shadow: inset 1px 1px 5px #dfdfdf;
      font-family: inherit;
      font-size: 14px;
      text-align: left;
    }
  }

  li:last-child {
    border-bottom: 0;
  }
</style>