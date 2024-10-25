const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const patientRoutes = require('./routes/patientRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const Admin = require('./models/Admin'); // Import the Admin model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

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
    
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin object
    const newAdmin = { username, email, password: hashedPassword };

    // Save to the database
    Admin.create(newAdmin, (err, result) => {
        if (err) {
            console.error('Error creating admin:', err);
            return res.status(500).send('Error creating admin');
        }
        console.log('Admin created successfully:', result);
        res.redirect('/login');
    });
});

app.get('/signup', (req, res) => {
    res.render('signup'); // Ensure the signup.ejs exists
});

// Serve the login page
app.get('/login', (req, res) => {
    res.render('login'); // Make sure to create login.ejs in your views folder
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Logic to authenticate user
    console.log('Login attempt:', username, password);

    // After successful authentication, redirect to dashboard
    res.redirect('/dashboard');
});

// Serve the dashboard page
app.get('/dashboard', (req, res) => {
    res.render('dashboard'); // Make sure to create dashboard.ejs in your views folder
});










app.use('/admin', adminRoutes);
app.use('/patients', patientRoutes);
app.use('/medicines', medicineRoutes);
app.use('/services', serviceRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
