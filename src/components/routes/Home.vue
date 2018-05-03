<template>
  <div class="mt-4">
    <div class="jumbotron mb-4">
      <h1 class="display-6">Charity Honor {{msg}}</h1>
      <p class="lead">Donate to charity to honor reddit comments and posts.</p>
    </div>

    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            Start a Drive
          </div>
          <div class="card-body">
            <ErrorsList :errors="errors" />
            <b-form @submit="submit($event)" class="has-spinner">
              <FormSpinner :on="submitting" />
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
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">How It Works</div>
          <div class="card-body">
            <ul class="ml-0 pl-3 mb-0">
              <li>Someone makes a great post</li>
              <li>Someone else starts a charity drive</li>
              <li>Other people donate to charity in honor of the post</li>
              <li>The post author decides which charity gets the money</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <ListCard v-bind:data="recentDonations" item-component="DonationDriveItem" title="Recent Donations" empty-message="No donations"></ListCard>
      </div>
      <div class="col-md-6">
        <ListCard v-bind:data="topDrives" item-component="DriveItem" title="Top Drives" empty-message="No drives"></ListCard>
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
import ErrorsList from '@/components/ErrorsList'
import FormSpinner from '@/components/FormSpinner'

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
      topDrives: {
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
    ListCard,
    ErrorsList,
    FormSpinner
  },
  methods: {
    fetchData () {
      this.recentDonations.loading = true
      api.fetchLatestDonations((err, result) => {
        this.recentDonations.loading = false
        this.recentDonations.err = err
        this.recentDonations.result = result
      })
      api.fetchTopDrives((err, result) => {
        this.topDrives.loading = false
        this.topDrives.err = err
        this.topDrives.result = result
      })
    },
    submit: function (e) {
      e.preventDefault()
      if (!this.form.redditPostUrl) {
        this.errors = ['Post URL is required']
        return
      }
      this.submitting = true
      api.createDrive(this.form, (err, result) => {
        this.submitting = false
        if (err) {
          this.errors = err
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
    document.title = 'Charity Honor'
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
