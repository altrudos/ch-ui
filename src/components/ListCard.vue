<template>
  <div class="card">
    <div class="card-header">{{title}}</div>
    <div class="card-body">
      <div v-if="data.loading">
        Loading...
      </div>
      <div v-else>
        <div v-if="data.err">
          <RespError v-bind:err="data.err" />
        </div>
        <div v-else>
          <div v-if="data.result.rows.length">
            <component :is="itemComponent" v-bind:item="item" v-for="(item, index) in data.result.rows" v-bind:text="item.id">
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
import RespError from './RespError'
import DefaultItem from './DefaultItem'
import DonationItem from './donations/DonationItem'
import DriveItem from './drives/DriveItem'

export default {
  props: ['data', 'title', 'emptyMessage', 'itemComponent'],
  components: {
    RespError,
    DefaultItem,
    DonationItem,
    DriveItem
  }
}
</script>
