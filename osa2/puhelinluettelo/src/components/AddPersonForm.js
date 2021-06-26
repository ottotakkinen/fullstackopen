import React from 'react';

export default function AddPersonForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input onChange={props.handleNameInput} />
      </div>
      <div>
        number: <input onChange={props.handleNumberInput} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
