import { v4 as uuid } from 'uuid';
import patientData from '../../data/patients.json';

import { PatientEntry, NonSensitivePatientEntry } from '../types';

const patients: Array<PatientEntry> = patientData;

const nonSensitivePatients: Array<NonSensitivePatientEntry> = patientData.map(
  ({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  })
);

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
  return nonSensitivePatients;
};

const addEntry = (
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
): PatientEntry => {
  const id: string = uuid();
  const newPatient = { id, name, dateOfBirth, ssn, gender, occupation };
  console.log('new patient:', newPatient);
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
};
