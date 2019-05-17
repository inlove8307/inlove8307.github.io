<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">Days</router-link>
      <router-link to="/week">Week</router-link>
      <router-link to="/memo">Memo</router-link>
      <router-link to="/write">Write</router-link>
      <router-link to="/data">Data</router-link>
    </nav>
    <section>
      <router-view/>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app'
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

  #nav {
    background-color: #444;

    &:after {
      content: '';
      display: block;
      clear: both;
    }

    a {
      overflow: hidden;
      float: left;
      box-sizing: border-box;
      margin: 2px 0 2px 2px;
      padding: 10px;
      width: auto;
      height: 40px;
      border-top: 1px solid #666;
      border-right: 1px solid #333;
      border-bottom: 1px solid #222;
      border-left: 1px solid #555;
      border-radius: 5px;
      font-size: 14px;
      color: #fff;
    }
  }

  section {
    flex: 1;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 10px 2px #dfdfdf;
    background-color: #fff;
  }
}
</style>