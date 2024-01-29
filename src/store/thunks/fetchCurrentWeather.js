import { createAsyncThunk } from '@reduxjs/toolkit'
import { WeatherService } from '../../services/WeatherService'
import { currentWeatherSlice } from '../currentWeatherSlice'

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrentWeather',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(currentWeatherSlice.actions.fetchCurrentWeather())

      const response = await WeatherService.getCurrentWeather(payload)

      if (response.status === 200) {
        dispatch(
          currentWeatherSlice.actions.fetchCurrentWeatherSuccess(response)
        )
        return response.data
      } else {
        dispatch(currentWeatherSlice.actions.fetchCurrentWeatherError(response))
        return rejectWithValue(response)
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
