import { createAsyncThunk } from '@reduxjs/toolkit'
import { forecastWeatherSlice } from '../forecastWeatherSlice'
import { getForecast } from '../../services/WeatherService'

export const fetchForecast = createAsyncThunk(
  'forecast/fetchForecast',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(forecastWeatherSlice.actions.fetchForecast())

      const response = await getForecast(payload)

      if (response.status === 200) {
        // console.log(response)
        // console.log(forecastWeatherSlice.actions)
        dispatch(forecastWeatherSlice.actions.fetchForecastSuccess(response))
        return response.data
      } else {
        dispatch(forecastWeatherSlice.actions.fetchForecastError(response))
        return rejectWithValue(response)
      }
    } catch (error) {
      // console.log('%cError: ', 'color: blue', error)
      return rejectWithValue(error)
    }
  }
)
