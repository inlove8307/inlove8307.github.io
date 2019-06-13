<template>
  <section>
    <header>
      <span>MEMO</span>
    </header>
    <article>
      <data-filter
        v-bind:code="code"
        v-bind:disabled="false">
      </data-filter>
      <ul>
        <memo-post
          v-for="post in data"
          v-bind:key="post.key"
          v-bind:data="post"
          v-bind:code="code">
        </memo-post>
      </ul>
    </article>
    <span class="menu">
      <button @click="write"><i class="material-icons">edit</i></button>
    </span>
  </section>
</template>

<script>
import moment from 'moment'
import DataFilter from '../components/DataFilter'
import MemoPost from '../components/MemoPost'

export default {
  data(){
    return {
      code: 'C02'
    }
  },
  components: {
    DataFilter,
    MemoPost
  },
  computed: {
    data(){
      return this.$store.state.data
    }
  },
  methods: {
    write(){
      this.$router.push({
        name: 'write',
        params: {
          data: {
            CODE: this.code,
            DATE: moment().format('YYYYMMDD')
          }
        }
      })
    }
  },
  beforeCreate(){
    this.$store.commit('setData')
  },
  mounted(){
    this.$store.dispatch('getData', { code: this.code })
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
      overflow-x: hidden;
      overflow-y: auto;
      flex: 1;
      display: flex;
      flex-direction: column;

      ul {
        flex: 1;
        margin: 10px;
        padding: 0;
        list-style: none;
      }
    }
  }
</style>