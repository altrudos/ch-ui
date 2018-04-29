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
          </div>
          <div class="col-md-7 order-md-1">
            <h4 class="mb-3">Make a Donation</h4>
            <b-form @submit="submitDonation($event)" :class="{'was-validated': form.wasValidated}" :disabled="form.working">
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
            <form :id="'panda_cc_form_' + pandanum" v-on:submit.prevent="preventSubmit($event)" novalidate="novalidate" :class="{'was-validated': form.wasValidated}" :disabled="form.working">
              <h4 class="mb3">Payment Information</h4>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="cc-fname">First Name*</label>
                  <input id="cc-fname" type="text" value="" data-panda="first_name" :value="form.firstName" class="form-control"/><small class="text-muted"></small>
                  <div class="invalid-feedback"></div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="cc-lname">Last Name*</label>
                  <input id="cc-lname" type="text" value="" data-panda="last_name" :value="form.lastName"  class="form-control"/><small class="text-muted"></small>
                  <div class="invalid-feedback"></div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-8 mb-3">
                  <label for="cc-number">Credit card number*</label>
                  <input id="cc-number" type="text" value="" data-panda="credit_card" :value="form.creditCard"  class="form-control"/>
                  <div class="invalid-feedback"></div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 mb-3">
                  <label for="cc-expiration">
                    Expiration*
                     <small>(MM/YYYY)</small>
                  </label>
                  <input id="cc-expiration" type="text" value="" data-panda="expiration" :value="form.expiration"  class="form-control"/>
                  <div class="invalid-feedback"></div>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="cc-expiration">CVV*</label>
                  <input id="cc-cvv" type="text" required="" data-panda="cvv" :value="form.cvv"  class="form-control"/>
                  <div class="invalid-feedback"></div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <button class="btn btn-block btn-primary"><span v-if="form.working">Working...</span><span v-else>Submit</span></button>
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
      pandanum: new Date().getTime(),
      recentDonations: [],
      form: Object.assign({
        wasValidated: false,
        working: false
      }, prefill)
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
    preventSubmit (e) {
      console.log('e', e)
      e.preventDefault()
      this.form.wasValidated = true
      return true
    },
    fetchData () {
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
  },
  updated () {
    this.updatedCount = this.updatedCount || 0
    console.log('updated', ++this.updatedCount);
    if (this.pandaLoaded || this.loading) {
      return
    }

    this.pandaLoaded = true

    setTimeout(() => {
      Panda.init('pk_test_jDT1TStVcXG5lpFouAxBsg', 'panda_cc_form_' + this.pandanum);

      console.log('Object.keys(Panda)',Object.keys(Panda));

      Panda.on('success', function(cardToken) {
        // You now have a token you can use to refer to that credit card later.
        // This token is used in PandaPay API calls for creating donations and grants
        // so that you don't have to worry about security concerns with dealing with
        // credit card data.
        console.log('cardToken', cardToken);
        document.querySelector('[data-panda="firstName"]').setCustomValidity('')
      });

      Panda.on('error', function(errors) {
        // errors is a human-readable list of things that went wrong
        //  (invalid card number, missing last name, etc.)
        console.log('oh no');
        form.classList.add('was-validated');

        const inputs = form.querySelectorAll('input')
        inputs.forEach((input) => {
          input.setCustomValidity('')
        })

        errors.forEach((err) => {
          if (err.attribute == 'month' || err.attribute == 'year') {
            err.attribute = 'expiration'
          }
          else if (err.attribute  == 'number' || err.attribute == 'card_type') {
            err.attribute = 'credit_card'
          }
          const field = document.querySelector('[data-panda="' + err.attribute + '"]')
          console.log('field', field);
          console.log('err.attribute',err.attribute);
          field.setCustomValidity(err.message)
          const msg = field.parentNode.querySelector('.invalid-feedback')
          msg.innerHTML = err.message
        })
      })
    },1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
