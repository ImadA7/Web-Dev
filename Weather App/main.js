async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const apiKey = 'fcc8de7015bbb202209bbf0261babf4c'; // Your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather data not found for ${city}`);
        }

        const data = await response.json();

        document.getElementById('cityName').textContent = `Weather in ${data.name}, ${data.sys.country}`;
        document.getElementById('temp').textContent = `${data.main.temp} °C`;
        document.getElementById('humidity').textContent = `${data.main.humidity} %`;
        document.getElementById('wind_speed').textContent = `${data.wind.speed} m/s`;
        document.getElementById('condition').textContent = data.weather[0].description;

        document.getElementById('weatherInfo').style.display = 'block';
    } catch (error) {
        alert(error.message);
        document.getElementById('weatherInfo').style.display = 'none';
    }
}



