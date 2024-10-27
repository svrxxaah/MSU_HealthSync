const db = require('../config/db');

const Medicine = {
    create: async (medicineData) => {
        const connection = await db.getConnection();
        try {
            await connection.query('INSERT INTO medicines SET ?', medicineData);
        } catch (err) {
            console.error('Error creating medicine:', err);
            throw err; // Re-throw error for higher-level handling
        } finally {
            connection.release(); // Always release the connection
        }
    },

    getAll: async () => {
        const connection = await db.getConnection();
        try {
            const [results] = await connection.query('SELECT * FROM medicines');
            return results;
        } catch (err) {
            console.error('Error fetching medicines:', err);
            throw err; // Re-throw error for higher-level handling
        } finally {
            connection.release(); // Always release the connection
        }
    },

    update: async (id, medicineData) => {
        const connection = await db.getConnection();
        try {
            await connection.query('UPDATE medicines SET ? WHERE id = ?', [medicineData, id]);
        } catch (err) {
            console.error('Error updating medicine:', err);
            throw err; // Re-throw error for higher-level handling
        } finally {
            connection.release(); // Always release the connection
        }
    },

    delete: async (id) => {
        const connection = await db.getConnection();
        try {
            await connection.query('DELETE FROM medicines WHERE id = ?', [id]);
        } catch (err) {
            console.error('Error deleting medicine:', err);
            throw err; // Re-throw error for higher-level handling
        } finally {
            connection.release(); // Always release the connection
        }
    }
};

module.exports = Medicine;
