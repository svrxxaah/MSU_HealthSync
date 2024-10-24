const Patient = require('../models/Patient');

exports.getPatients = (req, res) => {
  Patient.getAll((err, results) => {
    if (err) throw err;
    res.render('patients', { patients: results });
  });
};

exports.addPatient = (req, res) => {
  const patientData = req.body;
  Patient.create(patientData, (err) => {
    if (err) throw err;
    res.redirect('/patients');
  });
};

exports.updatePatient = (req, res) => {
  const { id } = req.params;
  const patientData = req.body;
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
