import './App.scss'
import Menu from './components/Menu'
import Header from './components/Header'
import Body from './components/Body'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchCurrentWeather } from './store/thunks/fetchCurrentWeather'
import { fetchForecast } from './store/thunks/fetchForecast'

function storageCity(name) {
  const item = localStorage.getItem(name)
  if (item) {
    return JSON.parse(item)
  }
}

function App() {
  const dispatch = useDispatch()
  const [city, setSelectCity] = useState(storageCity('city'))
  const [update, setUpdate] = useState(storageCity(false))

  useEffect(() => {
    if (city) {
      dispatch(fetchCurrentWeather(city))
      dispatch(fetchForecast(city))
    }
  }, [city, update, dispatch])

  return (
    <div className="App">
      <Menu setSelectCity={setSelectCity} setUpdate={setUpdate} />
      <Header />
      <Body />
    </div>
  )
}

export default App
