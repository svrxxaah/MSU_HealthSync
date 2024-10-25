const Patient = require('../models/Patient');

exports.getPatients = (req, res) => {
  Patient.getAll((err, results) => {
    if (err) throw err;
    res.render('patients', { patients: results });
  });
};

exports.addPatient = (req, res) => {
  const patientData = {
    fullName: req.body.fullName,
    parent: req.body.parent,
    schoolID:req.body.schoolID,
    contact: req.body.contact,
    address: req.body.address,
    height: req.body.height,
    weight: req.body.weight,
    bloodType: req.body.bloodType,
    medicalHistory: req.body.medicalHistory,
    department: req.body.department, // Capture department
    createdAt: new Date() // Optionally add createdAt
  };

  Patient.create(patientData, (err) => {
    if (err) throw err;
    res.redirect('/patients');
  });
};

exports.updatePatient = (req, res) => {
  const { id } = req.params;
  const patientData = {
    fullName: req.body.fullName,
    parent: req.body.parent,
    schoolID:req.body.schoolID,
    contact: req.body.contact,
    address: req.body.address,
    height: req.body.height,
    weight: req.body.weight,
    bloodType: req.body.bloodType,
    medicalHistory: req.body.medicalHistory,
    department: req.body.department // Ensure department is updated
  };

  Patient.update(id, patientData, (err) => {
    if (err) throw err;
    res.redirect('/patients');
  });
};

exports.deletePatient = (req, res) => {
  const { id } = req.params;
  Patient.delete(id, (err) => {
    if (err) throw err;
    res.redirect('/patients');
  });
};
