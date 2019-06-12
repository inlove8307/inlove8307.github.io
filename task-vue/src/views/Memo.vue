<template>
  <section>
    <header>
      <span>MEMO</span>
      <button class="write" @click="write">WRITE</button>
    </header>
    <article>
      <data-filter
        v-bind:code="code">
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

      button.write {
        position: absolute;
        top: 0;
        right: 0;
        border: 0;
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

    article {
      flex: 1;
      display: flex;
      flex-direction: column;

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
          font-family: 'Malgun Gothic';
          font-weight: 800;
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
          font-family: 'Malgun Gothic';
          font-weight: 800;
          font-size: 12px;
          color: #fff;
          outline: none;
          cursor: pointer;

          option {
            font-family: 'Malgun Gothic';
            font-weight: 800;
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
          font-family: 'Malgun Gothic';
          font-weight: 800;
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
          float:left;
          margin-right:5px;
          padding: 5px;
          border: 1px solid #333;
          border-radius: 3px;
          background-color: #444;
          box-shadow: inset 1px 1px 0 #555;
          font-family: 'Malgun Gothic';
          font-weight: 800;
          font-size: 12px;
          color: #fff;
          cursor: pointer;
        }
      }

      ul {
        flex: 1;
        margin: 10px;
        padding: 0;
        list-style: none;
      }
    }
  }
</style>