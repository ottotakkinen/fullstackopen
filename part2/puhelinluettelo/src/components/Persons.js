import React from 'react';

export default function Persons({ persons, filter, onDelete }) {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter?.toLowerCase())
  );

  const personsList = filteredPersons.map((person) => {
    return (
      <li key={person.name}>
        {person.name} {person.number}{' '}
        <button onClick={() => onDelete(person.id)}>delete</button>
      </li>
    );
  });

  return (
    <div>
      <h2>Numbers</h2>
      {personsList}
    </div>
  );
}
