import { IconsWhiteSelector } from './IconWhiteSelector'
import styles from './detailsForDay.module.scss'

const DetailsForDay = ({ data, time, formattedDate }) => {
  return (
    <div className={styles.detailsForDayWrapper}>
      <div className={styles.blur}></div>
      <div className={styles.detailsForDay}>
        {/* <h2>{data.dt_txt}</h2> */}
        <div className={styles.main}>
          <div className={styles.date}>
            <h2>
              {formattedDate} {time}
            </h2>
          </div>
          <IconsWhiteSelector id={data.weather[0].icon} />
          {/* <img
          src={`icons/${data.weather[0].icon}.svg`}
          alt={data.weather[0].main}
        /> */}
          <div className={styles.temp}>
            <h1>{data.main?.temp.toFixed(1)}&deg;c</h1>
          </div>
        </div>
        <div className={styles.description}>
          <h2>Відчувається як: {Math.round(data.main?.feels_like)}&deg;c</h2>
          <h2>
            min/max: {data.main?.temp_min.toFixed(1)}&deg; /{' '}
            {data.main?.temp_max.toFixed(1)}&deg;c
          </h2>
          <h2>описяння: {data.weather[0].description}</h2>
          <h2> вологість: {data.main?.humidity}%</h2>
          <h2>тиск: {data.main?.pressure}гПа</h2>
        </div>
      </div>
    </div>
  )
}

export default DetailsForDay
