<template>
  <div>
    Someone donated <strong><Amount :amount="item.amount" /></strong> <small>{{date}}</small>
  </div>
</template>

<script>
import Amount from '../Amount'

export default{
  props: ['item'],
  components: {
    Amount
  },
  computed: {
    date () {
      return new Date(this.item.createdAt).toDateString()
    }
  }
}
</script>