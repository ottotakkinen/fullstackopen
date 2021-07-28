import React from 'react';

const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  const parts = props.course.parts.map((part) => {
    return <Part key={part.id} name={part.name} exercises={part.exercises} />;
  });

  return <div>{parts}</div>;
};

const Total = (props) => {
  const total = props.course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  console.log(total);

  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  );
};

export default function Course({ course }) {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
}
