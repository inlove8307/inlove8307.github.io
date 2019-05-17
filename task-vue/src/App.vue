<template>
  <div id="app">
    <div id="nav">
      <button @click="show = !show">MENU</button>
      <nav v-show="show" @click="show = false">
        <router-link to="/">DAYS</router-link>
        <router-link to="/week">WEEK</router-link>
        <router-link to="/memo">MEMO</router-link>
        <router-link to="/write">WRITE</router-link>
        <router-link to="/data">DATA</router-link>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      show: false
    }
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  button {
    outline: none;
  }



  #nav {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;

    & > button {
      float: left;
      padding: 10px;
      width: auto;
      border: 0;
      background-color: #444;
      font-family: 'Dotum';
      font-weight: 800;
      font-size: 12px;
      color: #fff;
      cursor: pointer;
    }

    nav {
      float: left;

      a {
        float: left;
        padding: 10px 10px 10px 0;
        width: auto;
        background-color: #444;
        font-family: 'Dotum';
        font-weight: 800;
        font-size: 12px;
        color: #fff;
      }
    }
  }
}
</style>