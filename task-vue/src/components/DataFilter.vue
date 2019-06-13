<template>
  <fieldset>
    <label for="FILTER_TAG">구분</label>
    <select id="FILTER_TAG" v-model="filter.tag">
      <option value="">전체</option>
      <option v-for="item in tag" v-bind:key="item.key">{{ item }}</option>
    </select>
    <label for="FILTER_DATE">날짜</label>
    <input type="number" id="FILTER_DATE" v-model="filter.date" @keyup.enter="getData">
    <label for="FILTER_TITLE">제목</label>
    <input type="text" id="FILTER_TITLE" v-model="filter.title" @keyup.enter="getData">
    <button @click="getData"><i class="material-icons">search</i></button>
    <button @click="clear"><i class="material-icons">clear</i></button>
  </fieldset>
</template>

<script>
export default {
  name: 'DataFilter',
  props: ['code'],
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
  watch: {

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
    }
  },
  mounted(){
    this.$store.dispatch('getTag', this.code)
  }
}
</script>

<style lang="scss" scoped>
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
    font-family: 'Noto Sans KR', 'Malgun Gothic';
    font-weight: 400;
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
    margin-right:5px;
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
}
</style>