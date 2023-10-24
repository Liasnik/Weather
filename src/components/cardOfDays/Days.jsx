import CardDay from './CardDay'
import styles from './days.module.scss'

const Days = ({ forecastData }) => {
  // console.log(forecastData)

  return (
    <div className={styles.day}>
      {forecastData?.map((el, ind) => (
        <CardDay data={el} key={ind} />
      ))}
    </div>
  )
}

export default Days
