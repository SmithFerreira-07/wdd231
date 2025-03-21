document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
document.addEventListener("DOMContentLoaded", () => {
    const hamburgerButton = document.getElementById("mobileMenu");
    const mainNav = document.getElementById("navigation");
    const weatherContainer = document.getElementById("weatherNow");
    const API_KEY = "af1fb6099766ced58ea106b357b8fd94";
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

    hamburgerButton.addEventListener("click", () => {
        mainNav.classList.toggle("active");
    });

});