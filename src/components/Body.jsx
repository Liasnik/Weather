import { useSelector } from 'react-redux'
import styles from './body.module.scss'
import Days from './cardOfDays/Days'
import sunRise from './../icon/sunrise.svg'
import sunSet from './../icon/sunset.svg'
import { SvgSelector } from './SvgSelector'

// const weatherDate1 = [
//   {
//     time: '18:00',
//     main: {
//       temp: 7,
//     },
//     weather: [
//       {
//         icon: '02d',
//         main: 'Clouds',
//       },
//     ],
//   },
//   {
//     time: '20:00',
//     main: {
//       temp: 4.2,
//     },
//     weather: [
//       {
//         icon: '02n',
//         main: 'Clouds',
//       },
//     ],
//   },
//   {
//     time: '21:00',
//     main: {
//       temp: 5.4,
//     },
//     weather: [
//       {
//         icon: '03n',
//         main: 'Clouds',
//       },
//     ],
//   },
//   {
//     time: '22:00',
//     main: {
//       temp: 3.0,
//     },
//     weather: [
//       {
//         icon: '04n',
//         main: 'Clouds',
//       },
//     ],
//   },
//   {
//     time: '23:00',
//     main: {
//       temp: 4.4,
//     },
//     weather: [
//       {
//         icon: '04n',
//         main: 'Clouds',
//       },
//     ],
//   },
//   {
//     time: '06:00',
//     main: {
//       temp: 6.1,
//     },
//     weather: [
//       {
//         icon: '03n',
//         main: 'Clouds',
//       },
//     ],
//   },
//   {
//     time: '09:00',
//     main: {
//       temp: 7.0,
//     },
//     weather: [
//       {
//         icon: '01d',
//         main: 'Sun',
//       },
//     ],
//   },
//   {
//     time: '12:00',
//     main: {
//       temp: 8.8,
//     },
//     weather: [
//       {
//         icon: '02d',
//         main: 'Sun',
//       },
//     ],
//   },
// ]
// const weatherDate2 = [
//   {
//     time: '00:00',
//     main: {
//       temp: 4.2,
//     },
//     weather: [
//       {
//         icon: '04n',
//         main: 'Clouds',
//       },
//     ],
//   },
//   {
//     time: '03:00',
//     main: {
//       temp: 5.4,
//     },
//     weather: [
//       {
//         icon: '02n',
//         main: 'Clouds',
//       },
//     ],
//   },
//   {
//     time: '06:00',
//     main: {
//       temp: 6.1,
//     },
//     weather: [
//       {
//         icon: '03n',
//         main: 'Clouds',
//       },
//     ],
//   },
//   {
//     time: '09:00',
//     main: {
//       temp: 7.0,
//     },
//     weather: [
//       {
//         icon: '01d',
//         main: 'Sun',
//       },
//     ],
//   },
//   {
//     time: '12:00',
//     main: {
//       temp: 8.8,
//     },
//     weather: [
//       {
//         icon: '02d',
//         main: 'Sun',
//       },
//     ],
//   },
//   {
//     time: '18:00',
//     main: {
//       temp: 7,
//     },
//     weather: [
//       {
//         icon: '02d',
//         main: 'Clouds',
//       },
//     ],
//   },
//   {
//     time: '20:00',
//     main: {
//       temp: 4.2,
//     },
//     weather: [
//       {
//         icon: '02n',
//         main: 'Clouds',
//       },
//     ],
//   },
//   {
//     time: '21:00',
//     main: {
//       temp: 5.4,
//     },
//     weather: [
//       {
//         icon: '03n',
//         main: 'Clouds',
//       },
//     ],
//   },
// ]

const Body = () => {
  const { weather } = useSelector((state) => state.currentWeather)
  const { forecast } = useSelector((state) => state.forecastWeather)

  // console.log(weather)
  // console.log(forecast?.list)
  const today = forecast?.list?.slice(0, 9)
  const tomorrow = forecast?.list?.slice(8)

  const sunrise = new Date(weather.sys.sunrise * 1000)
  const hoursSunrise = sunrise.getHours().toString().padStart(2, '0')
  const minutesSunrise = sunrise.getMinutes().toString().padStart(2, '0')
  const timeSunrise = `${hoursSunrise}:${minutesSunrise}`

  const sunset = new Date(weather.sys.sunset * 1000)
  const hoursSunset = sunset.getHours().toString().padStart(2, '0')
  const minutesSunset = sunrise.getMinutes().toString().padStart(2, '0')
  const timeSunset = `${hoursSunset}:${minutesSunset}`

  const date = new Date()
  const hours = date.getHours()

  let sun
  if (hours < 12) {
    sun = sunRise
  } else if (hours >= 12 && hours <= 23) {
    sun = sunSet
  }

  return (
    <div className={styles.body}>
      <p>Прогноз на 24 години</p>
      <div className={styles.clocks}>
        <Days forecastData={today} />
      </div>
      <p>Прогноз на наступні 5 днів</p>
      <div className={styles.clocks}>
        <Days forecastData={tomorrow} />
      </div>
      <p>Додаткові дані на сьогодні</p>
      <div className={styles.sun}>
        <div className={styles.svg}>
          <SvgSelector id="04n" />
        </div>
        <div className={styles.sun_icon}>
          <img src={sun} alt={'sunrise'} />
        </div>
        <div className={styles.sunrise}>
          <div className={styles.sun_block}>
            <div>схід {timeSunrise}</div>
          </div>
          <div className={styles.sun_block}>
            <div>захід {timeSunset}</div>
          </div>
        </div>
      </div>
      <div className={styles.additional_block}>
        <div>
          <div
            style={{ display: 'flex', flexDirection: 'column', border: 'none' }}
          >
            <h2>t&deg;</h2>
            <h2>відчувається як</h2>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', border: 'none' }}
          >
            <p>{Math.round(weather.main.temp)}&deg;c</p>
            <p>{Math.round(weather.main.feels_like)}&deg;c</p>
          </div>
        </div>
        <div>
          <h2>швидкість вітру</h2>
          <p>{weather.wind.speed}м/с</p>
        </div>
        <div>
          <h2>пориви вітру</h2>
          <p>{weather.wind.gust}м/с</p>
        </div>
        <div>
          <h2>видимість</h2>
          <p>{weather.visibility}м</p>
        </div>
      </div>
      <div className={styles.optional_block}>
        <div className={styles.optional}>
          <div>{weather.main.pressure}</div>
          тиск мм.рт.ст
        </div>
        <div className={styles.optional}>
          <div>{weather.main.humidity}</div>
          вологість %
        </div>
        <div className={styles.optional}>
          <div>{weather.clouds.all}</div>
          хмарність <span>%</span>
        </div>
      </div>

      <p>Гео-дані, якщо комусь потрібно...</p>
      <div className={styles.additional_block}>
        <div>
          <h2>широта</h2>
          <p>{weather.coord.lat}</p>
        </div>
        <div>
          <h2>довгота</h2>
          <p>{weather.coord.lon}</p>
        </div>
      </div>
      <h4>AlexWeather</h4>
    </div>
  )
}

export default Body
