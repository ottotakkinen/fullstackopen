import React, { useState, useEffect } from 'react';

import CountryCard from './CountryCard';

export default function Countries({ data, filter }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(
    () =>
      setFilteredData(
        data.filter((country) =>
          country.name.toLowerCase().includes(filter.toLowerCase())
        )
      ),
    [data, filter]
  );

  const handleClick = (e) => {
    setFilteredData(data.filter((country) => country.name === e.target.id));
  };

  return (
    <div>
      {filteredData.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredData.length > 1 ? (
        filteredData.map((country) => (
          <div key={country.name}>
            {country.name}
            <button id={country.name} onClick={handleClick}>
              show
            </button>
          </div>
        ))
      ) : (
        <CountryCard data={filteredData} />
      )}
    </div>
  );
}
