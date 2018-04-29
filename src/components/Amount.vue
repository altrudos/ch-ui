<template>
  <span class="amount">${{dollars}} {{currency}}</span>
</template>

<script>
export default {
  props: ['amount'],
  data () {
    currency: 'USD'
  },
  computed () {
    dollars: {
      return Mathr.round(this.amount / 100).toFixed(2)
    }
  }
}
</script>