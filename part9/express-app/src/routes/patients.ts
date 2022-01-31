import express from 'express';

import patientService from '../services/patientService';
import { toNewPatientsEntry } from '../utils/toNewPatientsEntry';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getNonSensitiveEntries();
  res.json(data);
});

router.post('/', (req, res) => {
  try {
    const newEntry = toNewPatientsEntry(req.body);
    const entry = patientService.addEntry(newEntry);
    res.json(entry);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
