<template>
<div class="alert alert-danger" :class="{'d-none': messages.length == 0}">
  <div v-for="(err, index) in messages" v-bind:key="index">{{err}}</div>
</div>
</template>

<script>
export default {
  props: ['errors'],
  computed: {
    messages () {
      let errors = this.errors.map ? this.errors : [this.errors]

      errors = JSON.parse(JSON.stringify(errors))

      return errors.map(e => {
        console.log('e', e);
        if (typeof e === 'string') {
          return e
        }
        else if (typeof e === 'object') {
          if (e.hasOwnProperty('message')) {
            return e.message
          }

          if (e.hasOwnProperty('error')) {
            return e.error
          }

          if (e.hasOwnProperty('err')) {
            return e.err
          }

          return e.toString()
        }
      })
    }
  }
}
</script>