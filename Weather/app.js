const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

geocode('New York', (error, data) => {
    if (error) {
        return console.log(error);
    }
    // console.log('Error', error)
    // console.log('Data', data)
    forecast(data.latitude, data.longtitude, (error, forecastData) => {
        if (error) {
            console.log(error);
        }
        console.log(data.location);
        console.log(forecastData);
    })
})