const msg1 = document.querySelector('.message1')
const weatherP = document.querySelector('.weather-response')

const request = async (place) => {

    const response = await fetch(`/weather?address=${place}`)
    const data = await response.json()

    if (data.error) {
        return msg1.innerHTML = data.error
    }
    msg1.innerHTML = data.placeName + ' :'
    weatherP.innerHTML = `${data.forecast}, It's currently ${data.temprature} out. It feels like ${data.feelsLike}℃ out. The humidity is ${data.humidity}% period`
}

const weatherForm = document.querySelector('form')
const placeInput = document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    msg1.innerHTML = 'Loading...'
    weatherP.innerHTML = ''

    request(placeInput.value)
})

// request()