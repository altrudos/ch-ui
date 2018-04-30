<template>
  <div class="mt-4">
    <div class="col-md-8 offset-md-2">
      <div v-if="loading">
        Loading
      </div>
      <div v-else>
        <div v-if="error">
          <ErrorsList :errors="error" />
        </div>
        <div v-else>
          <router-link :to="{name: 'drive', params: {id: drive.id}}" class="small mb-2 d-block">←&nbsp;&nbsp;Back to Drive</router-link>
          <div class="jumbotron mb-4">
            <h1 v-if="drive.charity_id">Charity has been chosen for your <a :href="'https://www.reddit.com' + drive.reddit_permalink">reddit {{drive.reddit_type}}</a></h1>
            <h1 v-else>Choose which charity donations go to for your <a :href="'https://www.reddit.com' + drive.reddit_permalink">reddit {{drive.reddit_type}}</a></h1>
            <p class="lead">
              <span v-if="drive.num_donations > 0">
                <Amount :amount="drive.total_amount"></Amount> has already been donated.
              </span>
              <span v-else>
                No donations yet.
              </span>
            </p>
          </div>
          <div class="card">
            <div class="card-header">Charities</div>
            <div class="card-body">
                <ErrorsList :errors="chooseError" />
                <div v-for="(charity, index) in charities" :key="charity.id">
                  <div class="row mb-2">
                    <div class="col-md-8">{{charity.name}}<br />{{charity.url}}</div>
                    <div class="col-md-4 text-right">
                      <button class="btn btn-sm btn-primary" :class="{'d-none': charity.id != drive.charity_id && drive.charity_id, 'btn-success': charity.id == chosenId}" :disabled="working || chosenId" @click="chooseCharity(charity.id)">
                        <span v-if="charity.id != chosenId">
                          Choose
                        </span>
                        <span v-else>
                          <span class="fa fa-check"></span>
                          Chosen!
                        </span>
                      </button>
                    </div>
                  </div>
                  <hr :class="{'d-none': index + 1 == charities.length}" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/lib/api'
import ErrorsList from '@/components/ErrorsList'

export default {
  data () {
    return {
      loading: true,
      working: false,
      chosenId: null,
      token: this.$route.params.token,
      chooseError: []
    }
  },
  components: {
    ErrorsList
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.loading = true
      api.fetchDriveByToken(this.token, (err, result) => {
        this.loading = false
        this.drive = result.drive
        this.charities = result.charities
        this.error = err
        if (this.drive.charity_id) {
          this.chosenId = this.drive.charity_id
        }
      })
    },
    chooseCharity (id) {
      this.working = true
      this.chosenId = id
      this.chooseError = []
      api.chooseCharity(this.token, id, (err) => {
        this.working = false
        if (err) {
          this.chooseError = err
          this.chosenId = null
        }
      })
    }
  }
}
</script>
