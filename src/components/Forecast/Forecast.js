import React from 'react'
import './Forecast.css'

export default function Forecast({ temperatureMax, temperatureMin, dateForecast, icon, metric }) {

  function getDay() {
    const date = new Date(dateForecast)
    const semana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']
    return semana[date.getDay()] + '-' + date.getDate()
  }

  return (
    <div className="card-day">
      <h4>
        {getDay()}
      </h4>
      <hr />
      <p style={{color:"tomato"}}>Max: {Math.floor(temperatureMax)}°{metric} </p>
      <p style={{color:"blue"}}>Min: {Math.floor(temperatureMin)}°{metric}  </p>
      <img src={`https://developer.accuweather.com/sites/default/files/${icon < 10 ? `0${icon}` : icon}-s.png`}
        alt="Tempo" width="80" />
    </div>
  )
}
