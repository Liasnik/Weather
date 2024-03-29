import React from 'react'
import styles from './header.module.scss'
import { useSelector } from 'react-redux'
import { IconsWhiteSelector } from './IconWhiteSelector'

const Header = () => {
  const data = useSelector((state) => state.currentWeather.weather)

  const d = new Date(data.dt * 1000)

  const date = d.getDate().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const year = d.getFullYear().toString() //

  const formattedDate = `${date}.${month}.${year}`

  const day = d.toLocaleString('default', { weekday: 'long' })

  const time = d.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const description = data.weather[0].description

  return (
    <div className={styles.header}>
      <div className={styles.city_time}>
        <div className={styles.city_date}>
          <h3>
            {data.name} {' ' + data.sys.country}
          </h3>
          <p>{formattedDate}</p>
        </div>
        <div className={styles.city_date}>
          <p>дані на {time}</p>
          <p>{day}</p>
        </div>
      </div>
      <div className={styles.main_block}>
        <div className={styles.block}>
          <h2>{data.main?.temp.toFixed(1)}&deg;</h2>
          <h3>
            {data.main?.temp_min.toFixed(1)}&deg; /{' '}
            {data.main?.temp_max.toFixed(1)}
            &deg; C
          </h3>
        </div>

        <div className={styles.block}>
          <>
            <IconsWhiteSelector id={data.weather[0].icon} />
            {/* <img
              src={`icons_gray/${data.weather[0].icon}.svg`}
              // src={icon2}
              alt={data.weather[0].main}
            /> */}
            <p>{description}</p>
          </>
        </div>
      </div>
      <div className={styles.text_block}></div>
    </div>
  )
}

export default Header
