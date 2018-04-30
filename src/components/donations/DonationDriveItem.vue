<template>
  <div>
    <Amount :amount="item.charge_amount" /> in honor of <DriveLink :drive="item.Drive" />
  </div>
</template>

<script>
import Amount from '../Amount'
import DriveLink from '@/components/drives/DriveLink'
import DonationItem from './DonationItem'

export default {
  extends: DonationItem,
  components: {
    DriveLink
  }
}
</script>