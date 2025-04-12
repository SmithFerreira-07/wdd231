export const OPENWEATHER_KEY = '98e597a751f6f73736a3f445f8e52ec6'; 
export const STORMGLASS_KEY = 'YOUR_STORMGLASS_API_KEY'; 

export const DEFAULT_LOCATION = {
  name: 'Malibu Beach',
  lat: 34.0259,
  lng: -118.7798
};

export let useMetric = false;

export function setUseMetric(value) {
  useMetric = value;
}