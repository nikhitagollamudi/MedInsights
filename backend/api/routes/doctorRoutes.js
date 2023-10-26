const express = require('express');
const doctorController = require('../controllers/doctorController');

export const doctorRouter = express.Router();

doctorRouter.post('/', doctorController.createDoctor);
doctorRouter.get('/', doctorController.getDoctors);
doctorRouter.get('/:id', doctorController.getDoctorById);
doctorRouter.put('/:id', doctorController.updateDoctor);
doctorRouter.delete('/:id', doctorController.deleteDoctor);
