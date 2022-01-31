import { v4 as uuid } from 'uuid';
import patientData from '../../data/patients.json';

import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from '../types';
import { toNewPatientsEntry } from '../utils/toNewPatientsEntry';

const patients: Array<PatientEntry> = patientData.map((obj) => {
  const object = toNewPatientsEntry(obj) as PatientEntry;
  object.id = obj.id;
  return object;
});

const nonSensitivePatients: Array<NonSensitivePatientEntry> = patients.map(
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

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const id: string = uuid();
  const newPatient = { id, ...entry };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
};
