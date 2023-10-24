import d01 from './../icons_gray/01d.svg'
import n01 from './../icons_gray/01n.svg'
import d02 from './../icons_gray/02d.svg'
import n02 from './../icons_gray/02d.svg'
import d03 from './../icons_gray/03d.svg'
import n03 from './../icons_gray/03n.svg'
import d04 from './../icons_gray/04d.svg'
import n04 from './../icons_gray/04n.svg'
import d09 from './../icons_gray/09d.svg'
import n09 from './../icons_gray/09n.svg'
import d10 from './../icons_gray/10d.svg'
import n10 from './../icons_gray/10n.svg'
import d11 from './../icons_gray/11d.svg'
import n11 from './../icons_gray/11n.svg'
import d13 from './../icons_gray/13d.svg'
import n13 from './../icons_gray/13n.svg'
import d50 from './../icons_gray/50d.svg'
import n50 from './../icons_gray/50n.svg'
import unknown from './../icons_gray/unknown.svg'
import sunrise from './../icons_gray/sunrise.svg'
import sunset from './../icons_gray/sunset.svg'

export const IconsSelector = ({ id }) => {
  switch (id) {
    case '01d':
      return <img src={d01} alt="" />
    case '01n':
      return <img src={n01} alt="" />
    case '02d':
      return <img src={d02} alt="" />
    case '02n':
      return <img src={n02} alt="" />
    case '03d':
      return <img src={d03} alt="" />
    case '03n':
      return <img src={n03} alt="" />
    case '04d':
      return <img src={d04} alt="" />
    case '04n':
      return <img src={n04} alt="" />
    case '09d':
      return <img src={d09} alt="" />
    case '09n':
      return <img src={n09} alt="" />
    case '10d':
      return <img src={d10} alt="" />
    case '10n':
      return <img src={n10} alt="" />
    case '11d':
      return <img src={d11} alt="" />
    case '11n':
      return <img src={n11} alt="" />
    case '13d':
      return <img src={d13} alt="" />
    case '13n':
      return <img src={n13} alt="" />
    case '50d':
      return <img src={d50} alt="" />
    case '50n':
      return <img src={n50} alt="" />
    case 'unknown':
      return <img src={unknown} alt="" />
    case 'sunrise':
      return <img src={sunrise} alt="" />
    case 'sunset':
      return <img src={sunset} alt="" />

    default:
      return <img src={unknown} alt="" />
  }
}
