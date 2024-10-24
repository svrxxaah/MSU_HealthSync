const db = require('../config/db');

const Admin = {
  create: (adminData, callback) => {
    db.query('INSERT INTO admins SET ?', adminData, callback);
  },
  findByUsername: (username, callback) => {
    db.query('SELECT * FROM admins WHERE username = ?', [username], (err, results) => {
      if (err) throw err;
      callback(null, results[0]); // Return the first result
    });
  }
};

module.exports = Admin;
