import React, { Component } from 'react'

import '../sass/style.scss'

import { getCurrentData } from '../api/fetchCurrentData.js';
import CurrentWeather from './CurrentWeather';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      query: '',
      currentWeather: []
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSearch = (e) => {
    if(e.key === 'Enter') {
      this.setState({isLoading: true});
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
        this.setState({currentWeather: currentWeather, isLoading: false});
      })
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({query: e.target.value})
  }

  render() {
    const { isLoading, currentWeather, query } = this.state;
    return (
      <main className="container">
        <header className="header">
          <h1>Weather Forecast</h1>
          <input id="search" type="text" value={query} onChange={this.handleChange} onKeyPress={this.handleSearch}/>
        </header>
        {
          isLoading ? <p>Loading...</p> : 
          currentWeather.length !== 0 &&
          <div className="current-weather">
            <CurrentWeather data={currentWeather} />
          </div> 
        }
      </main>
    )
  }
}
