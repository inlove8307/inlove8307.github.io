<template>
  <li>
    <div>
      <button type="button" @click="show = !show">{{ data.TITLE }} <span>{{ date }}</span>
      </button>
      <button type="button" v-show="show" @click="write">EDIT</button>
      <button type="button" v-show="show" @click="clear">DEL</button>
    </div>
    <pre v-show="show">{{ data.CONTS }}</pre>
  </li>
</template>

<script>
import DateInfo from '../mixins/DateInfo'

export default {
  name: 'MemoPost',
  props: ['code', 'data'],
  data(){
    return {
      show: false
    }
  },
  mixins: [DateInfo],
  computed: {
    date(){
      return [this.getDate(this.data.DATE), this.getWeek(this.data.DATE)].join(' ')
    }
  },
  watch: {},
  methods: {
    write(){
      this.$router.push({ name: 'write', params: { data: this.data } })
    },
    clear(){
      this.show = this.show
      this.$store.dispatch('delete', this.data)
      this.$store.dispatch('getTag', this.code)
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  overflow: hidden;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 1px 1px 5px #ddd;

  &:first-child {
    margin-top: 0;
  }

  div {
    display: flex;

    button {
      box-sizing: border-box;
      padding: 10px;
      border: 0;
      border-left: 1px dashed #ccc;
      background-color: transparent;
      text-align: left;
      font-family: 'Malgun Gothic';
      font-weight: 800;
      font-size: 12px;
      cursor: pointer;

      &:first-child {
        flex: 1;
        border-left: 0;
      }

      &:hover {
        background-color: #ffc;
      }

      span {
        font-weight: 400;
        color: #ccc;
      }
    }
  }

  pre {
    box-sizing: border-box;
    margin: 0;
    padding: 10px;
    border-top: 1px dashed #ccc;
    background-color: #efefef;
    font-family: 'Malgun Gothic';
    font-size: 12px;
  }
}
</style>