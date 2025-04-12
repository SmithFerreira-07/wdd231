import { STORMGLASS_KEY } from './config.js';
import { formatWaveHeight, getWindDirection } from './utilities.js';

async function callStormglassAPI(endpoint, params) {
  try {
    const paramString = new URLSearchParams(params).toString();
    const response = await fetch(
      `https://api.stormglass.io/v2/${endpoint}?${paramString}`,
      {
        headers: {
          'Authorization': STORMGLASS_KEY
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Stormglass API error: ${response.status} for endpoint ${endpoint}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error calling Stormglass API (${endpoint}):`, error);
    return null;
  }
}

export async function fetchMarineData(lat, lng) {
  try {
    const now = new Date();
    const endTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    const startStr = now.toISOString();
    const endStr = endTime.toISOString();
    
    const tideParams = {
      lat: lat,
      lng: lng,
      start: startStr,
      end: endStr
    };
    
    const marineParams = {
      lat: lat,
      lng: lng,
      params: 'waveHeight,windSpeed,windDirection',
      source: 'noaa'
    };
    
    const tideData = await callStormglassAPI('tide/extremes/point', tideParams);
    const waveWindData = await callStormglassAPI('weather/point', marineParams);
    
    if (!tideData || !waveWindData) {
      throw new Error('Failed to fetch complete marine data');
    }
    
    return {
      tide: tideData,
      marine: waveWindData
    };
  } catch (error) {
    console.error('Error fetching marine data:', error);
    return null;
  }
}

export function getTideStatus(tideData) {
  if (!tideData || !tideData.data || tideData.data.length === 0) {
    return { status: 'Unknown', nextTime: 'Unknown' };
  }
  
  const now = new Date();
  const nextTide = tideData.data.find(tide => new Date(tide.time) > now);
  
  if (!nextTide) {
    return { status: 'Unknown', nextTime: 'Unknown' };
  }
  
  const isRising = nextTide.type === 'high';
  const nextTime = new Date(nextTide.time);
  const formattedTime = nextTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });
  
  return {
    status: isRising ? 'Rising' : 'Falling',
    nextTime: `Next ${nextTide.type === 'high' ? 'High' : 'Low'}: ${formattedTime}`
  };
}

export function createMockMarineData() {
  return {
    tide: {
      data: [
        { type: 'high', time: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString() }
      ]
    },
    marine: {
      hours: [
        { 
          waveHeight: { noaa: 1.2 }, 
          windSpeed: { noaa: 4.5 },
          windDirection: { noaa: 280 } 
        }
      ]
    }
  };
}