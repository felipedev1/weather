import axios from 'axios'
import React from 'react';
import { useState, useEffect } from 'react'
import './App.css';

const apiKey = 'PW3UZcSOAxeKcNm58tMzXGDufhOMFqox'

function App() {

  const [city, setCity] = useState('')
  const [cityKey, setCityKey] = useState()
  const [weather, setWeather] = useState()
  const [icon, setIcon] = useState(1)

  useEffect(() => {
    setCityKey(localStorage.getItem("cityKey"))
    setCity(localStorage.getItem("cityName"))
    if(cityKey){
      const urlWeather = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}&language=pt-BR`
       axios.get(urlWeather).then(response => {
         setWeather(response.data[0])
          setIcon(response.data[0].WeatherIcon)

       })
      }
  }, [cityKey])

  async function getWeather(e) {
    e.preventDefault()
    const urlLocale = `http://dataservice.accuweather.com/locations/v1/cities/search`
    const urlParams = {
      params: {
        apikey: apiKey,
        q: city
      }
    }
    axios.get(urlLocale, urlParams)
      .then(res => {
        localStorage.setItem("cityName", city)
        localStorage.setItem("cityKey", res.data[0].Key)
        setCityKey(res.data[0].Key)
    }).catch(err => console.log(err))
  }
  

  return (
    <div className={`App container ${weather && weather.IsDayTime ? 'bg-primary' : 'bg-dark'}`}>
      <form className="mb-3" onSubmit={(e) => getWeather(e)}>
        <div className="form-group">
          <input type="text" 
            className="form-control"
            placeholder="Informe a cidade..." 
            onChange={e => setCity(e.target.value)}/>
        </div>
          <button className="btn btn-primary" type="submit">
            Clique para ver a temperatura
          </button>
      </form>
      <h1>{city}</h1>
      <div className="content">
        <span className="temperature-now">
          {weather ? `${Math.floor(weather.Temperature.Metric.Value)}°C` : '1°C'}
        </span>
        <div className="ml-3 info">
          <img src={`https://developer.accuweather.com/sites/default/files/${icon < 10 ? `0${icon}` : icon}-s.png`} 
            alt="Tempo"  width="150" />
          <p>{weather && weather.WeatherText}</p>
        </div>
      </div>
    </div>
  )
}

export default App