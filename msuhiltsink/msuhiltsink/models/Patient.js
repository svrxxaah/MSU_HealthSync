const db = require('../config/db');

const Patient = {
  create: (patientData, callback) => {
    db.query('INSERT INTO patients SET ?', patientData, callback);
  },
  getAll: (callback) => {
    db.query('SELECT * FROM patients', callback);
  },
  update: (id, patientData, callback) => {
    db.query('UPDATE patients SET ? WHERE id = ?', [patientData, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM patients WHERE id = ?', [id], callback);
  }
};

module.exports = Patient;
