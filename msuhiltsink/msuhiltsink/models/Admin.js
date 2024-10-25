const db = require('../config/db'); // Import your database connection

const Admin = {
  create: (newAdmin, callback) => {
    const { username, password, email } = newAdmin;
    const query = 'INSERT INTO admins (username, password, email, createdAt) VALUES (?, ?, ?, NOW())';

    db.query(query, [username, password, email], (err, result) => {
      if (err) {
        console.error('Error inserting admin into database:', err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  findByUsername: (username, callback) => {
    const query = 'SELECT * FROM admins WHERE username = ?';

    db.query(query, [username], (err, result) => {
      if (err) {
        console.error('Error finding admin by username:', err);
        return callback(err);
      }
      callback(null, result[0]); // Return the first result
    });
  },
};

module.exports = Admin;
