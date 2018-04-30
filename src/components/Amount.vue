<template>
  <span class="amount">${{dollars}} {{currency}}</span>
</template>

<script>
export default {
  props: ['amount'],
  data () {
    return {
      currency: 'USD'
    }
  },
  computed: {
    dollars () {
      return Math.round(this.amount / 100).toFixed(2)
    }
  }
}
</script>