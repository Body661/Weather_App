const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const port = process.env.PORT || 3000

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abdolrahman Saleh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abdolrahman Saleh '
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Contact me if you need any help',
        name: 'Abdolrahman Saleh'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, placeName } = {}) => {

        if (error) {
            return res.send({ error })
        }

        weather(latitude, longitude, (error, body) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                placeName,
                forecast: body.weather_descriptions[0],
                temprature: ` ${body.temperature}℃`,
                humidity: body.humidity,
                feelsLike: body.feelslike
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        erorrMsg: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        erorrMsg: 'Page not found',
        name: 'Abdolrahman Saleh'
    })
})

app.listen(port, () => {
    console.log('server in up on port ' + port)
})