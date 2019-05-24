<template>
  <section>
    <header>
      <span>{{ text }}</span>
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
      <button>SAVE</button>
      <button @click="$router.go(-1)">BACK</button>
    </span>
  </section>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'

export default {
  props: ['date', 'data'],
  data(){
    return {
      status: { title: true, conts: true, tag: true },
      model: { KEY: null, INDEX: null, CODE: null, TAG: null, DATE: null, TITLE: null, CONTS: null }
    }
  },
  methods: {
    fetchData(){
      this.model = _.merge(this.clone, this.data)
    }
  },
  computed: {
    text(){
      const WEEK = {
        EN: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        KR: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
      }

      let date = moment(this.data ? String(this.data.DATE) : this.date)

      return date.format('YYYY.MM.DD') + ' ' + WEEK.KR[date.days()]
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created(){
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
      position: relative;
      z-index: 1;
      box-sizing: border-box;
      border-bottom: 1px solid #333;
      background-color: #444;
      box-shadow: 0 1px 7px #777;
      text-align: center;

      button {
        padding: 10px;
        border: 0;
        background-color: transparent;
        font-family: 'Malgun Gothic';
        font-weight: 800;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
      }

      span {
        display: inline-block;
        padding: 10px;
        font-family: 'Malgun Gothic';
        font-weight: 800;
        font-size: 12px;
        color: #fff;
      }
    }

    .menu {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;

      button {
        padding: 10px 10px 10px 0;
        border: 0;
        background-color: transparent;
        font-family: 'Malgun Gothic';
        font-weight: 800;
        font-size: 12px;
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
            font-family: 'Malgun Gothic';
            font-weight: 800;
            font-size: 12px;
            cursor: pointer;
          }

          input, textarea {
            flex: 1;
            margin: 0;
            padding: 10px;
            border: 0;
            background-color: transparent;
            font-family: 'Malgun Gothic';
            font-size: 12px;
            outline: none;
          }
        }
      }
    }
  }
</style>