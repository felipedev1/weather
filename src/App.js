/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React from 'react';
import { useState, useEffect } from 'react'
import './App.css';
import WeatherNow from './components/WeatherNow/WeatherNow'
import Forecast from './components//Forecast/Forecast'


// API URL: https://developer.accuweather.com/apis


const apiKey = 'PW3UZcSOAxeKcNm58tMzXGDufhOMFqox'
const language = 'pt-BR'

export default function App() {

  const [city, setCity] = useState('')
  const [cityKey, setCityKey] = useState()
  const [weather, setWeather] = useState()
  const [forecasts, setForecasts] = useState()
  const [metric, setMetric] = useState('C')

  useEffect(() => {
    setCityKey(localStorage.getItem("cityKey"))
    setCity(localStorage.getItem("cityName"))
    if (cityKey) {
      getWeatherNow()
      getForecast()
    }
  }, [cityKey])

  async function getWeather(e) {
    e.preventDefault()
    const urlLocale = `http://dataservice.accuweather.com/locations/v1/cities/search`
    const config = {
      params: {
        apikey: apiKey,
        q: city
      }
    }
    axios.get(urlLocale, config)
      .then(res => {
        localStorage.setItem("cityName", city)
        localStorage.setItem("cityKey", res.data[0].Key)
        setCityKey(res.data[0].Key)
      })
      .catch(err => console.log(err))
  }

  function getWeatherNow() {
    const urlWeather = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}`
    const config = {
      params: {
        apikey: apiKey,
        language: language
      }
    }
    axios.get(urlWeather, config)
      .then(res => setWeather(res.data[0]))
      .catch(err => console.log(err))
  }

  function getForecast() {
    const urlForecast = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}`
    const config = {
      params: {
        apikey: apiKey,
        language: language,
        metric: true
      }
    }
    axios.get(urlForecast, config)
      .then(res => setForecasts(res.data.DailyForecasts))
      .catch(err => console.log(err))
  }


  function showForecasts() {

    return forecasts.map((forecast, index) =>
      <Forecast key={index}
        temperatureMax={metric === "C" ? forecast.Temperature.Maximum.Value :
          (forecast.Temperature.Maximum.Value * 9/5) + 32 }
        temperatureMin={metric === "C" ? forecast.Temperature.Minimum.Value :
          (forecast.Temperature.Minimum.Value * 9/5) + 32 }
        metric={metric}
        dateForecast={forecast.Date}
        icon={forecast.Day.Icon}
      />
    );
  }



  return (
    <div className='App'>

      <div className="city-form">
        <form onSubmit={(e) => getWeather(e)}>
          <div className="form-group">
            <input type="text"
              className="form-control"
              placeholder="Informe a cidade..."
              onChange={e => setCity(e.target.value)} />
          </div>
          <button className="btn btn-primary" type="submit">
            Clique para ver o tempo no sua cidade
            </button>
        </form>
        <div className="form-group ml-3">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="metric" id="celcius" value="C" 
              checked={metric === 'C'} 
              onChange={(e) => setMetric(e.target.value)} />
            <label className="form-check-label" htmlFor="celcius">
              Celcius
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="metric" id="fahrenheit" value="F"
              checked={metric === 'F'}
              onChange={(e) => setMetric(e.target.value)} />
            <label className="form-check-label" htmlFor="fahrenheit">
              Fahrenheit
            </label>
          </div>
        </div>

      </div>
      {weather &&
        <WeatherNow icon={weather.WeatherIcon}
          text={weather.WeatherText}
          value={metric === 'C' ? weather.Temperature.Metric.Value : 
            weather.Temperature.Imperial.Value  }
          metric={metric}
          isDayTime={weather.IsDayTime}
          city={localStorage.getItem("cityName")} >
        </WeatherNow>
      }
      <div className="forecasts">
        {forecasts && showForecasts()}
      </div>
    </div>
  )
}