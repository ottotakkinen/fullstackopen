import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setDiagnoses, updatePatientData, useStateValue } from "../state";
import { Diagnosis, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import EntryDetails from "../components/EntryDetails";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [loading, setLoading] = useState<boolean>(true);

  React.useEffect(() => {
    if (id && Object.values(patients).length !== 0 && !patients[id].ssn) {
      const fetchDiagnoses = async () => {
        try {
          const { data } = await axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnoses`
          );
          dispatch(setDiagnoses(data));
        } catch (e) {
          console.error(e);
        }
      };
      const fetchPatientList = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(updatePatientData(patientFromApi));

          setLoading(false);
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatientList();
      void fetchDiagnoses();
    } else {
      setLoading(false);
    }
  }, [dispatch, patients]);

  if (loading || !id) return <div>loading...</div>;

  const patient = patients[id];

  return (
    <>
      {patient ? (
        <div>
          <h2>{patient.name}</h2>
          <p>Gender: {patient.gender}</p>
          <p>SSN: {patient.ssn}</p>
          <p>Occupation: {patient.occupation}</p>
          <h3>Entries</h3>
          {patient?.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

export default PatientPage;
