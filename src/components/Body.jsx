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
      <p>Прогноз на наступні 4 дні</p>
      <div className={styles.clocks}>
        <Days forecastData={tomorrow} />
      </div>

      <div className={styles.sun}>
        <div className={styles.sunrise}>
          <div className={styles.sun_block}>
            <div>Схід {timeSunrise}</div>
          </div>
          <div className={styles.sun_block}>
            <div>Захід {timeSunset}</div>
          </div>
        </div>
        <div className={styles.svg}>
          <SvgSelector id="04n" />
        </div>
        <div className={styles.sun_icon}>
          <img src={sun} alt={'sunrise'} />
        </div>
      </div>

      <div className={styles.optional_block}>
        <div className={styles.optional}>
          <div>{weather.main.pressure}</div>
          Тиск мм.рт.ст
        </div>
        <div className={styles.optional}>
          <div>{weather.main.humidity}</div>
          Вологість %
        </div>
        <div className={styles.optional}>
          <div>{weather.clouds.all}</div>
          Хмарність <span>%</span>
        </div>
      </div>

      <div className={styles.additional_block}>
        <div>
          <h2>Відчувається як</h2>
          <p>{Math.round(weather.main.feels_like)}&deg;C</p>
        </div>
        <div>
          <h2>Швидкість вітру</h2>
          <p>{weather.wind.speed}м/с</p>
        </div>
        <div>
          <h2>Пориви вітру</h2>
          <p>{weather.wind.gust}м/с</p>
        </div>
        <div>
          <h2>Видимість</h2>
          <p>{weather.visibility}м</p>
        </div>
        <div>
          <h2>Повітря</h2>
          <p>добре</p>
        </div>
      </div>
      {/* <div className={styles.button_wrapper}>
        <button></button>
        <button></button>
      </div> */}
      <h4>the Weather</h4>
    </div>
  )
}

export default Body
