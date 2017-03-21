<template>
  <div id="app">
    <v-header></v-header>
    <testDemo></testDemo>
  </div>
</template>

<script>
import vHeader from './components/header'
import testDemo from './components/test-demo'

export default {
  components: {
    testDemo, vHeader
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
