const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY3VrY29vIiwiYSI6ImNrb3pqZmNrZjA2ajEyb2tnYzV4dG14MWMifQ.m5824_DUc4ZxCq02Zrg_eg&limit=1&language=en'

    return request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect location services!', 'No data!')
        } else if (body.features.length === 0) {
            callback ('Unable to find location. Try another search.', 'No data!')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode