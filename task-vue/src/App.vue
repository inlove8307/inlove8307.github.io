<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Days</router-link> |
      <router-link to="/week">Week</router-link> |
      <router-link to="/memo">Memo</router-link> |
      <router-link to="/write">Write</router-link> |
      <router-link to="/data">Data</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>