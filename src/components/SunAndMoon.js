import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'

// need a date for API url
const newDate = moment().format('DDmmYYYY')


class SunAndMoon extends React.Component {

  constructor() {
    super()
    this.state = {
      data: {
        sunrise: '',
        sunset: '',
        solar_noon: '',
        day_length: '',
        moonrise: '',
        moonset: ''
      },
      moonData: [
        {
          Moon: [],
          Phase: ''
        }
      ]
    }
  }


  componentDidMount() {
    // passing info that we will need for new API from prev page
    const { lat, lon } = this.props.match.params
    console.log(lat)
    console.log(lon)

    axios.get(`https://api.ipgeolocation.io/astronomy?apiKey=c75530c7c6e2481ea5f88f9d6929c43e&lat=${lat}&long=${lon}`)
      .then(resp => this.setState({ data: resp.data }))
      .catch(err => this.setState({ errors: err.response.data.errors }))

    axios.get(`http://api.farmsense.net/v1/moonphases/?d=${newDate}`)
      .then(res => this.setState({ moonData: res.data }))
  }



  render() {
    console.log(newDate)
    console.log(this.state.data)
    console.log(this.state.moonData)
    return <div className="Section" id="moonPage">
      <div className="container" id="moonContainer">
        <div className="title is-size-1-mobile" id="home-title">SUN & MOON </div>
        <div className="title">
          <p>Sunrise: {this.state.data.sunrise}</p>
          <p>Sunset: {this.state.data.sunset}</p>
          <p>Day Length: {this.state.data.day_length}</p>
          <p>Moonrise: {this.state.data.moonrise}</p>
          <p>Moonset: {this.state.data.moonset}</p>
          <p>Moon Phase: {this.state.moonData.map(moon => moon.Phase)}</p>
          <p>Moon Type: {this.state.moonData.map(moon => moon.Moon)}</p>
          <div className="moonAndSun columns">
            <div className="moon"></div>
            <div className="sun"></div>
          </div>
        </div>

        <Link className="button" id="sunMoonButton" to={'/horoscope'}> Horoscope </Link>
        {/* Home needed here or in Nav bar?  */}
        <Link className="button" id="sunMoonButton" to={'/'}> HOME </Link>
      </div>
    </div>

  }

}

export default SunAndMoon