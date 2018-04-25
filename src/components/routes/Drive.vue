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
        <router-link :to="{name: 'home'}" class="small mb-2 d-block">←&nbsp;&nbsp;Back Home</router-link>
        <div class="jumbotron mb-4">
          <h1 class="display-6">Donate to charity in honor <a :href="'https://www.reddit.com/user/' + drive.reddit_author">{{drive.reddit_author}}</a>'s reddit <a :href="'https://www.reddit.com' + drive.reddit_permalink">{{drive.reddit_type}}</a></h1>
          <div class="lead">
            <div v-if="charity">
              <p class="lead">Money raised goes to the charity {{drive.reddit_author}} chose: <a :href="charity.url">{{charity.nlame}}</a></p>
            </div>
            <div v-else>
              <p>Money raised goes to a charity of their choice.</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-5 order-md-2">
            <div v-if="!loading">
              <div class="card">
                <div v-if="recentDonations.lengths">
                  <div class="card-header">
                    <h6 class="title">Recent Donations</h6>
                  </div>
                  <div class="card-body">
                    <div v-for="donation in recentDonations" v-bind:key="donation.id">
                      {{donation.id}}
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="card-header">
                    <h6 class="card-title">No Donations Yet</h6>
                  </div>
                  <div class="card-body">
                    <p class="mb-0">Be the first!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-7 order-md-1">
            <h4 class="mb-3">Make a Donation</h4>
            <b-form @submit="submitDonation($event)">
              <b-form-group class="mb-3">
                <label class="form-label">Amount</label>
                <div class="col-md-6 pl-0">
                  <b-form-input
                    type="text"
                    v-model="form.amount">
                  </b-form-input>
                  <b-form-invalid-feedback>Amount must be positive</b-form-invalid-feedback>
                </div>
              </b-form-group>
              <b-form-group class="mb-4">
                <label class="form-label">Email</label>
                <b-form-input
                  type="text"
                  v-model="form.email">
                </b-form-input>
                <b-form-invalid-feedback>Email is required</b-form-invalid-feedback>
              </b-form-group>
            </b-form>
            <form id="panda_cc_form" novalidate="novalidate">
              <h4 class="mb3">Payment Information</h4>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="cc-fname">First Name*</label>
                  <input id="cc-fname" type="text" value="" v-model="form.firstName" data-panda="first_name" class="form-control"/><small class="text-muted"></small>
                  <div class="invalid-feedback"></div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="cc-lname">Last Name*</label>
                  <input id="cc-lname" type="text" v-model="form.lastName" value="" data-panda="last_name" class="form-control"/><small class="text-muted"></small>
                  <div class="invalid-feedback"></div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-8 mb-3">
                  <label for="cc-number">Credit card number*</label>
                  <input id="cc-number" type="text" v-model="form.creditCard" value="" data-panda="credit_card" class="form-control"/>
                  <div class="invalid-feedback"></div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 mb-3">
                  <label for="cc-expiration">
                    Expiration*
                     <small>(MM/YYYY)</small>
                  </label>
                  <input id="cc-expiration" type="text" v-model="form.expiration" value="" data-panda="expiration" class="form-control"/>
                  <div class="invalid-feedback"></div>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="cc-expiration">CVV*</label>
                  <input id="cc-cvv" type="text" v-model="form.cvv" placeholder="" required="" data-panda="cvv" class="form-control"/>
                  <div class="invalid-feedback"></div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <button class="btn btn-block btn-primary">Submit</button>
                </div>
              </div>
            </form>
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
    const prefill = {
      email: 'vindexus@gmail.com',
      firstName: 'Colin',
      lastName: 'Test',
      expiration: '11/2020',
      creditCard: '4111 1111 1111 1111',
      amount: 7
    }

    return {
      loading: true,
      error: null,
      drive: null,
      charity: null,
      recentDonations: [],
      form: prefill
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    submitDonation (e) {
      e.preventDefault()
      console.log('submit it')
    },
    fetchData () {
      console.log('fetch the drive')
      document.title = 'Charity Drive'
      this.loading = true
      api.fetchDrive(this.$route.params.id, (err, result) => {
        if (err) {
          this.error = err
          return
        }
        this.drive = result.drive
        this.recentDonations = result.recentDonations
        this.loading = false
        document.title = 'Charity Drive for ' + this.drive.reddit_author + "'s " + this.drive.reddit_type
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
