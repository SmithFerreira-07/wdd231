document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
document.addEventListener("DOMContentLoaded", () => {
    const hamburgerButton = document.getElementById("mobileMenu");
    const mainNav = document.getElementById("navigation");
    const weatherContainer = document.getElementById("weatherNow");
    const API_KEY = "";
    const LATITUDE = 16.7666;
    const LONGITUDE = -3.0026;

    async function getWeatherData() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`);

            if (!response.ok) {
                throw new Error("Weather data not available");
            }

            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            weatherContainer.innerHTML = "<p>Weather information unavailable</p>";
        }
    }

    function displayWeather(data) {
        const weatherCode = data.weather[0].id;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = Math.round(data.wind.speed);
        const highTemp = Math.round(data.main.temp_max);
        const lowTemp = Math.round(data.main.temp_min);
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', options);
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', options);

        let svgFileName = "sunny.svg";

        if (weatherCode >= 200 && weatherCode < 300) {
            svgFileName = "thunderstorm.svg";
        } else if (weatherCode >= 300 && weatherCode < 400) {
            svgFileName = "drizzle.svg";
        } else if (weatherCode >= 500 && weatherCode < 600) {
            svgFileName = "rain.svg";
        } else if (weatherCode >= 600 && weatherCode < 700) {
            svgFileName = "snow.svg";
        } else if (weatherCode >= 700 && weatherCode < 800) {
            svgFileName = "fog.svg";
        } else if (weatherCode === 800) {
            svgFileName = "sunny.svg";
        } else if (weatherCode > 800) {
            svgFileName = "cloudy.svg";
        }

        weatherContainer.innerHTML = `
        <div class="weather-info">
            <div class="weather-icon">
                <img src="images/weather/${svgFileName}" alt="${description}" width="100" height="100">
            </div>
            <div class="weather-data">
                <p class="temp">${temperature}°C</p>
                <p class="description">${description}</p>
            </div>
            <div class="weather-details">
                <p>Humidity: ${humidity}%</p>
                <p>Wind: ${windSpeed} m/s</p>
                <p>High: ${highTemp}°C</p>
                <p>Low: ${lowTemp}°C</p>
                <p>Sunrise: ${sunriseTime}</p>
                <p>Sunset: ${sunsetTime}</p>
            </div>
        </div>
    `;
    }
    getWeatherData();
    hamburgerButton.addEventListener("click", () => {
        mainNav.classList.toggle("active");
    });

});
