import { DEFAULT_LOCATION, setUseMetric } from './modules/config.js';
import { SAMPLE_SPOTS_DATA, SAMPLE_EVENTS_DATA } from './modules/data.js';
import { fetchWeatherData, fetchForecastData, processForecastData, getLocationName } from './modules/weather.js';
import { createMockMarineData } from './modules/marine.js';
import { getUserLocation } from './modules/location.js';

import { 
  updateUI, 
  updateForecastUI, 
  populateSpots, 
  populateEvents, 
  setupMobileNavigation,
  updateTemperatureDisplays
} from './modules/ui.js';

async function loadLocationWeather(lat, lng, isUserInitiated = false) {
  try {
    document.querySelectorAll('.loading-indicator').forEach(el => {
      el.textContent = 'Loading data for your location...';
      el.style.display = 'block';
    });
    
    if (isUserInitiated) {
      const locationBtn = document.getElementById('get-location-btn');
      if (locationBtn) {
        locationBtn.textContent = '📍 Locating...';
        locationBtn.disabled = true;
      }
    }
    
    const locationInfo = await getLocationName(lat, lng);
    
    updateLocationDisplay(locationInfo.name, locationInfo.country);
    
    const weatherData = await fetchWeatherData(lat, lng);
    const marineData = createMockMarineData();
    
    const forecastData = await fetchForecastData(lat, lng);
    const processedForecastData = processForecastData(forecastData);
    
    updateUI(weatherData, marineData);
    updateForecastUI(processedForecastData);
    
    return true;
  } catch (error) {
    console.error('Error loading location weather:', error);
    if (isUserInitiated) {
      alert('Unable to get weather for your location. Please try again or search for a specific location.');
    }
    return false;
  } finally {
    if (isUserInitiated) {
      const locationBtn = document.getElementById('get-location-btn');
      if (locationBtn) {
        locationBtn.textContent = '📍 Use My Location';
        locationBtn.disabled = false;
      }
    }
  }
}

function updateLocationDisplay(locationName, countryName = '') {
  let displayText = `Weather for: ${locationName}`;
  if (countryName) {
    displayText += `, ${countryName}`;
  }
  
  let locationDisplay = document.querySelector('.current-location-display');
  
  if (!locationDisplay) {
    locationDisplay = document.createElement('div');
    locationDisplay.className = 'current-location-display';
    
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
      searchBox.insertAdjacentElement('afterend', locationDisplay);
    }
  }
  
  locationDisplay.textContent = displayText;
}

async function tryUseUserLocation(isUserInitiated = false) {
  try {
    const coords = await getUserLocation();
    console.log('Got user location:', coords);
    
    const success = await loadLocationWeather(coords.lat, coords.lng, isUserInitiated);
    return success;
  } catch (error) {
    console.warn('Could not use geolocation, falling back to default location:', error);
    if (isUserInitiated) {
      alert('Could not access your location. Please make sure you\'ve granted location permission or try searching for a location instead.');
    }
    return false;
  }
}

async function loadDefaultLocationData() {
  console.log('Using default location data');
  
  try {
    updateLocationDisplay(DEFAULT_LOCATION.name);
    
    return await loadLocationWeather(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng);
  } catch (error) {
    console.error('Error loading default location data:', error);
    handleLoadingError();
    return false;
  }
}

function setupEventListeners() {
  const searchBox = document.querySelector('.search-box input');
  const searchButton = document.querySelector('.search-box button');
  
  if (searchButton && searchBox) {
    searchButton.addEventListener('click', async () => {
      const searchQuery = searchBox.value.trim();
      if (searchQuery) {
        alert('Search functionality would convert "' + searchQuery + '" to coordinates and fetch data');
      }
    });
  }

  const tempUnitSwitch = document.getElementById('temp-unit-switch');
  if (tempUnitSwitch) {
    tempUnitSwitch.addEventListener('change', function() {
      setUseMetric(this.checked);
      updateTemperatureDisplays();
    });
  }
  
  const locationBtn = document.getElementById('get-location-btn');
  if (locationBtn) {
    locationBtn.addEventListener('click', () => tryUseUserLocation(true));
  }
}

function handleLoadingError() {
  if (!document.querySelector('.global-error')) {
    document.body.innerHTML += `
      <div class="global-error">
        <h3>Sorry, we're having trouble loading data</h3>
        <p>Please try refreshing the page. If the problem persists, check your internet connection.</p>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    setupMobileNavigation();
    
    setupEventListeners();
    
    const userLocationSuccess = await tryUseUserLocation();
    
    if (!userLocationSuccess) {
      await loadDefaultLocationData();
    }
    
    populateSpots(SAMPLE_SPOTS_DATA);
    populateEvents(SAMPLE_EVENTS_DATA);
  } catch (error) {
    console.error('Error initializing app:', error);
    handleLoadingError();
  }
});