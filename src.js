let menuIn = true;

const hamMenu = document.querySelector('.fa-solid.fa-bars'),
    currentTemp = document.querySelector('.current-temp'),
    feelsLikeTemp = document.getElementById('feels-like-temp'),
    currentCond = document.getElementById('current-cond'),
    currentWeatherIcon = document.querySelector('.current-weather-icon'),
    uvIndex = document.getElementById('uv-index-value'),
    humidity = document.getElementById('humidity-value'),
    wind = document.getElementById('wind-speed-value'),
    dew = document.getElementById('dew-point-value'),
    visibility = document.getElementById('visibility-value'),
    pressure = document.getElementById('pressure-value'),
    searchInput = document.getElementById('search-input'),
    currentLocation = document.querySelectorAll('.selected-location'),
    btnManageLocations = document.getElementById('btnManage-locations'),
    hourlyWeather = document.querySelector('.hourly-weather-container'),
    locationPin = document.querySelector('.fa-solid.fa-location-pin'),
    sideMenu = document.querySelector('.side-menu'),
    moonrise = document.getElementById('moonrise-time'),
    moonset = document.getElementById('moonset-time'),
    moonPhase = document.getElementById('moon-phase'),
    sideMenuIcon = document.getElementById('sm-weather-icon'),
    country = document.getElementById('country-name'),
    localTime = document.getElementById('local-time'),
    longitude = document.getElementById('long'),
    latitude = document.getElementById('lat'),
    iconSearch = document.querySelector('.fa-solid.fa-magnifying-glass');


sideMenu.style.left = `-${sideMenu.offsetWidth}px`;



const getUserLocation = () => {
    let locationRequest = searchInput.value;
    console.log(locationRequest);
    if(locationRequest == ''){
        console.log('All fields are required');
        locationRequest = 'London';
    }
    return locationRequest;
}

const buildRequestUrl = (location_request) => {
    //return `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${location_request}&days=${5}`;
    return `http://localhost:3500/`
}


const requestWeather = async (url) => {
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
    setWeatherInfo(jsonData);
}


const setWeatherInfo = (data) => {
    if(data.error){
        console.log(data.error.message)
        //Error Handler function
    }else{
        currentTemp.textContent = `${Math.floor(data.current.temp_c)}°C`;
        feelsLikeTemp.textContent = `${Math.floor(data.current.feelslike_c)}°C`;
        currentCond.textContent = data.current.condition.text;
        currentWeatherIcon.src = data.current.condition.icon;
        uvIndex.textContent = data.current.uv;
        humidity.textContent = `${data.current.humidity}%`;
        wind.textContent = `${data.current.wind_kph} km/h`;
        visibility.textContent = `${data.current.vis_km} km`;
        pressure.textContent = `${data.current.pressure_mb} mb`;
        dew.textContent = `${data.current.dewpoint_c} °C`;
        moonrise.textContent = data.forecast.forecastday[0].astro.moonrise;
        moonset.textContent = data.forecast.forecastday[0].astro.moonset;
        moonPhase.textContent = data.forecast.forecastday[0].astro.moon_phase;
        setLocation = getUserLocation();
        currentLocation.forEach(element => {
            element.textContent = setLocation;
        })

        country.textContent = `${data.location.region} ${data.location.country}`;
        localTime.textContent = data.location.localtime;
        longitude.textContent = data.location.lon;
        latitude.textContent = data.location.lat;
        sideMenuIcon.src = data.current.condition.icon;

        setForecast(data);
    }
}

const setForecast = (data) => {
    hourlyWeather.innerHTML = '';
    data.forecast.forecastday[0].hour.forEach(element => {
        createHourlyWeather(element.time.slice(11), Math.floor(element.temp_c), element.condition.icon);
    })
}

const processWeatherRequest = async () => {
    const setLocation = getUserLocation();
    console.log(setLocation);
    const url = buildRequestUrl(setLocation);
    await requestWeather(url);
}
processWeatherRequest(); 

const emptyDiv = document.createElement('div');

const slideMenu = () => {
    if(!menuIn){
        document.body.removeChild(emptyDiv);
        sideMenu.style.left = `-${sideMenu.offsetWidth}px`;
        menuIn = true;
    }else{
        emptyDiv.className = 'emptyDiv';
       // emptyDiv.classList = 'em';
        document.body.appendChild(emptyDiv);

        sideMenu.style.left = `0px`;
        menuIn = false;
    }
    
}
emptyDiv.addEventListener('click', () => {
    slideMenu();
})


searchInput.addEventListener('keydown', event => {
    if(event.key == 'Enter'){
        processWeatherRequest();
        slideMenu();
    }
} )

iconSearch.addEventListener('click', () => {
    processWeatherRequest();
    slideMenu();
})

hamMenu.addEventListener('click', slideMenu);
locationPin.addEventListener('click', slideMenu);

dew.addEventListener('click', slideMenu);



const createHourlyWeather = (time,temp,icon) => {
    const container = document.createElement('div');
    const currentHour = document.createElement('span');
    const iconContainer = document.createElement('span');
    const hourTemp = document.createElement('span'),
        weatherIcon = document.createElement('img');
    icon.className = 'current-hour-icon';
    container.className = 'hourly-weather';
    currentHour.className = 'current-hour';
    hourTemp.className = 'current-hour-temp';

    currentHour.textContent = time;
    weatherIcon.src = icon;
    hourTemp.textContent = `${temp}°C`

    container.appendChild(currentHour);
    container.appendChild(iconContainer);
    iconContainer.appendChild(weatherIcon);
    container.appendChild(hourTemp);
    hourlyWeather.appendChild(container);
}



