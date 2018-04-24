<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import './css/bootstrap-customization.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  @import 'bootstrap-vue/dist/bootstrap-vue.css';
</style>
<style>
#app {
}
</style>
