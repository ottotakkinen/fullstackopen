export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

// export type Gender = 'male' | 'female' | 'other' | 'not specified';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  NotSpecified = 'not specified',
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export interface NewPatientEntry {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
