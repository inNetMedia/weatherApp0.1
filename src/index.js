const searchBar = document.getElementById('search'),
    btnSearch = document.getElementById('btnSearch'),
    autofill = document.querySelector('.location-autofill'),
    icon = document.getElementById('weatherIcon'),
    currentTemp = document.getElementById('current-temp'),
    selectedLocation = document.getElementById('weather-location'),
    windSpeed = document.getElementById('wind-speed'),
    humidity = document.getElementById('humidity');





const getDefaultWeather = async () => {
    const response = await fetch(`https://weather-api-2-289e.onrender.com/`)
    const data = await response.json()
    displayWeather(data)
}

document.addEventListener('DOMContentLoaded', () => {
    getDefaultWeather()
})

searchBar.addEventListener('input', async () => {
    await showPossibleLocations(searchBar.value)
})

const showPossibleLocations = async (region) => {
    const response = await fetch(`https://weather-api-2-289e.onrender.com/search?q=${region}`)
    const data = await response.json()
    displayLocations(data)
}

function displayLocations(data){
    autofill.innerHTML = ``
    autofill.style.display = 'flex' 
    if(!data || !data.length){
       return searchBar.style.border = '1px solid red'
    }
    searchBar.style.border = 'none'
    data.forEach((location) => {
        const spanElement = document.createElement('span')
        spanElement.className = 'found-location'
        spanElement.textContent = `${location.name}, ${location.region}, ${location.country}`
        autofill.appendChild(spanElement)
    })
    const foundLocation = document.querySelectorAll('.found-location')
    foundLocation.forEach((location) => {
        location.addEventListener('click', async () => {
            autofill.style.display = 'none'
            await getWeatherData(location.innerHTML)
            searchBar.value = location.innerHTML
        })
    })
}

const getWeatherData = async (location) => {
    const response = await fetch(`https://weather-api-2-289e.onrender.com/?q=${location}`)
    const data = await response.json()
    displayWeather(data)
}

function displayWeather(data){
    icon.src = data.current.condition.icon
    currentTemp.textContent = `${data.current.temp_c.toFixed(0)}°C`
    selectedLocation.textContent = `${data.location.name} ${data.location.country}`
    windSpeed.innerHTML = `<i class="fa-solid fa-wind"></i> ${data.current.wind_kph.toFixed(0)} km/h`
    humidity.innerHTML = `<i class="fa-solid fa-droplet"></i> ${data.current.humidity}%`
}

btnSearch.addEventListener('click', async () => {
    console.log('button clicked')
    const foundLocations = document.querySelectorAll('.found-location')
    autofill.style.display = 'none'
    await getWeatherData(searchBar.value)
    searchBar.value = foundLocations[0].innerHTML
})