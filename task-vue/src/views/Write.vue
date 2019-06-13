<template>
  <section>
    <header>
      <label for="EDIT_DATE" v-show="!edit" @click="edit = true">{{ date }}</label>
      <input type="number" id="EDIT_DATE" v-show="edit" v-model="model.DATE" @keyup.enter="edit = false" placeholder="Date(Only Number)">
    </header>
    <article>
      <ul>
        <li>
          <label for="TITLE">제목</label>
          <input type="text" id="TITLE" placeholder="제목을 입력하세요." v-model="model.TITLE">
        </li>
        <li>
          <label for="CONTS">내용</label>
          <textarea id="CONTS" placeholder="내용을 입력하세요." v-model="model.CONTS"></textarea>
        </li>
        <li>
          <label for="TAG">구분</label>
          <input type="text" id="TAG" placeholder="구분을 입력하세요." v-model="model.TAG">
        </li>
      </ul>
    </article>
    <span class="menu">
      <button @click="setData"><i class="material-icons">archive</i></button>
      <button @click="$router.go(-1)"><i class="material-icons">clear</i></button>
    </span>
  </section>
</template>

<script>
import _ from 'lodash'
import DateInfo from '../mixins/DateInfo'

export default {
  props: ['data'],
  mixins: [DateInfo],
  data(){
    return {
      edit: false,
      model: {
        KEY: null,
        INDEX: null,
        CODE: null,
        TAG: null,
        DATE: null,
        TITLE: null,
        CONTS: null
      }
    }
  },
  methods: {
    setData(){
      if(this.model.KEY){
        this.$store.dispatch('update', this.model)
      }
      else{
        this.model.KEY = this.model.KEY || new Date().getTime()
        this.$store.dispatch('create', this.model)
      }
    },
    fetchData(){
      this.model = _.merge(this.model, this.data)
    }
  },
  computed: {
    date(){
      return [this.getDate(this.model.DATE), this.getWeek(this.model.DATE)].join(' ')
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  mounted(){
    this.fetchData()
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
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 1;
      box-sizing: border-box;
      height: 40px;
      border-bottom: 1px solid #333;
      background-color: #444;
      box-shadow: 0 1px 7px #777;
      text-align: center;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 100%;
        border: 0;
        background-color: transparent;
        color: #fff;
        cursor: pointer;
      }

      label {
        font-family: 'Noto Sans KR', 'Malgun Gothic';
        font-weight: 400;
        font-size: 12px;
        color: #fff;
        cursor: pointer;

        &+input[type=number] {
          box-sizing: border-box;
          padding: 5px;
          width: 100px;
          border: 1px solid #333;
          border-radius: 3px;
          background-color: #444;
          box-shadow: inset 1px 1px 4px #333;
          text-align: center;
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
    }

    .menu {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      height:40px;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        width: 40px;
        height: 100%;
        border: 0;
        border-left: 1px solid #222;
        background-color: #333;
        box-shadow: inset 1px 0 #444;
        text-decoration: none;
        color: #fff;
        cursor: pointer;
      }
    }

    article {
      overflow-x: hidden;
      overflow-y: auto;
      flex: 1;
      display: flex;
      flex-direction: column;
      width: 100%;
      text-align: center;

      ul {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 10px;
        padding: 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 1px 1px 5px #ddd;
        list-style: none;

        li {
          display: flex;
          flex-direction: column;
          border-top: 1px solid #ccc;

          &:nth-child(1) {
            border-top: 0;
          }

          &:nth-child(2) {
            flex: 1;
          }

          label {
            display: block;
            padding: 10px;
            border-bottom: 1px dashed #ccc;
            text-align: left;
            font-family: 'Noto Sans KR', 'Malgun Gothic';
            font-weight: 400;
            font-size: 12px;
            cursor: pointer;
          }

          input, textarea {
            flex: 1;
            margin: 0;
            padding: 10px;
            border: 0;
            background-color: transparent;
            font-family: 'Noto Sans KR', 'Malgun Gothic';
            font-size: 12px;
            outline: none;
          }
        }
      }
    }
  }
</style>