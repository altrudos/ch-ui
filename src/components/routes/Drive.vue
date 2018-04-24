<template>
  <div class="mt-4">
    <div v-if="loading">
      Loading
    </div>
    <div v-else>
      <div v-if="error">
        Error: {{error}}
      </div>
      <div v-else>
        <div class="jumbotron mb-4">
          <h1 class="display-6">Donate to charity in honor <a :href="'https://www.reddit.com/user/' + drive.reddit_author">{{drive.reddit_author}}</a>'s reddit <a :href="'https://www.reddit.com' + drive.reddit_permalink">{{drive.reddit_type}}</a></h1>
          <p class="lead">
            Money raised goes to a charity of their choice.
          </p>
        </div>
        <div class="row">
          <div class="col-md-5 order-md-2">
            <div class="card">
              <div class="card-header">
                <h6 class="title">Recent Donations</h6>
              </div>
              <div class="card-body">
                <div v-for="donation in recentDonations" v-bind:key="donation.id">
                  {{donation.id}}
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-7 order-md-1">
            <h4 class="mb-3">Donation Information</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/lib/api'

export default {
  name: 'Drive',
  data () {
    return {
      loading: true,
      error: null
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      console.log('fetch the drive')
      this.loading = true
      api.fetchDrive(this.$route.params.id, (err, result) => {
        if (err) {
          this.error = err
          return
        }
        this.drive = result.drive
        this.recentDonations = result.recentDonations
        this.loading = false
      })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
