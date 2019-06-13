<template>
  <div id="app">
    <div id="nav">
      <button @click="show = !show"><i class="material-icons">apps</i></button>
      <nav v-show="show" @click="show = false">
        <router-link to="/"><i class="material-icons">event_available</i></router-link>
        <router-link to="/memo"><i class="material-icons">list_alt</i></router-link>
        <router-link to="/data"><i class="material-icons">inbox</i></router-link>
      </nav>
    </div>
    <router-view/>
    <alert></alert>
  </div>
</template>

<script>
import Alert from './components/Alert'

export default {
  name: 'app',
  data(){
    return {
      show: false
    }
  },
  components: {
    Alert
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  background-color: #efefef;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Noto Sans KR', 'Malgun Gothic';

  button {
    outline: none;
  }

  #nav {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    height: 39px;

    & > button {
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;
      width: 40px;
      height: 100%;
      border: 0;
      border-right: 1px solid #222;
      background-color: #333;
      color: #fff;
      cursor: pointer;
    }

    nav {
      float: left;
      height: 100%;

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        width: 40px;
        height: 100%;
        border-left: 1px solid #444;
        border-right: 1px solid #222;
        background-color: #333;
        text-decoration: none;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>