import superagent from 'superagent'
const apiUrl = 'http://localhost:3000/'

function request (method, url) {
  return superagent[method](apiUrl + url)
    .set('Accept', 'application/json')
}

function handler (done) {
  return (err, result) => {
    let json

    if (err) {
      try {
        json = JSON.parse(result.text)
      } catch (ex) {
        done(new Error('Error from server. Could not parse error JSON'))
        return
      }

      done(json)
      return
    }
    try {
      json = JSON.parse(result.text)
    } catch (ex) {
      done(new Error('Error parsing JSON'))
      return
    }
    done(null, json)
  }
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

function fetchDrive (id, done) {
  request('get', 'drives/' + id).end(handler(done))
}

function fetchDrive (id, done) {
  request('get', 'drives/' + id).end(handler(done))
}

function fetchDriveByToken (token, done) {
  request('get', 'drives/token/' + token).end(handler(done))
}

function fetchLatestDonations (done) {
  request('get', 'donations/latest').end(handler(done))
}

function fetchLatestDrives (done) {
  request('get', 'drives/latest').end(handler(done))
}

function fetchTopDrives (done) {
  request('get', 'drives/top').end(handler(done))
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
