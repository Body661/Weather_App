const request = require("request")

const weather = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=81d10404134a299b4cc00192c84a4edc&query=${latitude},${longitude}&units=m`
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current)
        }
    })
}

module.exports = weather