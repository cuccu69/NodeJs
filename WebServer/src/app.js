const express = require('express')
const path = require('path')
hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname);
console.log();

const app = express()

// Difine paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Cukcoo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Cukcoo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Please contact to admin for support',
        name: 'Cukcoo',
        email: 'admin@cukoo.com'
    })
})

app.get('/weather', (req, res) => {
    let result = {
        forecast: 'It is sunning',
        location: 'Trung Van'
    }

    const lookingAddress = req.query.address

    if (lookingAddress === null) {
        console.log('----------------- no address -------------------')
        return res.send(result)
    }

    geocode(lookingAddress, (error, { latitude, longtitude, location }) => {
        if (error) {
            console.log('----------------- error geocode -------------------')
            return res.send({ error })
        }

        console.log('------------ value -------------');
        console.log(latitude, longtitude, location, lookingAddress);

        forecast(latitude, longtitude, (error, forecastData) => {
            console.log(error);
            if (error) {
                console.log('----------------- error forecast -------------------')
                console.log(error);
                return res.send({ error })
            }
            console.log('----------------- get true value -------------------')
            return res.send ({
                forecast: forecastData,
                location,
                address: lookingAddress
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Cuckcoo',
        errorMessage: 'Page not found. Choose links above to redirect'
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})
