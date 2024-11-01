const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/', patientController.getPatients);
router.post('/add', patientController.addPatient);
router.post('/update/:id', patientController.updatePatient);
router.post('/delete/:id', patientController.deletePatient);
// In your router file
router.get('/history/:schoolID', patientController.getPatientHistory);


module.exports = router;
