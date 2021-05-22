const request = require('postman-request')

const urlWeather = 'http://api.weatherstack.com/current?access_key=c056997b95f9f13649f48b0024cc31da&query=20.997302104154986,105.77154175085815&units=m'
const urlLocation = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiY3VrY29vIiwiYSI6ImNrb3pqZmNrZjA2ajEyb2tnYzV4dG14MWMifQ.m5824_DUc4ZxCq02Zrg_eg&limit=1'

request({ url: urlWeather, json: true }, (error, response) => {
    console.log(response.body.location.name);
})

request({ url:urlLocation, json: true }, (error, response) => {
    const latitude = response.body.features[0].center[1]
    const longtitude = response.body.features[0].center[0]
    console.log(latitude, longtitude);
})