<template>
  <div>
    <em>Anonymous</em> donated <Amount :amount="item.amount" />
  </div>
</template>

<script>
import Amount from '../Amount'

export default {
  props: ['item'],
  components: {
    Amount
  }
}
</script>