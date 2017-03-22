<template>
  <div id="app">
    <v-header></v-header>
    <v-search></v-search>
  </div>
</template>

<script>
import vHeader from './components/header'
import vSearch from './components/movieSearch.vue'

export default {
  components: {
   vHeader,  vSearch
  } 
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
