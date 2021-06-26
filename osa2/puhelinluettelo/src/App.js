import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Persons from './components/Persons';
import Filter from './components/Filter';
import AddPersonForm from './components/AddPersonForm';

const DB_URL = 'http://localhost:3001/persons';

const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456' },
    // { name: 'Ada Lovelace', number: '39-44-5323523' },
    // { name: 'Dan Abramov', number: '12-43-234345' },
    // { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get(DB_URL).then((res) => setPersons(res.data));
  }, []);

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterInput = (event) => {
    setFilter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons((prevState) => {
      return [
        ...prevState,
        {
          name: newName,
          number: newNumber,
        },
      ];
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterInput={handleFilterInput} />
      <h2>add a new</h2>
      <AddPersonForm
        handleSubmit={handleSubmit}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
      />
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
