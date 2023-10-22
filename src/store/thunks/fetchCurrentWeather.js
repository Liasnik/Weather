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
        // console.log(response)
        dispatch(
          currentWeatherSlice.actions.fetchCurrentWeatherSuccess(response)
        )
        return response.data
      } else {
        dispatch(currentWeatherSlice.actions.fetchCurrentWeatherError(response))
        return rejectWithValue(response)
      }
    } catch (error) {
      // console.log('%cError: ', 'color: yellow', error)
      return rejectWithValue(error)
    }
  }
)

// Without createAsyncThunk

// export const fetchCurrentWeather = (payload) => async (dispatch) => {
//   try {
//     dispatch(currentWeatherSlice.actions.fetchCurrentWeather())

//     const response = await WeatherService.getCurrentWeather(payload)

//     if (response.status === 200) {
//       console.log(response.data)
//       dispatch(currentWeatherSlice.actions.fetchCurrentWeatherSuccess(response))
//     } else {
//       dispatch(currentWeatherSlice.actions.fetchCurrentWeatherError(response))
//       console.log(response)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }
