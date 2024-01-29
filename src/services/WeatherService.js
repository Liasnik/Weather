import api from '../axios'

export class WeatherService {
  static getCurrentWeather(city) {
    return api.get(`/weather?q=${city}&lang=ua`)
  }
}

export function getForecast(city) {
  return api.get(`/forecast?q=${city}&lang=ua`)
}
