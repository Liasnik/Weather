import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  weather: {
    timezone: 7200,
    id: 3163858,
    name: 'Вберіть місто в меню',
    cod: 200,
    coord: {
      lon: 10.99,
      lat: 44.34,
    },
    weather: [
      {
        id: 501,
        main: 'Rain',
        description: 'невідомо',
        icon: 'unknown',
      },
    ],
    base: 'stations',
    main: {
      temp: 0,
      feels_like: 298.74,
      temp_min: 297.56,
      temp_max: 300.05,
      pressure: 1015,
      humidity: 64,
      sea_level: 1015,
      grnd_level: 933,
    },
    visibility: 10000,
    wind: {
      speed: 0.62,
      deg: 349,
      gust: 1.18,
    },
    rain: {
      '1h': 3.16,
    },
    clouds: {
      all: 100,
    },
    dt: new Date() / 1000,
    sys: {
      type: 2,
      id: 2075663,
      country: '',
      sunrise: 1661834187,
      sunset: 1661882248,
    },
  },
  isLoading: false,
  response: {
    status: 0,
    message: '',
  },
}

export const currentWeatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchCurrentWeather(state) {
      state.isLoading = true
      // console.log('%cfetchCurrentWeather started', 'color: yellow')
    },
    fetchCurrentWeatherSuccess(state, action) {
      state.isLoading = false
      state.weather = action.payload.data
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      }
      console.log('%cfetchCurrentWeatherSuccess', 'color: pink', state.weather)
    },
    fetchCurrentWeatherError(state, action) {
      state.isLoading = false
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      }
      // console.log('%cfetchCurrentWeatherError', 'color: red', state.response)
    },
  },
})

export default currentWeatherSlice.reducer
