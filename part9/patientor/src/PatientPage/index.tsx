import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import EntryDetails from "../components/EntryDetails";
import { apiBaseUrl } from "../constants";
import { setDiagnoses, updatePatientData, useStateValue } from "../state";
import { Diagnosis, Patient } from "../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleSubmitEntry = async (diagnosisEntry: EntryFormValues) => {
    console.log(diagnosisEntry);
    const result = await axios.post(`${apiBaseUrl}/patients/${id}/entries`, {
      ...diagnosisEntry,
      id: id,
    });
    console.log(result);
  };

  return (
    <>
      {modalOpen && (
        <AddEntryModal
          modalOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmitEntry}
        />
      )}
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
          <Button variant="outlined" onClick={() => setModalOpen(true)}>
            Add entry
          </Button>
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

export default PatientPage;
