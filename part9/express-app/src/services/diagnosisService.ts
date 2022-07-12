import { v4 as uuid } from "uuid";
import diagnosisData from "../../data/diagnoses.json";

import { DiagnosisEntry } from "../types";

const diagnoses: Array<DiagnosisEntry> = diagnosisData;

const getEntries = (): Array<DiagnosisEntry> => {
  return diagnoses;
};

const addEntry = (entry: DiagnosisEntry) => {
  const id: string = uuid();
  const newDiagnosis = { id, ...entry };
  diagnoses.push(newDiagnosis);
  return newDiagnosis;
};

export default {
  getEntries,
  addEntry,
};
