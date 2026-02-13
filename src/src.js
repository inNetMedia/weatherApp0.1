const input = document.getElementById('input-location'),
    autofill = document.querySelector('.autofill');

import { displayWeather } from "./UI.js";



const getLocations = async (location) => {
    const response = await fetch(`http://localhost:3500/search?q=${location}`)
    const jsonData = await response.json()
    return jsonData
}

input.addEventListener('input', async () => {
    autofill.style.display = 'flex'
    const results = await getLocations(input.value)
    showLocations(results)
})  


const showLocations = (locArray) => {
    autofill.innerHTML = ``
    if(!locArray.length) return

    locArray.forEach((element) => {
        const locContainer = document.createElement('span')
        locContainer.className = 'found-locations'
        locContainer.textContent = `${element.name}, ${element.region}, ${element.country}`
        autofill.appendChild(locContainer)
    })   

    const foundLocations = document.querySelectorAll('.found-locations')
    foundLocations.forEach((span) => {
        span.addEventListener('click', async () => {
            autofill.style.display = 'none'
            await searchWeather(span.innerHTML)
        })
    })
}

const searchWeather = async (region) => {
    const response = await fetch(`http://localhost:3500/?q=${region}`)
    const data = await response.json()
    displayWeather(data)
}

// const displayWeather = (data) => {
//     console.log(data)
// }

