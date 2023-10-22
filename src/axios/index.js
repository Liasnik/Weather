import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

// interceptor это middleware
api.interceptors.request.use((config) => {
  config.url =
    config.url +
    '&appid=' +
    process.env.REACT_APP_WEATHER_API_KEY +
    '&units=metric'
  return config
})

export default api
