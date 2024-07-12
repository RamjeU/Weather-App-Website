async function getWeather() {
    const apiKey = '8e32922be4ab640e8e1930085a2d4d32';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    setLoadingState(true);

    try {
        const geoData = await fetchGeoData(city, apiKey);
        if (geoData.length === 0) {
            alert('City not found. Please enter a valid city name.');
            setLoadingState(false);
            return;
        }

        const { lat, lon } = geoData[0];
        await fetchWeatherData(lat, lon, apiKey);
        await fetchForecastData(lat, lon, apiKey);
        localStorage.setItem('lastCity', city);
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data. Please try again.');
    } finally {
        setLoadingState(false);
    }
}

async function fetchGeoData(city, apiKey) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    const response = await fetch(geoUrl);
    if (!response.ok) throw new Error('Error fetching geolocation data.');
    return response.json();
}

async function fetchWeatherData(lat, lon, apiKey) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await fetch(currentWeatherUrl);
    if (!response.ok) throw new Error('Error fetching current weather data.');
    const data = await response.json();
    displayWeather(data);
}

async function fetchForecastData(lat, lon, apiKey) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await fetch(forecastUrl);
    if (!response.ok) throw new Error('Error fetching hourly forecast data.');
    const data = await response.json();
    displayHourlyForecast(data.list);
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const additionalInfoDiv = document.getElementById('additional-info');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
    additionalInfoDiv.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        tempDivInfo.innerHTML = `<p>${temperature}°C</p>`;
        weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>${description}</p>`;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        weatherIcon.style.display = 'block'; // Make the image visible once it's loaded

        // Additional weather information
        const windSpeed = data.wind.speed;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

        additionalInfoDiv.innerHTML = `
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Humidity: ${humidity}%</p>
            <p>Pressure: ${pressure} hPa</p>
            <p>Sunrise: ${sunrise}</p>
            <p>Sunset: ${sunset}</p>
        `;
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = ''; // Clear previous content

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function setLoadingState(isLoading) {
    const button = document.querySelector('button');
    button.disabled = isLoading;
    button.textContent = isLoading ? 'Loading...' : 'Search';
}

window.onload = () => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        document.getElementById('city').value = lastCity;
        getWeather();
    }
}
