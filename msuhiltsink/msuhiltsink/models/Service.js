const db = require('../config/db');

const Service = {
    create: async (serviceData) => {
        const connection = await db.getConnection();
        try {
            await connection.query('INSERT INTO services SET ?', serviceData);
        } catch (err) {
            console.error('Error creating service:', err);
            throw err; // Re-throw error for higher-level handling
        } finally {
            connection.release(); // Always release the connection
        }
    },

    getAll: async () => {
        const connection = await db.getConnection();
        try {
            const [results] = await connection.query('SELECT * FROM services');
            return results;
        } catch (err) {
            console.error('Error fetching services:', err);
            throw err; // Re-throw error for higher-level handling
        } finally {
            connection.release(); // Always release the connection
        }
    },

    update: async (id, serviceData) => {
        const connection = await db.getConnection();
        try {
            await connection.query('UPDATE services SET ? WHERE id = ?', [serviceData, id]);
        } catch (err) {
            console.error('Error updating service:', err);
            throw err; // Re-throw error for higher-level handling
        } finally {
            connection.release(); // Always release the connection
        }
    },

    delete: async (id) => {
        const connection = await db.getConnection();
        try {
            await connection.query('DELETE FROM services WHERE id = ?', [id]);
        } catch (err) {
            console.error('Error deleting service:', err);
            throw err; // Re-throw error for higher-level handling
        } finally {
            connection.release(); // Always release the connection
        }
    }
};

module.exports = Service;
