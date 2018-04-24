import superagent from 'superagent'
const apiUrl = 'http://localhost:3000/'

function request (method, url) {
  return superagent[method](apiUrl + url)
    .set('Accept', 'application/json')
}

function handler (done) {
  console.log('make handler')
  return (err, result) => {
    if (err) {
      console.log('err')
      done(err)
      return
    }
    let json
    try {
      json = JSON.parse(result.text)
    } catch (ex) {
      done(new Error('Error parsing JSON'))
      return
    }
    console.log('json', json)
    done(null, json)
  }
}

function createDrive (vueObj, done) {
  const data = { ...vueObj }
  console.log('data', data)
  request('post', 'drives')
    .send(data)
    .end(handler(done))
}

function fetchDrive (id, done) {
  request('get', 'drives/' + id).end(handler(done))
}

export default {
  createDrive,
  fetchDrive
}
