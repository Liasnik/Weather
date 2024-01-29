import React, { useEffect, useRef, useState } from 'react'
import styles from './menu.module.scss'
import { useSelector } from 'react-redux'

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
    value: 'Paris',
    label: 'Париж',
    id: 6,
  },
  {
    value: 'London',
    label: 'Лондон',
    id: 4,
  },
  {
    value: 'Berlin',
    label: 'Берлін',
    id: 9,
  },

  {
    value: 'New York',
    label: 'Нью Йорк',
    id: 3,
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

const Menu = ({ setSelectCity, setUpdate }) => {
  const { weather, isLoading } = useSelector((state) => state.currentWeather)
  const [scrolled, setScrolled] = useState(false)
  const [addLocation, setAddLocation] = useState(false)
  const [menu, setMenu] = useState(false)
  const [city, setCity] = useState('')
  const [cities, setCities] = useState(
    () => storageCities('cities') || initialCities
  )

  const selectedRef = useRef(null)
  const [labelCity, setLabelCity] = useState('')

  const d = new Date(weather.dt * 1000)
  const time = d.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const handleUpdate = () => {
    setUpdate((prev) => !prev)
  }

  useEffect(() => {
    const localStorageCity = storageCities('city')

    const targetCity = cities.find((city) => city.value === localStorageCity)

    const newCityValue = targetCity?.value ?? cities[0].value

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
    setAddLocation(false)
    document.body.classList.toggle('no-scroll')
  }

  const handleChange = (e) => {
    e.preventDefault()
    const valueCity = e.target.value
    setSelectCity(valueCity)

    const targetCity = cities.find((city) => city.value === valueCity)

    selectedRef.current = targetCity

    setLabelCity(targetCity.label)

    setLocalStorage('city', valueCity)
  }

  const handleAddCities = (e) => {
    e.stopPropagation()
    e.preventDefault()
    city &&
      setCities([
        ...cities,
        {
          value: city.trim(),
          label: city.trim(),
          id: Date.now(),
        },
      ])

    setCity('')
  }

  const handleDeleteCities = (e) => {
    e.stopPropagation()
    if (city) {
      const filteredCities = cities.filter(
        (item) =>
          item.value.toLocaleLowerCase() !== city.toLocaleLowerCase().trim()
      )
      setCities(filteredCities)

      setCity('')
    }

    if (city === selectedRef.current?.value) {
      localStorage.removeItem('city')
    }
  }

  const handleAddLocation = () => {
    setAddLocation((pre) => !pre)
  }

  const menuStyle = menu ? [styles.menu_open, null] : [styles.menu, styles.menu]

  const styleAddButton = city ? styles.add : styles.button_disabled

  const styleDeleteButton = city ? styles.buttonDelete : styles.button_disabled

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const headerClasses = scrolled
    ? `${styles.header} ${styles.scroll}`
    : styles.header

  return (
    <div className={headerClasses}>
      <div
        className={styles.label_city}
        onClick={handleUpdate}
        title="оновити дані погоди"
      >
        <h3>{labelCity}</h3>
      </div>
      <div onClick={toggleMenu} className={styles.menu_wrapper}>
        <div className={menuStyle[0]}></div>
        <div className={menuStyle[1]}></div>
        <div className={menuStyle[1]}></div>
      </div>
      {menu && (
        <>
          <div className={styles.popup}>
            <div className={styles.blur} onClick={toggleMenu}></div>
            <div className={styles.modal}>
              <div className={styles.selectBlock}>
                <div className={styles.menu_close} onClick={toggleMenu}></div>

                <label htmlFor="select">
                  <div className={styles.label}>Вибрати місто</div>
                  <div className={styles.select}>
                    <select name="city" id="select" onChange={handleChange}>
                      {cities.map((item) => (
                        <option value={item.value} key={item.id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
                <div className={styles.update} onClick={handleUpdate}>
                  <p>Оновити дані {isLoading ? 'Load...' : time}</p>
                </div>
              </div>
              <div className={styles.bottomBlock}>
                <form>
                  <label>
                    <div
                      className={styles.add_location}
                      onClick={handleAddLocation}
                    >
                      <p>Додати / Видалити</p>
                    </div>
                    {addLocation && (
                      <input
                        type="text"
                        onChange={(e) => {
                          e.stopPropagation()
                          setCity(e.target.value)
                        }}
                        value={city}
                        placeholder="Введіть назву"
                        required
                      />
                    )}
                  </label>
                  {addLocation && (
                    <div className={styles.buttons_block}>
                      <button
                        className={styleAddButton}
                        disabled={!city && true}
                        onClick={handleAddCities}
                      >
                        Додати
                      </button>
                      <button
                        className={styleDeleteButton}
                        type="button"
                        onClick={handleDeleteCities}
                      >
                        Видалити
                      </button>
                    </div>
                  )}
                </form>
                {addLocation && (
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
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Menu
