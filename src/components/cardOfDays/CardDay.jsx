import styles from './days.module.scss'

const CardDay = ({ data }) => {
  const date = new Date(data.dt * 1000)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const time = `${hours}:${minutes}`

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  // const year = date.getFullYear().toString()

  const formattedDate = `${day}.${month}`

  return (
    <div className={styles.card}>
      <h3>{formattedDate}</h3>
      <h2>{time}</h2>
      <img
        src={`icons/${data.weather[0].icon}.svg`}
        alt={data.weather[0].main}
      />
      <h2>{data.main?.temp.toFixed(1)}&deg;c</h2>

      <h3>{data.weather[0].main}</h3>
    </div>
  )
}

export default CardDay
