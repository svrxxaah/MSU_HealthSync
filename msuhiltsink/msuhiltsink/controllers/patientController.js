const Patient = require('../models/Patient');

exports.getPatients = async (req, res) => {
    try {
        const results = await Patient.getAll(); // No callback needed now
        res.render('patients', { patients: results });
    } catch (err) {
        console.error('Error fetching patients:', err);
        res.status(500).send('Error fetching patients');
    }
};

exports.addPatient = async (req, res) => {
    const patientData = {
        fullName: req.body.fullName,
        parent: req.body.parent,
        schoolID: req.body.schoolID,
        contact: req.body.contact,
        address: req.body.address,
        height: req.body.height,
        weight: req.body.weight,
        bloodType: req.body.bloodType,
        medicalHistory: req.body.medicalHistory,
        department: req.body.department,
        createdAt: new Date()
    };

    try {
        await Patient.create(patientData); // No callback needed now
        res.redirect('/patients');
    } catch (err) {
        console.error('Error adding patient:', err);
        res.status(500).send('Error adding patient');
    }
};

exports.updatePatient = async (req, res) => {
    const { id } = req.params;
    const patientData = {
        fullName: req.body.fullName,
        parent: req.body.parent,
        schoolID: req.body.schoolID,
        contact: req.body.contact,
        address: req.body.address,
        height: req.body.height,
        weight: req.body.weight,
        bloodType: req.body.bloodType,
        medicalHistory: req.body.medicalHistory,
        department: req.body.department
    };

    try {
        await Patient.update(id, patientData); // No callback needed now
        res.redirect('/patients');
    } catch (err) {
        console.error('Error updating patient:', err);
        res.status(500).send('Error updating patient');
    }
};

exports.deletePatient = async (req, res) => {
    const { id } = req.params;
    try {
        await Patient.delete(id); // No callback needed now
        res.redirect('/patients');
    } catch (err) {
        console.error('Error deleting patient:', err);
        res.status(500).send('Error deleting patient');
    }
};
