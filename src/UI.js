const c_weatherIcon = document.getElementById('current-weather-icon'),
    c_weatherDesc = document.getElementById('current-weather-desc'),
    c_weatherTemp = document.getElementById('current-weather-tempC'),
    location = document.getElementById('weather-location'),
    feelsLike = document.getElementById('weather-feels-like'),
    h_forcastContainer = document.querySelector('.hourly-weather'),
    wind_n = document.getElementById('now-windSpeed'),
    windMax_n = document.getElementById('now-windSpeed-max'),
    humidity_n = document.getElementById('now-humidity'),
    dewpoint_n = document.getElementById('dewpoint-temp'),
    uv_index = document.getElementById('uv-index'),
    pressure_n = document.getElementById('now-pressure'),
    windChill_n = document.getElementById('wind-chill'),
    precipitaion_n = document.getElementById('now-percipitation'),
    visibility = document.getElementById('visibility-index'),
    sunrise = document.getElementById('sunrise'),
    sunset = document.getElementById('sunset'),
    moonrise = document.getElementById('moonrise'),
    moonset = document.getElementById('moonset'),
    tmr_hourly_weather = document.querySelector('.tomorrow-hourly-weather');



export function displayWeather(data){
    console.log(data)
    c_weatherIcon.src = data.current.condition.icon
    c_weatherDesc.textContent = data.current.condition.textContent
    c_weatherTemp.textContent = data.current.temp_c
    location.textContent = `${data.location.country} ${data.location.name}`
    feelsLike.textContent = data.current.feelslike_c.toFixed(0)
    wind_n.textContent = data.current.wind_kph.toFixed(0)
    windMax_n.textContent = data.current.gust_kph.toFixed(0)
    humidity_n.textContent = data.current.humidity
    dewpoint_n.textContent = data.current.dewpoint_c.toFixed(0)
    uv_index.textContent = data.current.uv.toFixed(0)
    pressure_n.textContent = data.current.pressure_mb
    windChill_n.textContent = data.current.windchill_c.toFixed(0)
    precipitaion_n.textContent = data.current.precip_mm.toFixed(0)
    visibility.textContent = data.current.vis_km
    sunrise.textContent = data.forecast.forecastday[0].astro.sunrise
    sunset.textContent = data.forecast.forecastday[0].astro.sunset
    moonrise.textContent = data.forecast.forecastday[0].astro.moonrise
    moonset.textContent = data.forecast.forecastday[0].astro.moonset

    //hourly weather for current day
    if(h_forcastContainer.firstChild){
        h_forcastContainer.removeChild(h_forcastContainer.firstChild)
        tmr_hourly_weather.removeChild(tmr_hourly_weather.firstChild)
    }
    data.forecast.forecastday[0].hour.forEach((dataset) => {
        const hourlyWeather = document.createElement('div')
        hourlyWeather.innerHTML = `
                                <span>${dataset.time.split(' ')[1]}</span>
                                <span><img src="${dataset.condition.icon}"></span>
                                <span>${dataset.temp_c}</span>
        `
        h_forcastContainer.appendChild(hourlyWeather)
    })

    //hourly weather for next day
    data.forecast.forecastday[1].hour.forEach((dataset) => {
        const hourlyWeather_n = document.createElement('div')
        hourlyWeather_n.className = 'tomorrow-forecast'
        hourlyWeather_n.innerHTML = `
                                <span>${dataset.time.split(' ')[1]}</span>
                                <span><img src="${dataset.condition.icon}"></span>
                                <span>${dataset.temp_c}</span>
        `
        tmr_hourly_weather.appendChild(hourlyWeather_n)
    })
}
