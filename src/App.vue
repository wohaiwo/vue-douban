<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <testDemo></testDemo>
  </div>
</template>

<script>
import Hello from './components/Hello'
import testDemo from './components/test-demo'


export default {
  name: 'app',
  components: {
    Hello, testDemo
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
  margin-top: 60px;
}
</style>
