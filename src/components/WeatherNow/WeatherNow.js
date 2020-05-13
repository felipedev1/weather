import React from 'react'
import './WeatherNow.css'


export default function WeatherNow({ city, icon, text, value, isDayTime, metric }) {
  return (
    <div className={`weather-now ${isDayTime ? 'bg-day' : 'bg-night'}`}>
      <h2 className="city">{city}</h2>
      <div className="weather-content">
        <span >
          {Math.floor(value)}°{metric}
        </span>
        <div className="ml-3 info">
          <img src={`https://developer.accuweather.com/sites/default/files/${icon < 10 ? `0${icon}` : icon}-s.png`}
            alt="Tempo" width="150" />
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}
