const express = require('express')
const path = require('path')

console.log(__dirname);
console.log();

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))

app.listen(3000, () => {
    console.log('Server running on port 3000')
})

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
    res.send({
        forecast: 'It is sunning',
        location: 'Trung Van'
    })
})