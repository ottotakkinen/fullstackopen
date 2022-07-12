import {
  BaseEntry,
  Discharge,
  Entry,
  EntryType,
  Gender,
  HealthCheckRating,
  NewPatientEntry,
  SickLeave,
} from "../types";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntriesEntry = (object: {
  type: unknown;
  description: unknown;
  id: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  discharge?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
  healthCheckRating?: unknown;
}): Entry | undefined => {
  const commonFields: BaseEntry = {
    id: parseValue(object.id),
    description: parseValue(object.description),
    date: parseValue(object.date),
    specialist: parseValue(object.specialist),
    type: parseType(object.type),
  };
  switch (object.type) {
    case "HealthCheck":
      return {
        ...commonFields,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case "Hospital":
      return {
        ...commonFields,
        type: "Hospital",
        discharge: parseDischarge(object.discharge),
      };
    case "OccupationalHealthcare":
      return {
        ...commonFields,
        type: "OccupationalHealthcare",
        employerName: parseValue(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
      };
    default:
      return undefined;
  }
};

const parseValue = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error("Incorrect or missing value.");
  }
  return value;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing value.");
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing value");
  }
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!(typeof discharge === "object" && discharge !== null)) {
    throw new Error("Incorrect or missing discharge");
  }

  if (!("date" in discharge && "criteria" in discharge)) {
    throw new Error("Discharge object doesn't include the required fields");
  }

  const dischargeObject = discharge as { date: unknown; criteria: unknown };

  return {
    criteria: parseValue(dischargeObject.criteria),
    date: parseValue(dischargeObject.date),
  };
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    !(
      typeof sickLeave === "object" &&
      sickLeave !== null &&
      "startDate" in sickLeave &&
      "endDate" in sickLeave
    )
  ) {
    throw new Error("Incorrect or missing sick leave property");
  }

  const obj = sickLeave as { date: unknown; criteria: unknown };

  return {
    startDate: parseValue(obj.criteria),
    endDate: parseValue(obj.date),
  };
};

const parseType = (type: unknown): EntryType => {
  if (type === "HealthCheck") return "HealthCheck";
  if (type === "Hospital") return "Hospital";
  if (type === "OccupationalHealthcare") return "OccupationalHealthcare";
  throw new Error("Incorrect or missing type property");
};
