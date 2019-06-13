<template>
  <fieldset>
    <span class="filter" v-show="!disabled">
      <label for="FILTER_TAG">구분</label>
      <select id="FILTER_TAG" v-model="filter.tag">
        <option value="">전체</option>
        <option v-for="item in tag" v-bind:key="item.key">{{ item }}</option>
      </select>
    </span>
    <span class="filter" v-show="!disabled">
      <label for="FILTER_DATE">날짜</label>
      <input type="number" id="FILTER_DATE" v-model="filter.date" @keyup.enter="getData">
    </span>
    <span class="filter" v-show="!disabled">
      <label for="FILTER_TITLE">제목</label>
      <input type="text" id="FILTER_TITLE" v-model="filter.title" @keyup.enter="getData">
    </span>
    <button @click="getData" v-show="!disabled"><i class="material-icons">search</i></button>
    <button @click="clear" v-show="!disabled"><i class="material-icons">clear</i></button>
    <span class="menu" v-show="code != 'C02'">
      <button @click="setView('days')"><i class="material-icons">view_list</i></button>
      <button @click="setView('week')"><i class="material-icons">view_column</i></button>
    </span>
  </fieldset>
</template>

<script>
export default {
  name: 'DataFilter',
  props: ['code', 'disabled'],
  data(){
    return {
      filter: {
        code : this.code,
        tag: '',
        date: null,
        title: null
      }
    }
  },
  computed: {
    date(){
      return this.$store.state.date.join('.')
    },
    tag(){
      return this.$store.state.tag
    }
  },
  methods: {
    getData(){
      this.$store.dispatch('getData', this.filter)
    },
    clear(){
      this.filter.date = this.filter.title = null
      this.filter.tag = ''

      switch(this.code){
        case 'C01':
          this.$store.dispatch('getRecord', this.date)
          break
        case 'C02':
          this.$store.dispatch('getData', this.filter)
          break
        default: break
      }
    },
    setView(value){
      this.$router.push({name: value})
    }
  },
  mounted(){
    this.$store.dispatch('getTag', this.code)
  }
}
</script>

<style lang="scss" scoped>
fieldset {
  box-sizing: border-box;
  margin: 0 10px;
  padding: 10px 0 0;
  border: 0;
  border-bottom: 1px solid #ccc;
  background-color: transparent;

  &::after {
    content: '';
    display: block;
    clear: both;
  }

  .filter {
    float: left;
    margin: 0 5px 10px 0;

    &::after {
      content: '';
      display: block;
      clear: both;
    }

    label {
      float: left;
      padding: 5px;
      border-top: 1px solid #333;
      border-bottom: 1px solid #333;
      border-left: 1px solid #333;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      background-color: #444;
      box-shadow: inset 1px 1px 0 #555;
      font-family: 'Noto Sans KR', 'Malgun Gothic';
      font-weight: 400;
      font-size: 12px;
      color: #fff;
      cursor: pointer;
    }

    select {
      float:left;
      padding: 4px;
      border: 1px solid #333;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      background-color: #444;
      box-shadow: inset 1px 1px 0 #555;
      font-family: 'Noto Sans KR', 'Malgun Gothic';
      font-weight: 400;
      font-size: 12px;
      color: #fff;
      outline: none;
      cursor: pointer;

      option {
        font-family: 'Noto Sans KR', 'Malgun Gothic';
        font-weight: 400;
        font-size: 12px;
      }
    }

    input {
      float:left;
      padding: 5px;
      border: 1px solid #333;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      background-color: #444;
      box-shadow: inset 1px 1px 4px #333;
      font-family: 'Noto Sans KR', 'Malgun Gothic';
      font-weight: 400;
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
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    float:left;
    box-sizing: border-box;
    margin-right:5px;
    padding: 0;
    width: 30px;
    height: 30px;
    border: 1px solid #333;
    border-radius: 3px;
    background-color: #444;
    box-shadow: inset 1px 1px 0 #555;
    font-family: 'Noto Sans KR', 'Malgun Gothic';
    font-weight: 400;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
  }

  .menu {
    float: right;
    margin-bottom: 10px;

    button {
      margin-right: 0;
      margin-left: 5px;
    }
  }
}
</style>