const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Get all services
router.get('/', serviceController.getServices);

// Add new service
router.post('/add', serviceController.addService);

// Update a service
router.post('/update/:id', serviceController.updateService);

// Delete a service
router.post('/delete/:id', serviceController.deleteService);

module.exports = router;
