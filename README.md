# Weather App

A simple and elegant weather application that provides current weather information and a 24-hour forecast for any city using the OpenWeatherMap API.

## Features

- Fetches current weather data including temperature, weather description, wind speed, humidity, pressure, sunrise, and sunset times.
- Displays a 24-hour weather forecast in 3-hour intervals.
- Provides an intuitive and responsive user interface.
- Saves the last searched city and automatically fetches weather data for that city on page load.
- Loading indicator and error handling for a better user experience.

## Technologies Used

- HTML
- CSS
- JavaScript
- OpenWeatherMap API


## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/weather-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd weather-app
    ```
3. Open `index.html` in your preferred web browser.

## Usage

1. Enter the name of the city in the input field.
2. Click the "Search" button.
3. View the current weather and 24-hour forecast for the entered city.

## Code Overview

### JavaScript

The main JavaScript functionality is in the `script.js` file. It includes functions to fetch geolocation data, current weather data, and forecast data from the OpenWeatherMap API, and to update the DOM with the fetched data.

### CSS

The styles are defined in the `style.css` file. It includes styles for the main weather container, input field, button, weather information, and hourly forecast items.


