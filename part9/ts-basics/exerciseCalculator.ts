interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const ratings = ['work harder boi!', 'good try', 'well done!'];

const calculateExercises = (target: number, hours: number[]): Results => {
  const periodLength = hours.length;
  let trainingDays = 0;
  for (let i = 0; i < periodLength; i++) {
    if (hours[i] !== 0) {
      trainingDays++;
    }
  }
  const sum = hours.reduce((a, b) => a + b, 0);
  const average = sum / periodLength;

  const success = average >= target;

  let rating = Math.ceil(((3 / 2) * average) / target);
  if (rating > 3) {
    rating = 3;
  }

  const ratingDescription = ratings[rating - 1];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const target: number = Number(process.argv[2]);
const hours: number[] = process.argv.slice(3).map(Number);

console.log(calculateExercises(target, hours));
