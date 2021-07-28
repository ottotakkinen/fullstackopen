import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

export default function WeatherCard({ city }) {
  const [weatherData, setWeatherData] = useState(undefined);

  const API_URL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;

  useEffect(() => {
    axios.get(API_URL).then((res) => setWeatherData(res.data));
    // console.log('called weather api');
  }, [API_URL]);

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>Temperature: {weatherData && weatherData.current.temperature}</p>
      <img
        src={weatherData && weatherData.current.weather_icons}
        alt="Current weather icon."
      />
      <p>
        Wind: {weatherData && weatherData.current.wind_speed} mph, direction{' '}
        {weatherData && weatherData.current.wind_dir}
      </p>
    </div>
  );
}
