import React, { useState, useEffect } from 'react';

import Persons from './components/Persons';
import Filter from './components/Filter';
import AddPersonForm from './components/AddPersonForm';
import Notification from './components/Notification';

import personService from './services/persons';

const initialErrorMessage = { error: true, message: '' };

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage);

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
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

    const person = persons.find((person) => person.name === newName);

    if (
      person &&
      window.confirm(
        `${person.name} is already in the address book, update phone number?`
      )
    ) {
      const newPerson = { name: person.name, number: newNumber };
      personService
        .update(person.id, newPerson)
        .then((res) =>
          setPersons(persons.map((p) => (p.id !== person.id ? p : res)))
        )
        .catch((error) => {
          setErrorMessage({
            error: true,
            message: `the person '${person.name}' was already deleted from server`,
          });
          setTimeout(() => setErrorMessage(initialErrorMessage), 4000);
          setPersons(persons.filter((p) => p.id !== person.id));
        });
      setErrorMessage({ error: false, message: `Changed ${newName}'s number` });
      setTimeout(() => setErrorMessage(initialErrorMessage), 4000);
      return;
    } else if (person && person.name === newName) {
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
    setErrorMessage({ error: false, message: `Added ${newName}` });
    setTimeout(() => setErrorMessage(initialErrorMessage), 4000);
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter((p) => p.id !== id)));
    }
    setErrorMessage({ error: true, message: `Deleted ${person.name}` });
    setTimeout(() => setErrorMessage(initialErrorMessage), 4000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage ? (
        <Notification
          error={errorMessage.error}
          message={errorMessage.message}
        />
      ) : (
        ''
      )}
      <Filter handleFilterInput={handleFilterInput} />
      <h2>add a new</h2>
      <AddPersonForm
        handleSubmit={handleSubmit}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
      />
      <Persons persons={persons} filter={filter} onDelete={deletePerson} />
    </div>
  );
};

export default App;
