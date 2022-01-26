import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!Number(req.query.weight) || !Number(req.query.height)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const weight: number = Number(req.query.weight);
  const height: number = Number(req.query.height);
  const bmi: String = calculateBmi(weight, height);

  return res.json({
    weight,
    height,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  if (!req.body.daily_exercises || !req.body.target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  // Check if any value in daily_exercises is NaN or if target is NaN
  // and then return error
  if (
    !req.body.daily_exercises.map(Number).every((v: number) => !isNaN(v)) ||
    isNaN(Number(req.body.target))
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const calculatedExercises = calculateExercises(
    req.body.target,
    req.body.daily_exercises
  );
  return res.json(calculatedExercises);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
