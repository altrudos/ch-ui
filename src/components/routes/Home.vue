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
          <fieldset :disabled="submitting">
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
              <b-button variant="primary" type="submit"><span v-if="submitting">Working...</span><span v-else>Submit</span></b-button>
            </b-form-group>
          </fieldset>
        </b-form>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <ListCard v-bind:data="recentDonations" item-component="DonationItem" title="Recent Donations" empty-message="No donations"></ListCard>
      </div>
      <div class="col-md-6">
        <ListCard v-bind:data="recentDrives" item-component="DriveItem" title="Recent Drives" empty-message="No drives"></ListCard>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, url } from 'vuelidate/lib/validators'
import api from '@/lib/api'
import router from '@/router'
import ListCard from '@/components/ListCard'

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
      submitting: false,
      recentDonations: {
        loading: true,
        result: [],
        err: false
      },
      recentDrives: {
        loading: true,
        result: [],
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
  components: {
    ListCard
  },
  methods: {
    fetchData () {
      this.recentDonations.loading = true
      api.fetchLatestDonations((err, result) => {
        this.recentDonations.loading = false
        this.recentDonations.err = err
        this.recentDonations.result = result
      })
      api.fetchLatestDrives((err, result) => {
        this.recentDrives.loading = false
        this.recentDrives.err = err
        this.recentDrives.result = result
      })
    },
    submit: function (e) {
      e.preventDefault()
      if (!this.form.redditPostUrl) {
        return
      }
      this.submitting = true
      api.createDrive(this.form, (err, result) => {
        this.submitting = false
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
