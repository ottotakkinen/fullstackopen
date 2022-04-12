import React from 'react';

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface CourseParts {
  courseParts: CoursePart[];
}

const Total = ({ courseParts }: CourseParts) => {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
