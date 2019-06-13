<template>
  <section>
    <header>
      <span>DATA</span>
    </header>
    <article>
      <ul>
        <li>
          <label>데이터(JSON)</label>
          <textarea v-model="json" placeholder="데이터를 입력하세요."></textarea>
        </li>
      </ul>
    </article>
    <span class="menu">
      <button @click="setData"><i class="material-icons">move_to_inbox</i></button>
    </span>
  </section>
</template>

<script>
import _ from 'lodash'

export default {
  data(){
    return {
      json: null
    }
  },
  computed: {
    data(){
      return this.$store.state.data
    }
  },
  watch: {
    data(value){
      this.json = JSON.stringify(value)

      this.$store.commit('setAlert', {
        show: true,
        title: '알림',
        message: '데이터가 저장되었습니다.',
        button: {
          confirm: false,
          cancle: false,
          close: true
        }
      })
    }
  },
  methods: {
    setData(){
      const KEYS = ['KEY', 'INDEX', 'CODE', 'TAG', 'DATE', 'TITLE', 'CONTS']

      let data

      try{
        data = JSON.parse(this.json)

        if(!_.isArray(data) || !data.length) throw data

        for(let index = 0; index < data.length; index++){
          if(!_.isObject(data[index])) throw data

          for(let count = 0; count < KEYS.length; count++){
            if(_.isUndefined(data[index][KEYS[count]])) throw data
          }
        }

        this.$store.dispatch('getAllData', data)
      }
      catch(e){
        this.$store.dispatch('getAllData', [])
      }
    }
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

      span {
        font-family: 'Noto Sans KR', 'Malgun Gothic';
        font-weight: 400;
        font-size: 12px;
        color: #fff;
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
      flex: 1;
      display: flex;

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
          flex: 1;
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 0;

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