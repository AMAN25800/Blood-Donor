import express from 'express';
import { SaveData } from '../Controller/PatientController.js';
const patient=express.Router();
patient.post('/savedata',SaveData);
export default patient;