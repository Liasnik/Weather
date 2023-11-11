import styles from './days.module.scss'
import DetailsForDay from '../DetailsForDay'
import { useState } from 'react'
import { IconsWhiteSelector } from '../IconWhiteSelector'

const CardDay = ({ data }) => {
  const [open, setOpen] = useState(false)

  const date = new Date(data.dt * 1000)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const time = `${hours}:${minutes}`

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  // const year = date.getFullYear().toString()
  const formattedDate = `${day}.${month}`

  const dayOfWeek = date.toLocaleString('default', { weekday: 'long' })

  function openDetails() {
    setOpen(open === false ? true : false)
    document.body.classList.toggle('no-scroll')
  }

  return (
    <div className={styles.card} onClick={openDetails}>
      <h3>{formattedDate}</h3>
      <h5>{dayOfWeek}</h5>
      <h2>{time}</h2>
      <IconsWhiteSelector id={data.weather[0].icon} />
      {/* <img
        src={`icons/${data.weather[0].icon}.svg`}
        alt={data.weather[0].main}
      /> */}
      <h2>{data.main?.temp.toFixed(1)}&deg;c</h2>
      {/* <h3>{data.weather[0].main}</h3> */}
      {open && (
        <DetailsForDay
          data={data}
          time={time}
          formattedDate={formattedDate}
          dayOfWeek={dayOfWeek}
        />
      )}
    </div>
  )
}

export default CardDay
