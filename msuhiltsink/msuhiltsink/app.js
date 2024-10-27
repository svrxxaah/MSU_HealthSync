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
            schoolID, fullName, department, parent, contact, address, height, weight, bloodType, medicalHistory 
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

// Mount route modules
app.use('/admin', adminRoutes);
app.use('/patients', patientRoutes);
app.use('/medicines', medicineRoutes);
app.use('/services', serviceRoutes);

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
