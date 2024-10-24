const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Get all patients
router.get('/', patientController.getPatients);

// Add new patient
router.post('/add', patientController.addPatient);

// Update a patient
router.post('/update/:id', patientController.updatePatient);

// Delete a patient
router.post('/delete/:id', patientController.deletePatient);

module.exports = router;
