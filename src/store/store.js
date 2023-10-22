import { configureStore } from '@reduxjs/toolkit'
import currentWeatherSliceReducer from './currentWeatherSlice'
import forecastWeatherSlice from './forecastWeatherSlice'

export const store = configureStore({
  reducer: {
    currentWeather: currentWeatherSliceReducer,
    forecastWeather: forecastWeatherSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
