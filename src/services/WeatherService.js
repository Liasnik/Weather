import api from '../axios'

export class WeatherService {
  static getCurrentWeather(city) {
    return api.get(`/weather?q=${city}&lang=ua`)
    // return api.get(`/weather?lat=50.45&lon=30.5236`)
  }
}

export function getForecast(city) {
  return api.get(`/forecast?q=${city}&lang=ua`)
}
