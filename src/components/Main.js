import React, { Component } from 'react'

import '../sass/style.scss'

import { getCurrentData } from '../api/fetchCurrentData.js';
import { getForecastData } from '../api/fetchForecastData.js';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeatherIsLoading: false,
      forecastWeatherIsLoading: false,
      query: '',
      currentWeather: [],
      forecastWeather: []
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSearch = (e) => {
    if(e.key === 'Enter') {
      this.setState({currentWeatherIsLoading: true});
      getCurrentData(this.state.query).then(data => {
        const currentWeather = {
          city: data.name,
          lat: data.coord.lat,
          long: data.coord.lon,
          temp: data.main.temp,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          windSpeed: data.wind.speed,
          windDeg: data.wind.deg,
          weather: data.weather[0].main,
          icon: data.weather[0].icon
        }
        this.setState({currentWeather: currentWeather, currentWeatherIsLoading: false});
        getForecastData(currentWeather.lat,currentWeather.long).then(data => {
          const forecastWeather = {
            list: data.daily
          }
          this.setState({forecastWeather: forecastWeather, forecastWeatherIsLoading: false});
        })
      })
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({query: e.target.value})
  }

  render() {
    const { currentWeatherIsLoading, forecastWeatherIsLoading, currentWeather, forecastWeather, query } = this.state;
    return (
      <main className="container">
        <header className="header">
          <h1>Weather Forecast</h1>
          <input id="search" type="text" value={query} onChange={this.handleChange} onKeyPress={this.handleSearch}/>
        </header>
        {
          currentWeatherIsLoading ? <p>Loading...</p> : 
          currentWeather.length !== 0 && 
          <div className="current-weather">
            <CurrentWeather data={currentWeather} />
          </div>
        }
        {
          forecastWeatherIsLoading ? <p>Loading...</p> : 
          forecastWeather.length !== 0 && 
          <div className="forecast-weather">
            <ForecastWeather data={forecastWeather}/>
          </div>
        }
      </main>
    )
  }
}
