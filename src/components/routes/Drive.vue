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
          <h1 class="display-6">Donate to charity to honor {{drive.reddit_author}}'s reddit <a target="_blank" :href="'https://www.reddit.com' + drive.reddit_permalink">{{drive.reddit_type}} <small class="text-muted fas fa-external-link-alt ml-1"></small></a></h1>
          <div class="lead">
            <div v-if="drive.charity">
              <p class="lead">
                <span v-if="drive.total_amount > 0">
                  <AmountRaised :drive="drive" /> has been raised and 
                </span>
                {{drive.reddit_author}} has chosen <st<a :href="drive.charity.url"><strong>{{drive.charity.name}}</strong></a> as the charity.</p>
            </div>
            <div v-else>
              <div v-if="drive.num_donations > 0">
                <p><AmountRaised :drive="drive" /> has been raised and will go to a charity of {{drive.reddit_author}}'s choice.</p>
              </div>
              <div v-else>
                <p>Money raised goes to a charity of their choice.</p>
              </div>
            </div>
          </div>
        </div>
        <ErrorsList :errors="form.errors" /> 
        <div class="row">
          <div class="col-md-7 has-spinner">
            <FormSpinner :on="form.working" />
            <h4 class="mb-3">Make a Donation</h4>
            <b-form @submit="submitDonation($event)" :class="{'was-validated': form.wasValidated}" :disabled="form.working">
              <b-form-group class="mb-3">
                <label class="form-label">Amount (USD)</label>
                <div class="col-md-4 pl-0">
                  <b-form-input
                    type="text"
                    v-model="form.amount">
                  </b-form-input>
                  <b-form-invalid-feedback>Amount must be positive</b-form-invalid-feedback>
                </div>
              </b-form-group>
              <b-form-group class="mb-4">
                <label class="form-label">Email <small class="text-muted">(your receipt will be sent here)</small></label>
                <b-form-input
                  type="text"
                  v-model="form.email">
                </b-form-input>
                <b-form-invalid-feedback>Email is required</b-form-invalid-feedback>
              </b-form-group>
              <button class="d-none"></button>
            </b-form>
            <form :id="'panda_cc_form'" v-on:submit.prevent="preventSubmit($event)" novalidate="novalidate" :class="{'was-validated': form.wasValidated}" :disabled="form.working">
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
                  <label for="cc-expiration">CVV</label>
                  <input id="cc-cvv" type="text" data-panda="cvv" :value="form.cvv"  class="form-control"/>
                  <div class="invalid-feedback"></div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <button class="btn btn-lg btn-block btn-primary"><span v-if="form.working">Working...</span><span v-else>Donate</span></button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-md-5 order-md-1">
            <ListCard v-bind:data="recentDonations" item-component="DonationItem" title="Recent Donations" empty-message="No donations"></ListCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/lib/api'
import ErrorsList from '@/components/ErrorsList'
import ListCard from '@/components/ListCard'
import Amount from '@/components/Amount'
import AmountRaised from '@/components/drives/AmountRaised'
import FormSpinner from '@/components/FormSpinner'

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
      recentDonations: {
        loading: true,
        result: {
          rows: []
        }
      },
      form: Object.assign({
        wasValidated: false,
        working: false,
        errors: []
      }, prefill)
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  components: {
    ErrorsList,
    ListCard,
    Amount,
    AmountRaised,
    FormSpinner
  },
  methods: {
    submitDonation (e) {
      e.preventDefault()
      console.log('we need the payment information from PandaPay');
      this.pandaForm.submit()
    },
    preventSubmit (e) {
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
        this.recentDonations.loading = false
        this.recentDonations.result.rows = result.recentDonations
        this.loading = false
        document.title = 'Charity Drive for ' + this.drive.reddit_author + "'s " + this.drive.reddit_type
        this.bindPanda()
      })
    },
    bindPanda () {
      console.log('document.querySelectorAll("form").length',document.querySelectorAll("form").length);
      this.updatedCount = this.updatedCount || 0
      if (this.pandaLoaded) {
        console.log('already pandaload');
        return
      }

      if (this.loading) {
        console.log('still loading drive')
        return
      }

      this.pandaLoaded = true

      setTimeout(() => {
        const PDiddy = Object.assign({}, Panda)
        PDiddy.init('pk_test_jDT1TStVcXG5lpFouAxBsg', this.pandaId);

        PDiddy.on('success', (cardToken) => {
          // You now have a token you can use to refer to that credit card later.
          // This token is used in PandaPay API calls for creating donations and grants
          // so that you don't have to worry about security concerns with dealing with
          // credit card data.
          document.querySelector('[data-panda="first_name"]').setCustomValidity('')

          this.form.working = true
          api.createDonation(this.drive.id, cardToken, this.form, (err, result) => {
            this.form.working = false
            if (err) {
              this.form.errors = err
              return
            }

            //Refetch the data to show their donation
            this.fetchData()

            alert('Thanks for your donation, buddy.')
          })
        });

        PDiddy.on('error', (errors) => {
          // errors is a human-readable list of things that went wrong
          //  (invalid card number, missing last name, etc.)
          console.log('oh no');
          this.pandaForm.classList.add('was-validated');

          const inputs = this.pandaForm.querySelectorAll('input')
          inputs.forEach((input) => {
            input.setCustomValidity('')
          })

          errors.forEach((err) => {
            console.log('err',err);
            if (err.attribute == 'month' || err.attribute == 'year') {
              err.attribute = 'expiration'
            }
            else if (err.attribute  == 'number' || err.attribute == 'card_type') {
              err.attribute = 'credit_card'
            }
            const field = document.querySelector('[data-panda="' + err.attribute + '"]')

            if (field) {
                console.log('field', field);
              field.setCustomValidity(err.message)
              const msg = field.parentNode.querySelector('.invalid-feedback')
              msg.innerHTML = err.message
            }
            else {
              console.log('no field found', err);
            }
          })
        })
      }, 500)
    }
  },
  created () {
    this.fetchData()
    this.pandaId = 'panda_cc_form'
  },
  updated () {
    this.bindPanda()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
