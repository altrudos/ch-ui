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
					<h1 class="display-6">Donate to charity to honor {{drive.content_meta.author}}'s {{drive.content_type}} <a target="_blank" :href="'https://www.reddit.com' + drive.reddit_permalink">{{drive.reddit_type}} <small class="text-muted fas fa-external-link-alt ml-1"></small></a></h1>
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
		//This object is for testing
		const prefill = {}
		return {
			loading: true,
			error: null,
			drive: null,
			charity: null,
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
		},
		preventSubmit (e) {
			e.preventDefault()
			this.form.wasValidated = true
			return true
		},
		async fetchData () {
			document.title = 'Charity Drive'
			console.log(`fetching`)
			try {
				const result = await api.fetchDrive(this.$route.params.slug)
				console.log('result', result)
				this.drive = result.drive
				this.recentDonations.loading = false
				this.recentDonations.result.rows = result.recentDonations
				this.loading = false
				document.title = 'Charity Drive for ' + this.drive.reddit_author + "'s " + this.drive.reddit_type
			} catch (ex) {
				this.loading = false
				this.error = ex
			}
		},
	},
	created () {
		this.fetchData()
		console.log(`fetch it`)
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
