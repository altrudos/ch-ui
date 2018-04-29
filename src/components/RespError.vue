<template>
  <div class="alert alert-danger" v-if="message">
    {{message}}
  </div>
</template>

<script>
export default {
  props: ['err'],
  computed: {
    message () {
      if (this.err) {
        return this.err.message || this.err.toString()
      }

      return false
    }
  }
}
</script>
