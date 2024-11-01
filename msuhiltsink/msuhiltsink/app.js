const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const patientRoutes = require('./routes/patientRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const Admin = require('./models/Admin'); // Import the Admin model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const Medicine = require('./models/Medicine'); // Adjust the path if necessary
const Patient = require('./models/Patient');
const Service = require('./models/Service');
const pool = require('./config/db');
const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.render('signup');
});

// Handle signup form submission
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new admin object
        const newAdmin = { username, email, password: hashedPassword };
        // Save to the database
        await Admin.create(newAdmin);
        console.log('Admin created successfully');
        res.redirect('/login');
    } catch (err) {
        console.error('Error creating admin:', err);
        res.status(500).send('Error creating admin');
    }
});

// Serve the login page
app.get('/login', (req, res) => {
    res.render('login'); // Ensure to create login.ejs in your views folder
});

// Handle login form submission
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Logic to authenticate user
    console.log('Login attempt:', username, password);
    // Implement your authentication logic here

    // After successful authentication, redirect to dashboard
    res.redirect('/dashboard');
});

// Serve the dashboard page
app.get('/dashboard', (req, res) => {
    res.render('dashboard'); // Ensure to create dashboard.ejs in your views folder
});

// Route to get all patients and render the patients page
app.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.getAll(); // Fetch all patients
        res.render('patients', { patients }); // Render the patients view
    } catch (err) {
        console.error('Error fetching patients:', err);
        res.status(500).send('Error fetching patients');
    }
});

// Route to handle adding a new patient
app.post('/patients/add', async (req, res) => {
    const { schoolID, fullName, department, parent, contact, address, height, weight, bloodType, medicalHistory } = req.body;

    try {
        await Patient.create({ schoolID, fullName, department, parent, contact, address, height, weight, bloodType, medicalHistory });
        res.redirect('/patients'); // Redirect back to the patients list
    } catch (err) {
        console.error('Error adding patient:', err);
        res.status(500).send('Error adding patient');
    }
});

// Route to handle editing an existing patient
app.post('/patients/update', async (req, res) => {
    const { id, schoolID, fullName, department, parent, contact, address, height, weight, bloodType, medicalHistory } = req.body;

    try {
        console.log('Updating patient with ID:', id);
        console.log('New patient data:', {
            id, schoolID, fullName, department, parent, contact, address, height, weight, bloodType, medicalHistory 
        });

        await Patient.update(id, { 
            schoolID, 
            fullName, 
            department, 
            parent, 
            contact, 
            address, 
            height, 
            weight, 
            bloodType, 
            medicalHistory 
        });

        res.redirect('/patients'); // Redirect back to the patients list
    } catch (err) {
        console.error('Error updating patient:', err);
        return res.status(500).send('Error updating patient');
    }
});

// Route to handle deleting a patient
app.post('/patients/delete', async (req, res) => {
    const { id } = req.body;

    try {
        await Patient.delete(id);
        res.redirect('/patients'); // Redirect back to the patients list
    } catch (err) {
        console.error('Error deleting patient:', err);
        res.status(500).send('Error deleting patient');
    }
});

// Route to get all medicines and render the medicines page
app.get('/medicines', async (req, res) => {
    try {
        const medicines = await Medicine.getAll(); // Fetch all medicines
        res.render('medicines', { medicines }); // Render the medicines view
    } catch (err) {
        console.error('Error fetching medicines:', err);
        res.status(500).send('Error fetching medicines');
    }
});

// Route to handle adding a new medicine
app.post('/medicines/add', async (req, res) => {
    const medicineData = req.body;
    
    try {
        await Medicine.create(medicineData);
        res.redirect('/medicines'); // Redirect back to the medicines list
    } catch (err) {
        console.error('Error adding medicine:', err);
        res.status(500).send('Error adding medicine');
    }
});

// Route to handle updating a medicine
app.post('/medicines/update/:id', async (req, res) => {
    const { id } = req.params;
    const medicineData = req.body;

    try {
        await Medicine.update(id, medicineData);
        res.redirect('/medicines'); // Redirect back to the medicines list
    } catch (err) {
        console.error('Error updating medicine:', err);
        res.status(500).send('Error updating medicine');
    }
});

// Route to handle deleting a medicine
app.post('/medicines/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Medicine.delete(id);
        res.redirect('/medicines'); // Redirect back to the medicines list
    } catch (err) {
        console.error('Error deleting medicine:', err);
        res.status(500).send('Error deleting medicine');
    }
});

// Route to get all services and render the services page
app.get('/services', async (req, res) => {
    try {
        const services = await Service.getAll(); // Fetch all services
        res.render('services', { services }); // Render the services view
    } catch (err) {
        console.error('Error fetching services:', err);
        res.status(500).send('Error fetching services');
    }
});

// Route to handle adding a new service
app.post('/services/add', async (req, res) => {
    const serviceData = req.body;

    try {
        await Service.create(serviceData);
        res.redirect('/services'); // Redirect back to the services list
    } catch (err) {
        console.error('Error adding service:', err);
        res.status(500).send('Error adding service');
    }
});

app.post('/services/edit', async (req, res) => {
    const { id, date, serviceType, patientName, doctorInCharge, medicalNotes, bloodPressure, respiratoryRate, pulseRate, temperature, medication } = req.body;

    try {
        const [result] = await pool.query(
            `UPDATE services SET 
            date = ?, 
            serviceType = ?, 
            patientName = ?, 
            doctorInCharge = ?, 
            medicalNotes = ?, 
            bloodPressure = ?, 
            respiratoryRate = ?, 
            pulseRate = ?, 
            temperature = ?, 
            medication = ? 
            WHERE id = ?`,
            [date, serviceType, patientName, doctorInCharge, medicalNotes, bloodPressure, respiratoryRate, pulseRate, temperature, medication, id]
        );

        if (result.affectedRows > 0) {
            res.status(200).send('Service updated successfully');
        } else {
            res.status(404).send('Service not found');
        }
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).send('An error occurred while updating the service');
    }
});




// Route to handle deleting a service
app.post('/services/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Service.delete(id);
        res.redirect('/services'); // Redirect back to the services list
    } catch (err) {
        console.error('Error deleting service:', err);
        res.status(500).send('Error deleting service');
    }
});

// Add this route after your existing routes in app.js
app.get('/history', async (req, res) => {
    try {
        // Fetch all records
        const medicines = await Medicine.getAll(); // Fetch all medicines
        const patients = await Patient.getAll(); // Fetch all patients
        const services = await Service.getAll(); // Fetch all services

        // Render the history view with the fetched data
        res.render('history', { patients, medicines, services });
    } catch (err) {
        console.error('Error fetching history:', err);
        res.status(500).send('Error fetching history');
    }
});


app.post('/medicines/add-quantity', async (req, res) => {
    let connection;
    try {
        const { id, quantity } = req.body;

        connection = await pool.getConnection();
        
        const [results] = await connection.query('SELECT * FROM medicines WHERE id = ?', [id]);

        if (results.length > 0) {
            const medicine = results[0];
            const newQuantity = medicine.quantity + parseInt(quantity);
            await connection.query('UPDATE medicines SET quantity = ? WHERE id = ?', [newQuantity, id]);
            res.redirect('/medicines'); 
        } else {
            res.status(404).send('Medicine not found');
        }
    } catch (error) {
        console.error('Error adding quantity:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        if (connection) connection.release();
    }
});



// Mount route modules
app.use('/admin', adminRoutes);
app.use('/patients', patientRoutes);
app.use('/medicines', medicineRoutes);
app.use('/services', serviceRoutes);

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
