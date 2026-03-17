const container = document.getElementById("weather-container");
const loader = document.getElementById("loader");
const errorDiv = document.getElementById("error");
const addBtn = document.getElementById("add-city");
const refreshBtn = document.getElementById("refresh");
const cityInput = document.getElementById("city-input");

let cities = [];

function getWeatherEmoji(code) {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 47) return "🌫";
    if (code <= 67) return "🌧";
    if (code <= 77) return "❄️";
    return "🌩";
}

function getWeatherCondition(code) {
    if (code === 0) return "Clear Sky";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 67) return "Rainy";
    if (code <= 76) return "Snow";
    return "Stormy";
}

async function fetchCoordinates(cityName) {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`);
    const data = await res.json();
    if (!data.results) throw new Error("City not found");
    return data.results[0];
}

async function fetchWeatherData() {
    if (cities.length === 0) return;

    loader.classList.remove("hidden");
    errorDiv.classList.add("hidden");

    try {
        const requests = cities.map(city =>
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`)
                .then(res => res.json())
        );

        const results = await Promise.all(requests);

        container.innerHTML = "";

        results.forEach((data, index) => {
            const temp = data.current_weather.temperature;
            const code = data.current_weather.weathercode;

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <button onclick="removeCity(${index})">X</button>
                <h2>${cities[index].name}</h2>
                <div class="emoji">${getWeatherEmoji(code)}</div>
                <div class="temp">${temp}°C</div>
                <p>${getWeatherCondition(code)}</p>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        errorDiv.textContent = "Something went wrong!";
        errorDiv.classList.remove("hidden");
    } finally {
        loader.classList.add("hidden");
    }
}

async function addCity() {
    const cityName = cityInput.value.trim();
    if (!cityName) return;

    try {
        const data = await fetchCoordinates(cityName);

        cities.push({
            name: data.name,
            lat: data.latitude,
            lon: data.longitude
        });

        cityInput.value = "";
        fetchWeatherData();

    } catch {
        errorDiv.textContent = "City not found!";
        errorDiv.classList.remove("hidden");
    }
}

function removeCity(index) {
    cities.splice(index, 1);
    fetchWeatherData();
}

addBtn.addEventListener("click", addCity);
refreshBtn.addEventListener("click", fetchWeatherData);