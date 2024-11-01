const db = require('../config/db');

const Patient = {
    create: async (patientData) => {
        const connection = await db.getConnection();
        try {
            await connection.query('INSERT INTO patients SET ?', patientData);
        } catch (err) {
            console.error('Error creating patient:', err);
            throw err; // Re-throw error for higher-level handling
        } finally {
            connection.release(); // Always release the connection
        }
    },
    getAll: async () => {
        const connection = await db.getConnection();
        try {
            const [results] = await connection.query('SELECT * FROM patients');
            return results;
        } catch (err) {
            console.error('Error fetching patients:', err);
            throw err; // Re-throw error for higher-level handling
        } finally {
            connection.release(); // Always release the connection
        }
    },
    getBySchoolID: async (schoolID) => { // Ensure this method is here
        const connection = await db.getConnection();
        try {
            const [results] = await connection.query('SELECT * FROM patients WHERE schoolID = ?', [schoolID]);
            return results;
        } catch (err) {
            console.error('Error fetching patients by schoolID:', err);
            throw err; // Re-throw error for higher-level handling
        } finally {
            connection.release(); // Always release the connection
        }
    },
    update: async (id, patientData) => {
        const connection = await db.getConnection();
        try {
            await connection.query('UPDATE patients SET ? WHERE id = ?', [patientData, id]);
        } catch (err) {
            console.error('Error updating patient:', err);
            throw err; // Re-throw error for higher-level handling
        } finally {
            connection.release(); // Always release the connection
        }
    },
    delete: async (id) => {
        const connection = await db.getConnection();
        try {
            await connection.query('DELETE FROM patients WHERE id = ?', [id]);
        } catch (err) {
            console.error('Error deleting patient:', err);
            throw err; // Re-throw error for higher-level handling
        } finally {
            connection.release(); // Always release the connection
        }
    }
};

module.exports = Patient;
