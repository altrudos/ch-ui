<template>
  <span><Amount :amount="drive.total_amount" /> from <span v-if="drive.num_donations == 1">one donation</span><span v-else>{{drive.num_donations}} donations</span></span>
</template>

<script>
import Amount from '@/components/Amount'

export default {
  props: ['drive'],
  components: {
    Amount
  }
}
</script>
