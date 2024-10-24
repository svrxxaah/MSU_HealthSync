const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

// Get all medicines
router.get('/', medicineController.getMedicines);

// Add new medicine
router.post('/add', medicineController.addMedicine);

// Update a medicine
router.post('/update/:id', medicineController.updateMedicine);

// Delete a medicine
router.post('/delete/:id', medicineController.deleteMedicine);

module.exports = router;
