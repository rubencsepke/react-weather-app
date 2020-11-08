import React from 'react'

import '../sass/cards.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faCompressAlt, faWind } from '@fortawesome/free-solid-svg-icons';

const CurrentWeather = (props) => {
  return (
    <div className="current-weather-info">
      <div className="card current-weather-card">
        <div className="city-name"><strong>{props.data.city}</strong></div>
        <div className="weather-icon"><img src={`http://openweathermap.org/img/wn/${props.data.icon}@2x.png`} alt={props.data.weather}/></div>
        <div className="weather">{props.data.weather}</div>
        <div className="temp">{props.data.temp}&deg;C</div>
      </div>
      <div className="card current-info-card">
        <div className="info-row">
          <div className="info">
            <span className="info-title"><FontAwesomeIcon icon={faTint} /> Humidity</span>
            <b className="info-value">{props.data.humidity} %</b>
          </div>
          <div className="info">
            <span className="info-title"><FontAwesomeIcon icon={faCompressAlt} /> Pressure</span>
            <b className="info-value">{props.data.pressure} hpa</b>
          </div>
          <div className="info">
            <span className="info-title"><FontAwesomeIcon icon={faWind} /> Wind</span>
            <b className="info-value">{props.data.windSpeed} m/s</b>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather;
