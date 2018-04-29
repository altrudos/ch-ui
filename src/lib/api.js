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

function fetchDrive (id, done) {
  request('get', 'drives/' + id).end(handler(done))
}

function fetchLatestDonations (done) {
  request('get', 'donations/latest').end(handler(done))
}
function fetchLatestDrives (done) {
  request('get', 'drives/latest').end(handler(done))
}

export default {
  createDrive,
  fetchDrive,
  fetchLatestDonations,
  fetchLatestDrives
}
