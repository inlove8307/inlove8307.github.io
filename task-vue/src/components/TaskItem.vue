<template>
  <li>
    <div>
      <button @click="show = !show">{{ task.title }}</button>
      <button v-show="show">EDIT</button>
      <button v-show="show">DEL</button>
    </div>
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
    border-bottom: 1px solid #ccc;
    text-align: right;

    div {
      display: flex;

      button {
        padding: 10px;
        border: 0;
        border-left: 1px solid #ccc;
        background-color: transparent;
        vertical-align: top;
        font-family: 'Dotum';
        font-weight: 800;
        font-size: 12px;
        cursor: pointer;

        &:first-child {
          flex: 1;
          border-left: 0;
          text-align: left;
        }

        &:hover {
          background-color: #ffc;
        }
      }
    }

    pre {
      margin: 0;
      padding: 10px;
      border-top: 1px dashed #ccc;
      background-color:#efefef;
      font-family: 'Dotum';
      font-size: 12px;
      text-align: left;
    }
  }

  li:last-child {
    border-bottom: 0;
  }
</style>