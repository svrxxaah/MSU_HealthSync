const Service = require('../models/Service');

exports.getServices = async (req, res) => {
    try {
        const results = await Service.getAll(); // Using async/await
        res.render('services', { services: results });
    } catch (err) {
        console.error('Error fetching services:', err);
        res.status(500).send('Error fetching services');
    }
};

exports.addService = async (req, res) => {
    const serviceData = req.body;

    try {
        await Service.create(serviceData); // Using async/await
        res.redirect('/services');
    } catch (err) {
        console.error('Error adding service:', err);
        res.status(500).send('Error adding service');
    }
};

exports.updateService = async (req, res) => {
    const { id } = req.params;
    const serviceData = req.body;

    try {
        await Service.update(id, serviceData); // Using async/await
        res.redirect('/services');
    } catch (err) {
        console.error('Error updating service:', err);
        res.status(500).send('Error updating service');
    }
};

exports.deleteService = async (req, res) => {
    const { id } = req.params;

    try {
        await Service.delete(id); // Using async/await
        res.redirect('/services');
    } catch (err) {
        console.error('Error deleting service:', err);
        res.status(500).send('Error deleting service');
    }
};
