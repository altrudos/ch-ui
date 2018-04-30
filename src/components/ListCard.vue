<template>
  <div class="card">
    <div class="card-header">{{title}}</div>
    <div class="card-body">
      <div v-if="data.loading">
        Loading...
      </div>
      <div v-else>
        <div v-if="data.err">
          <ErrorsList v-bind:errors="data.err" />
        </div>
        <div v-else>
          <div v-if="data.result.rows.length">
            <component :is="itemComponent" v-bind:item="item" v-for="(item, index) in data.result.rows" :class="{'mb-2': index != data.result.rows.length - 1}" v-bind:key="index">
            </component>
          </div>
          <div v-else>
            {{emptyMessage}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ErrorsList from './ErrorsList'
import DefaultItem from './DefaultItem'
import DonationItem from './donations/DonationItem'
import DonationDriveItem from './donations/DonationDriveItem'
import DriveItem from './drives/DriveItem'

export default {
  props: ['data', 'title', 'emptyMessage', 'itemComponent'],
  components: {
    ErrorsList,
    DefaultItem,
    DonationItem,
    DriveItem,
    DonationDriveItem
  }
}
</script>
