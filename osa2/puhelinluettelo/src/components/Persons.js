import React from 'react';

export default function Persons({ persons, filter }) {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter?.toLowerCase())
  );

  const personsList = filteredPersons.map((person) => {
    return (
      <li key={person.name}>
        {person.name} {person.number}
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
