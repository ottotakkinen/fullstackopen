import React from 'react';

import WeatherCard from './WeatherCard';

export default function CountryCard({ data }) {
  const elements = data.map((country) => (
    <div key={country.name}>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      {country.languages.map((lang) => (
        <li key={lang.name}>{lang.name}</li>
      ))}
      <img
        src={country.flag}
        alt="Country flag"
        style={{ maxWidth: '200px' }}
      />
      <WeatherCard city={country.capital} />
    </div>
  ));
  return <div>{elements}</div>;
}
