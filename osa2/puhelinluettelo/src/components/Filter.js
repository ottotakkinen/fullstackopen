import React from 'react';

export default function Filter({ handleFilterInput }) {
  return (
    <div>
      filter shown with
      <input onChange={handleFilterInput} />
    </div>
  );
}
