import React from 'react'

const day = (dt) => {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Firday','Saturday'];

  return days[new Date(dt * 1000).getDay()];
}

const ForecastWeather = (props) => {
  
  return (
    <div className="forecast-daily-list">
      {props.data.list.slice(1,6).map((data,index) => 
        <div className="card" key={index}>
          <div className="day-name">{day(data.dt)}</div>
          <div className="weather-icon"><img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].main}/></div>
          <div className="weather">{data.weather[0].main}</div>
          <div className="temp"><span className="temp-day">{Math.round(data.temp.day)}&deg;C</span> <span className="temp-eve">{Math.round(data.temp.eve)}&deg;C</span></div>
        </div>
      )}
    </div>
  )
}

export default ForecastWeather;
