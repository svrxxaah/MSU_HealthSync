const db = require('../config/db');

const Service = {
  create: (serviceData, callback) => {
    db.query('INSERT INTO services SET ?', serviceData, callback);
  },
  getAll: (callback) => {
    db.query('SELECT * FROM services', callback);
  },
  update: (id, serviceData, callback) => {
    db.query('UPDATE services SET ? WHERE id = ?', [serviceData, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM services WHERE id = ?', [id], callback);
  }
};

module.exports = Service;
