import axios from 'axios'
const apiUrl = 'http://localhost:3000/'

const api = axios.create({
	baseUrl: apiUrl
})

async function handler (promise) {
	return promise.catch((err) => {
		throw new Error('I found some kind of error')
	})
}

function createDrive (vueObj, done) {
	const data = { ...vueObj }
	request('post', 'drives')
		.send(data)
		.end(handler(done))
}

function createDonation (driveId, cardToken, vueObj, done) {
	const data = { ...vueObj }
	data.drive_id = driveId
	data.pandapay_token = cardToken

	request('post', 'donations')
		.send(data)
		.end(handler(done))
}

function chooseCharity (token, charityId, done) {
	request('patch', 'drives/token/' + token)
		.send({
			charityId: charityId
		})
		.end(handler(done))
}

async function fetchDrive (slug) {
	return await handler(new Promise((resolve, reject) => {
		return resolve({
			drive: {
				name: 'Some Drive',
				slug: slug,
				content_type: 'reddit_comment',
				content_meta: {
					author: 'Dage',
					subreddit: 'funny'
				}
			},
			recentDonations: {
				rows: []
			}
		})
	}))
}

function fetchDrive (id, done) {
	request('get', 'drives/' + id).end(handler(done))
}

function fetchDriveByToken (token, done) {
	request('get', 'drives/token/' + token).end(handler(done))
}

async function fetchLatestDonations () {
	return {
		rows: [{
			amount: 123,
			name: 'Colin',
			createdAt: new Date()
		}],
		loading: false,
		error: true
	}
}

async function fetchLatestDrives (done) {
	return {
		rows: [{
			amount: 123,
			name: 'Colin'
		}],
		loading: false,
		error: true
	}
}

async function fetchTopDrives (done) {
	return {
		rows: [{
			id: 123,
			content_type: 'reddit_comment',
			content_meta: {
				author: 'Vindexus',
				subreddit: 'wtf'
			},
			slug: 'HappyHonorableKnight',
			total_amount: 3234,
			createdAt: new Date("2019-02-02")
		}],
		loading: false,
		error: true
	}
}


export default {
	createDrive,
	createDonation,
	fetchDrive,
	fetchLatestDonations,
	fetchLatestDrives,
	fetchTopDrives,
	fetchDriveByToken,
	chooseCharity
}
