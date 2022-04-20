import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { updatePatientData, useStateValue } from '../state';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [loading, setLoading] = useState<boolean>(true);

  React.useEffect(() => {
    if (id && Object.values(patients).length !== 0 && !patients[id].ssn) {
      console.log(!patients[id].ssn);
      const fetchPatientList = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(updatePatientData(patientFromApi));
          console.log('from api: ', patientFromApi);
          setLoading(false);
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatientList();
    } else {
      setLoading(false);
    }
  }, [dispatch, patients]);

  if (loading || !id) return <div>loading...</div>;

  const patient = patients[id];

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Gender: {patient.gender}</p>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientPage;
