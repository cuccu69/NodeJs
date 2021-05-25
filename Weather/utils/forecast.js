const request = require('postman-request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c056997b95f9f13649f48b0024cc31da&query=' + latitude + ',' + longtitude + '&units=m'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services.', 'No data')
        } else if (response.body.error) {
            callback('Unable to find location!', 'No data')
        } else {
            callback('No error founded', `${response.body.location.name}: ${response.body.current.weather_descriptions[0]}. Temperature is now ${response.body.current.temperature}oC and it feels like ${response.body.current.feelslike}oC out side`)
        }
    })
}

module.exports = forecast