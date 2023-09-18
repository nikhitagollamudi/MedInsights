import express from 'express';
import * as patientController from '../controllers/patientController';

export const patientRouter = express.Router();

patientRouter.post('/', patientController.createPatient);
patientRouter.get('/', patientController.getPatients);
patientRouter.get('/:id', patientController.getPatientById);
patientRouter.put('/:id', patientController.updatePatient);
patientRouter.delete('/:id', patientController.deletePatient);