import { v4 as uuid } from "uuid";
import patientData from "../../data/patients";

import {
  Patient,
  NonSensitivePatientEntry,
  NewPatientEntry,
  Entry,
} from "../types";

import { toNewPatientsEntry } from "../utils/toNewPatientsEntry";

const patients: Array<Patient> = patientData.map((obj) => {
  const object = toNewPatientsEntry(obj) as Patient;
  object.id = obj.id;
  object.entries = obj.entries;
  return object;
});

const nonSensitivePatients: Array<NonSensitivePatientEntry> = patients.map(
  ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  })
);

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
  return nonSensitivePatients;
};

const addEntry = (entry: NewPatientEntry): Patient => {
  const id: string = uuid();
  const newPatient = { id, ...entry, entries: [] };
  patients.push(newPatient);
  return newPatient;
};

type entryDataType = {
  entry: Entry;
  id: string;
};

const addEntries = (data: entryDataType): Patient => {
  const newPatients = patients.map((patient) =>
    patient.id === data.entry.id
      ? {
          ...patient,
          entries: [...patient.entries, { ...data.entry, id: data.id }],
        }
      : patient
  );
  console.log(data);
  console.log("------------------------------------");
  console.log(newPatients.filter((patient) => patient.id === data.entry.id)[0]);
  return newPatients.filter((patient) => patient.id === data.entry.id)[0];
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  addEntries,
};
