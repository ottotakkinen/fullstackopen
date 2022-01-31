import { Gender, NewPatientEntry } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientsEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseValue(object.name),
    dateOfBirth: parseValue(object.dateOfBirth),
    ssn: parseValue(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseValue(object.occupation),
  };
  return newEntry;
};

const parseValue = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error('Incorrect or missing value.');
  }
  return value;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing value.');
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};
