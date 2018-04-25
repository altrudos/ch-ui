<template>
  <div class="mt-4">
    <div class="jumbotron mb-4">
      <h1 class="display-6">Charity Honor {{msg}}</h1>
      <p class="lead">Donate to charity honor of reddit comments and posts.</p>
    </div>

    <div class="card mb-4">
      <div class="card-header">
        Start a Drive
      </div>
      <div class="card-body">
        <div class="alert alert-danger" :class="{'d-none': errors.length == 0}">
          <div v-for="(err, index) in errors" v-bind:key="index">{{err}}</div>
        </div>
        <b-form @submit="submit($event)">
          <b-form-group>
            <label class="form-label">Reddit Post or Comment</label>
            <b-form-input
              type="text"
              v-model="form.redditPostUrl"
              @input="$v.form.redditPostUrl.$touch()"
              :state="$v.form.redditPostUrl.$dirty ? !$v.form.redditPostUrl.$invalid : null"
              placeholder="https://">
            </b-form-input>
            <b-form-invalid-feedback>URL is required</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group>
            <b-button variant="primary" type="submit">Submit</b-button>
          </b-form-group>
        </b-form>
      </div>
    </div>

    <div class="card">
      <div class="card-header">Recent Donations</div>
      <div class="card-body">
        <div v-if="recentDonations.loading">
          Loading...
        </div>
        <div v-else>
          <div v-for="(donation, index) in recentDonations.results">
            {{donation.donor}} donated {{donation.amount}} cents
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, url } from 'vuelidate/lib/validators'
import api from '@/lib/api'
import router from '@/router'

export default {
  name: 'Index',
  data () {
    return {
      msg: '',
      wasValidated: false,
      tr: true,
      errors: [],
      form: {
        redditPostUrl: ''
      },
      recentDonations: {
        loading: true,
        results: [],
        err: false
      }
    }
  },
  mixins: [
    validationMixin
  ],
  validations: {
    form: {
      redditPostUrl: {
        required,
        url
      }
    }
  },
  methods: {
    fetchData () {
      this.recentDonations.loading = false
    },
    submit: function (e) {
      e.preventDefault()
      if (!this.form.redditPostUrl) {
        return
      }
      api.createDrive(this.form, (err, result) => {
        if (err) {
          this.errors = [err.toString()]
          return
        }

        if (result.status == 'duplicate') {
          alert('Drive already created for that post, redirecting...')
        }
        else {
          alert('Created a drive')
        }

        router.push({name: 'drive', params: {id: result.drive.id}})
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
