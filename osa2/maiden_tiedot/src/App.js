import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Countries from './components/Countries';

const API_URL = 'https://restcountries.eu/rest/v2/all';

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get(API_URL).then((res) => setData(res.data));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <div>
        find countries: <input type="text" onChange={handleFilterChange} />
      </div>
      <Countries data={data} filter={filter} />
    </div>
  );
}

export default App;
