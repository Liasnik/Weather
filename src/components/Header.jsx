import React from 'react'
import styles from './header.module.scss'
import { useSelector } from 'react-redux'

const Header = () => {
  const data = useSelector((state) => state.currentWeather.weather)

  const date = new Date(data.dt * 1000)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const time = `${hours}:${minutes}`

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString() //

  const formattedDate = `${day}.${month}.${year}`

  // const capitalize = (str) => str.toUpperCase()
  // const capitalize = (str) =>
  //   str.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase())

  const description = data.weather[0].description

  return (
    <div className={styles.header}>
      <div className={styles.city_time}>
        <h3>
          {data.name} {' ' + data.sys.country}
        </h3>
        <p>
          {formattedDate} погода на {time}
        </p>
      </div>
      <div className={styles.main_block}>
        <div className={styles.block}>
          <h2>{data.main?.temp.toFixed(1)}&deg;c</h2>
          <h3>
            {data.main?.temp_min.toFixed(1)}&deg; /{' '}
            {data.main?.temp_max.toFixed(1)}
            &deg; C
          </h3>
        </div>

        <div className={styles.block}>
          <>
            <img
              src={`icons/${data.weather[0].icon}.svg`}
              alt={data.weather[0].main}
            />
            <p>{description}</p>
          </>
        </div>
      </div>
      <div className={styles.text_block}></div>
    </div>
  )
}

export default Header
