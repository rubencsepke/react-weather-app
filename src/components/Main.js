import React, { Component } from 'react'

import '../sass/style.scss'

import { getCurrentData } from '../api/fetchCurrentData.js';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      query: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSearch = (e) => {
    e.key === 'Enter' && getCurrentData(this.state.query);
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({query: e.target.value})
  }

  render() {
    return (
      <main className="container">
        <header className="header">
          <h1>Weather Forecast</h1>
          <input id="search" type="text" value={this.state.query} onChange={this.handleChange} onKeyPress={this.handleSearch}/>
        </header>
      </main>
    )
  }
}
