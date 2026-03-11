const cities = [
    { name: "Delhi", lat: 28.6139, lon: 77.2090 },
    { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
    { name: "Bangalore", lat: 12.9716, lon: 77.5946 }
];

const container = document.getElementById("weather-container");
const loader = document.getElementById("loader");
const errorDiv = document.getElementById("error");

function getWeatherEmoji(code) {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫";
    if (code <= 67) return "🌧";
    if (code <= 77) return "❄️";
    return "🌩";
}

function getWeatherCondition(code) {
    if (code === 0) return "Clear Sky";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snow";
    return "Stormy";
}

async function fetchWeather() {
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
                <h2>${cities[index].name}</h2>
                <div class="emoji">${getWeatherEmoji(code)}</div>
                <div class="temp">${temp}°C</div>
                <p>${getWeatherCondition(code)}</p>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        errorDiv.textContent = "Failed to fetch weather data!";
        errorDiv.classList.remove("hidden");
    } finally {
        loader.classList.add("hidden");
    }
}

fetchWeather();