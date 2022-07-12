import express from "express";
import { v4 as uuid } from "uuid";
import patientService from "../services/patientService";

import { toNewPatientsEntry } from "../utils/toNewPatientsEntry";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = patientService.getNonSensitiveEntries();
  res.json(data);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const data = patientService.getEntries().filter((entry) => entry.id === id);
  res.json(data[0]);
});

router.post("/:id/entries", (req, res) => {
  try {
    const entry = patientService.addEntries({ ...req.body, id: uuid() });
    res.json(entry);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    const newEntry = toNewPatientsEntry(req.body);
    const entry = patientService.addEntry(newEntry);
    res.json(entry);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
