const request = require("request")

const geocode = (place, callback) => {
    if (!place) {
        callback('Please provide a location')
    } else {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=pk.eyJ1IjoiYm9keTY2MSIsImEiOiJjbDR0dmZmbXowdTZiM2RwOHB6bjNjNTR1In0.t8-r2j4TT3oh8XVdExa7dQ&limit=1`
        request({ url, json: true }, (error, response, body) => {
            if (error) {
                callback('Unable to connect to location service', undefined)
            } else if (body.features.length === 0) {
                callback('Unable to find location', undefined)
            } else {
                const data = {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    placeName: body.features[0].place_name
                }
                callback(undefined, data)
            }
        })
    }
}

module.exports = geocode

module.exports = geocode