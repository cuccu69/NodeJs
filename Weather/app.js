const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const addres = process.argv[2]
// console.log(process.argv);
if (!addres) {
    console.log('Please provide an address!');
} else {
    geocode(addres, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return console.log(error);
        }
        // console.log('Error', error)
        // console.log('Data', data)
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                console.log(error);
            }
            console.log(location);
            console.log(forecastData);
        })
    })
}