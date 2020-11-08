import React, { Component } from 'react'

import '../sass/style.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
      error: '',
      currentWeather: [],
      forecastWeather: []
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSearch = (e) => {
    if(e.key === 'Enter' && e.target.value !== '') {
      this.setState({error: '', currentWeather: [], forecastWeather: [], currentWeatherIsLoading: true});
      getCurrentData(this.state.query).then(data => {
        if(data.cod === "404") {
          const error = {
            message: 'City not found: '+this.state.query
          }
          this.setState({error: error, query: '', currentWeatherIsLoading: false});
        }
        if(data.cod === 200) {
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
          this.setState({query: '', currentWeather: currentWeather, currentWeatherIsLoading: false, forecastWeatherIsLoading: true});
          getForecastData(currentWeather.lat,currentWeather.long).then(data => {
            const forecastWeather = {
              list: data.daily
            }
            this.setState({forecastWeather: forecastWeather, forecastWeatherIsLoading: false});
          })
        }
      })
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({query: e.target.value});
  }

  render() {
    const { currentWeatherIsLoading, forecastWeatherIsLoading, currentWeather, forecastWeather, query, error } = this.state;
    return (
      <main className="container">
        <header className="header">
          <h1>Weather Forecast</h1>
            <div className="search-input">
              <FontAwesomeIcon icon={faSearch} />
              <input id="search" type="text" placeholder="Search by city" value={query} onChange={this.handleChange} onKeyPress={this.handleSearch}/>
            </div>
        </header>
        {
          error && <p>{error.message}</p> 
        }
        {
          currentWeatherIsLoading ? <p>Loading...</p> : 
          currentWeather.length !== 0 && 
          <section className="current-weather">
            <header className="section-header">
              <h2 className="section-title">Today</h2>
            </header>
            <CurrentWeather data={currentWeather} />
          </section>
        }
        {
          forecastWeatherIsLoading ? <p>Loading...</p> : 
          forecastWeather.length !== 0 && 
          <section className="forecast-weather">
            <header className="section-header">
              <h2 className="section-title">5 days forecast</h2>
            </header>
            <ForecastWeather data={forecastWeather}/>
          </section>
        }
      </main>
    )
  }
}
