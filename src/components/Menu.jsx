import React, { useEffect, useState } from 'react'
import styles from './menu.module.scss'
// import Select from 'react-select'

const initialCities = [
  {
    value: '',
    label: '',
    id: 0,
  },
  {
    value: 'Kyiv',
    label: 'Київ',
    id: 1,
  },

  {
    value: 'New York',
    label: 'Нью Йорк',
    id: 3,
  },
  {
    value: 'Miami',
    label: 'Майамі',
    id: 4,
  },
  {
    value: 'Tel-Aviv',
    label: 'Тель-Авів',
    id: 6,
  },
  {
    value: 'Sharm El-Sheikh',
    label: 'Шарм-Ель-Шейх',
    id: 8,
  },
]

function storageCities(name) {
  return JSON.parse(localStorage.getItem(name))
}

const Menu = ({ setSelectCity }) => {
  const [menu, setMenu] = useState(false)
  const [city, setCity] = useState('')
  const [cities, setCities] = useState(storageCities('cities') || initialCities)
  const [labelCity, setLabelCity] = useState('')
  // const [labelCity, setLabelCity] = useState(
  //   cities.find((city) => city.value === inputCity)?.label ?? cities[0].label
  // )

  // const selectStyles = {
  //   control: (styles) => ({
  //     ...styles,
  //     backgroundColor: 'rgb(155, 155, 155) ',
  //     // color: 'rgb(155, 55, 55, 0,2)',
  //     width: '200px',
  //     height: '37px',
  //     border: 'none',
  //     borderRadius: '10px',
  //     outline: 'none',
  //   }),
  //   input: (styles) => ({
  //     ...styles,
  //     color: 'rgb(5, 5, 241) !important',
  //   }),
  //   option: (styles) => ({
  //     ...styles,
  //     backgroundColor: 'rgb(155, 155, 155)',
  //     borderBottom: 'darkgray 1px solid',
  //     padding: '15px',
  //     cursor: 'pointer',
  //   }),
  // }

  // console.log(city)
  // console.log(cities)
  // console.log(labelCity)

  useEffect(() => {
    const localStorageCity = storageCities('city')
    // console.log(localStorageCity)

    const targetCity = cities.find((city) => city.value === localStorageCity)
    // console.log(targetCity)

    const newCityValue = targetCity?.value ?? cities[0].value
    // console.log(newCityValue)

    const newCityLabel = targetCity?.label ?? cities[0].label
    setLabelCity(newCityLabel)

    setSelectCity(newCityValue)

    setLocalStorage('city', newCityValue)
  }, [cities, setSelectCity])

  function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  useEffect(() => {
    setLocalStorage('cities', cities)
    // eslint-disable-next-line
  }, [cities])

  const toggleMenu = () => {
    setMenu((prev) => !prev)
  }

  const handleChange = (e) => {
    e.preventDefault()
    const valueCity = e.target.value
    setSelectCity(valueCity)

    const targetCity = cities.find((city) => city.value === valueCity)
    // console.log(targetCity)

    setLabelCity(targetCity.label)
    // console.log(targetCity.label)

    setLocalStorage('city', valueCity)
  }

  const handlerAddCities = (e) => {
    e.stopPropagation()
    e.preventDefault()
    city &&
      setCities([
        ...cities,
        {
          value: city,
          label: city,
          id: Date.now(),
        },
      ])

    // setSelectCity(city)
    setCity('')
  }

  const handlerDeleteCities = (e) => {
    e.stopPropagation()
    const filteredCities = cities.filter((item) => item.value !== city)
    setCities(filteredCities)
    setCity('')
    localStorage.removeItem('city')
  }

  let style = []
  if (!menu) {
    style = [styles.menu, styles.menu]
  } else style = [styles.menu_open, null]

  let styleAddButton
  if (city) {
    styleAddButton = styles.add
  } else styleAddButton = styles.button_disabled

  let styleDeleteButton
  if (city) {
    styleDeleteButton = styles.buttonDelete
  } else styleDeleteButton = styles.button_disabled

  return (
    <div className={styles.header}>
      <div>
        <h3>{labelCity}</h3>
      </div>
      {menu && (
        <>
          <div className={styles.popup}>
            <div className={styles.blur} onClick={toggleMenu}></div>
            <div className={styles.modal}>
              <div className={styles.selectBlock}>
                <p>Вибрати місто</p>
                {/* <Select options={initialCities} styles={selectStyles} /> */}
                <div className={styles.select}>
                  <select name="city" id="" onChange={handleChange}>
                    {cities.map((item) => (
                      <option value={item.value} key={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.bottomBlock}>
                <form>
                  <label>
                    <p>Додати локацію</p>
                    <input
                      type="text"
                      onChange={(e) => {
                        e.stopPropagation()
                        setCity(e.target.value)
                      }}
                      value={city}
                      placeholder="Введіть назву"
                    />
                  </label>
                  <div className={styles.buttons_block}>
                    <button
                      className={styleAddButton}
                      disabled={!city && true}
                      onClick={handlerAddCities}
                    >
                      Додати
                    </button>
                    <button
                      className={styleDeleteButton}
                      type="button"
                      onClick={handlerDeleteCities}
                    >
                      Видалити
                    </button>
                  </div>
                </form>
                <form className={styles.reset_form}>
                  <button
                    type="submit"
                    className={styles.reset}
                    onClick={() => {
                      localStorage.removeItem('cities')
                    }}
                  >
                    res
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      <div onClick={toggleMenu} className={styles.menu_wrapper}>
        <div className={style[0]}></div>
        <div className={style[1]}></div>
        <div className={style[1]}></div>
      </div>
    </div>
  )
}

export default Menu
