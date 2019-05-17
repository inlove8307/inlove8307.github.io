<template>
  <section>
    <header>
      <button>PREV</button>
      <span>2019.05</span>
      <button>NEXT</button>
    </header>
    <article>
      <ol>
        <date-item
          v-for="date in dates"
          v-bind:date="date"
          v-bind:key="date.key"
        ></date-item>
      </ol>
    </article>
  </section>
</template>

<script>
import DateItem from '../components/DateItem'

export default {
  data(){
    return {
      dates: [
        { date: '2019.05.01 수요일', key: 0 },
        { date: '2019.05.02 목요일', key: 1 },
        { date: '2019.05.03 금요일', key: 2 },
        { date: '2019.05.04 토요일', key: 3 },
        { date: '2019.05.05 일요일', key: 4 },
        { date: '2019.05.06 월요일', key: 5 },
        { date: '2019.05.07 화요일', key: 6 },
        { date: '2019.05.08 수요일', key: 7 },
        { date: '2019.05.09 목요일', key: 8 },
        { date: '2019.05.10 금요일', key: 9 },
        { date: '2019.05.11 토요일', key: 10 },
        { date: '2019.05.12 일요일', key: 11 },
        { date: '2019.05.13 월요일', key: 12 },
        { date: '2019.05.14 화요일', key: 13 },
        { date: '2019.05.15 수요일', key: 14 },
        { date: '2019.05.16 목요일', key: 15 },
        { date: '2019.05.17 금요일', key: 16 },
        { date: '2019.05.18 토요일', key: 17 },
        { date: '2019.05.19 일요일', key: 18 },
        { date: '2019.05.20 월요일', key: 19 },
        { date: '2019.05.21 화요일', key: 20 },
        { date: '2019.05.22 수요일', key: 21 },
        { date: '2019.05.23 목요일', key: 22 },
        { date: '2019.05.24 금요일', key: 23 },
        { date: '2019.05.25 토요일', key: 24 },
        { date: '2019.05.26 일요일', key: 25 },
        { date: '2019.05.27 월요일', key: 26 },
        { date: '2019.05.28 화요일', key: 27 },
        { date: '2019.05.29 수요일', key: 28 },
        { date: '2019.05.30 목요일', key: 29 },
        { date: '2019.05.31 금요일', key: 30 }
      ]
    }
  },
  components: {
    DateItem
  },
  created(){}
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
        font-family: 'Dotum';
        font-weight: 800;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
      }

      span {
        display: inline-block;
        padding: 10px;
        font-family: 'Dotum';
        font-weight: 800;
        font-size: 12px;
        color: #fff;
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