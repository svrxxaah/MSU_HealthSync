const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.signup = async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash password

  const newAdmin = { username, password: hashedPassword, email };

  Admin.create(newAdmin, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error creating admin');
    }
    res.redirect('/login');
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  Admin.findByUsername(username, async (err, admin) => {
    if (err || !admin) {
      return res.status(401).send('Username or password incorrect');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).send('Username or password incorrect');
    }

    const token = jwt.sign({ id: admin.id }, 'secretKey', { expiresIn: '1h' });
    res.cookie('auth_token', token);
    res.redirect('/dashboard');
  });
};
