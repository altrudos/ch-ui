<template>
  <div class="megan">{{msg}}</div>
</template>

<script>
export default {
  name: 'Megan',
  data () {
    return {
      msg: 'sup girl!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.megan {
  color: pink;
}
</style>
