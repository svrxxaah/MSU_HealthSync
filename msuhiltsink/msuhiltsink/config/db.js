const mysql = require('mysql2/promise'); // Ensure to use mysql2/promise

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'msu_healthsync',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
