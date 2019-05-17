<template>
  <article>
    <ol>
      <date-item
        v-for="date in dates"
        v-bind:date="date"
        v-bind:key="date.key"
      ></date-item>
    </ol>
  </article>
</template>

<script>
import DateItem from '../components/DateItem'

export default {
  data(){
    return {
      dates: [
        { date: '2019.05.16', key: 0 },
        { date: '2019.05.17', key: 1 },
        { date: '2019.05.18', key: 2 },
        { date: '2019.05.19', key: 3 },
        { date: '2019.05.20', key: 4 },
        { date: '2019.05.21', key: 5 },
        { date: '2019.05.22', key: 6 },
        { date: '2019.05.23', key: 7 },
        { date: '2019.05.24', key: 8 },
        { date: '2019.05.25', key: 9 }
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
  article {
    ol {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }
</style>