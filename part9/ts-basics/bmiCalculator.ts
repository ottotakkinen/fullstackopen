type Result = string;

const calculateBmi = (height: number, weight: number): Result => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi >= 40) {
    return 'Obese (Class III)';
  }
  if (bmi >= 35) {
    return 'Obese (Class II)';
  }
  if (bmi >= 30) {
    return 'Obese (Class I)';
  }
  if (bmi >= 25) {
    return 'Obese (Class I)';
  }
  if (bmi >= 20) {
    return 'Overweight (Pre-obese)';
  }
  if (bmi >= 18.5) {
    return 'Normal range';
  }
  if (bmi >= 17) {
    return 'Underweight (Mild thinness)';
  }
  if (bmi >= 16) {
    return 'Underweight (Moderate thinness)';
  }
  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  }
};

const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);

console.log(calculateBmi(a, b));
