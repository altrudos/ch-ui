<template>
<div class="spinner-container" :class="{'d-none': !on}">
  <span class="fas fa-spin fa-sync"></span>
</div>
</template>

<script>
export default {
  props: ['on']
}
</script>

<style scoped>
.spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  text-align: center;
  display: flex;
  z-index: 10;
  align-items: center;
  justify-content: center;
}

.spinner-container .fa-spin {
  text-align: center;
  font-size: 32px;
  color: hotpink;
}
</style>

<style>
.has-spinner {
  position: relative;
}
</style>
