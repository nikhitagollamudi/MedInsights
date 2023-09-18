import express from 'express';
import * as doctorController from '../controllers/doctorController';

export const doctorRouter = express.Router();

doctorRouter.post('/', doctorController.createDoctor);
doctorRouter.get('/', doctorController.getDoctors);
doctorRouter.get('/:id', doctorController.getDoctorById);
doctorRouter.put('/:id', doctorController.updateDoctor);
doctorRouter.delete('/:id', doctorController.deleteDoctor);
