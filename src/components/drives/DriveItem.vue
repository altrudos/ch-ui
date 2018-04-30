<template>
  <div>
    <DriveLink :drive="drive" />
    <div v-if="drive.total_amount > 0">
      <small><AmountRaised :drive="drive" /> since {{date}}</small>
    </div>
  </div>
</template>

<script>
import DriveLink from '@/components/drives/DriveLink'
import AmountRaised from '@/components/drives/AmountRaised'

export default {
  props: ['item'],
  computed: {
    drive () {
      return this.item
    },
    date () {
      return new Date(this.item.createdAt).toDateString()
    }
  },
  components: {
    DriveLink,
    AmountRaised
  }
}
</script>