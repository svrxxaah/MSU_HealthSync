const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

// Get all medicines
router.get('/', medicineController.getMedicines);

// Add new medicine
router.post('/add', medicineController.addMedicine);
router.post('/edit', medicineController.updateMedicine);
// Update a medicine
router.post('/edit/:id', medicineController.updateMedicine);
router.get('/medicines/category/:category', medicineController.getMedicinesByCategory);
// Delete a medicine
router.post('/delete/:id', medicineController.deleteMedicine);

module.exports = router;
