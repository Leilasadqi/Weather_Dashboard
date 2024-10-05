/**
 * CurrentWeather component.
 * Displays the current weather data for the selected city.
 * @param {object} data - Current weather data for the selected city.
 */

import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          {/* Display city name and weather description */}
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        {/* Weather icon representing current conditions */}
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>

      <div className="bottom">
        {/* Display temperature */}
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          {/* Weather details section */}
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          {/* Display feels like temperature */}
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          {/* Display wind speed */}
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          {/* Display humidity */}
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          {/* Display atmospheric pressure */}
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
