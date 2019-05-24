<template>
  <section>
    <header>
      <button @click="decrement">PREV</button>
      <span>{{ date }}</span>
      <button @click="increment">NEXT</button>
    </header>
    <article>
      <ol>
        <date-item
          v-for="(item, key) in data"
          v-bind:date="key"
          v-bind:data="item"
          v-bind:key="item.key"
        ></date-item>
      </ol>
    </article>
    <span class="menu">
      <button @click="write">WRITE</button>
    </span>
  </section>
</template>

<script>
import DateItem from '../components/DateItem'

export default {
  components: {
    DateItem
  },
  methods: {
    increment(){
      this.$store.commit('increment')
    },
    decrement(){
      this.$store.commit('decrement')
    },
    write(){
      this.$router.push({ name: 'write' })
    }
  },
  computed: {
    date(){
      return this.$store.state.date
    },
    data(){
      return this.$store.getters.group
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
      width: 100%;
      text-align: center;

      ol {
        margin: 0;
        padding: 0;
        list-style: none;
      }
    }
  }
</style>