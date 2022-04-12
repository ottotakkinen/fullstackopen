import React from 'react';
import Part from './Part';

// interface CoursePart {
//   name: string;
//   exerciseCount: number;
// }

interface CourseParts {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: CourseParts) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;
