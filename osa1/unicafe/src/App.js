import React, { useState } from 'react';

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
      {/* <p>{`${props.text} ${props.value}`}</p> */}
    </tr>
  );
};

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={props.stats.good} />
        <StatisticsLine text="neutral" value={props.stats.neutral} />
        <StatisticsLine text="bad" value={props.stats.bad} />
        <StatisticsLine text="all" value={props.stats.all} />
        <StatisticsLine text="average" value={props.stats.average} />
        <StatisticsLine text="positive" value={props.stats.positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: good + neutral + bad,
    average: (good * 1 + bad * -1) / (good + bad),
    positive: `${(good / (good + bad)) * 100} %`,
  };

  // const all = good + neutral + bad;
  // const average = (good * 1 + bad * -1) / (good + bad);
  // const positive = (good / (good + bad)) * 100;

  return (
    <div>
      <h2>give feedback</h2>
      <Button
        handleClick={() => setGood((prevState) => prevState + 1)}
        text="good"
      />
      <Button
        handleClick={() => setNeutral((prevState) => prevState + 1)}
        text="neutral"
      />
      <Button
        handleClick={() => setBad((prevState) => prevState + 1)}
        text="bad"
      />
      <h2>statistics</h2>
      {stats.all > 0 ? <Statistics stats={stats} /> : <p>No feedback given</p>}
    </div>
  );
};

export default App;
