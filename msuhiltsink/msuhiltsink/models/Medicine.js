const db = require('../config/db');

const Medicine = {
  create: (medicineData, callback) => {
    db.query('INSERT INTO medicines SET ?', medicineData, callback);
  },
  getAll: (callback) => {
    db.query('SELECT * FROM medicines', callback);
  },
  update: (id, medicineData, callback) => {
    db.query('UPDATE medicines SET ? WHERE id = ?', [medicineData, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM medicines WHERE id = ?', [id], callback);
  }
};

module.exports = Medicine;
