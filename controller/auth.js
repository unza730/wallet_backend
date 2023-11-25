const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const signup =  async (req, res) => {
  try {
    const {
      name,
      email_address,
      password,
      cnic,
      address,
      dob,
      phone_no,
    } = req.body;

    // Check if the email address is already registered
    const existingUser = await User.findOne({ where: { email_address: email_address } });
    
    if (existingUser) {
      // Handle the case where the email address is already in use
      return res.status(400).json({ error: 'Email address is already registered' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    const user = await User.create({
      name,
      email_address,
      password: hashedPassword,
      cnic,
      address,
      dob,
      phone_no,
    });

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      // Handle the case where a unique constraint is violated
      res.status(400).json({ error: 'Email address is already registered' });
    } else {
      console.error('User registration error: ' + error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }
};


const login = async (req, res) => {
  const { email_address, password } = req.body;

  try {
    const user = await User.findOne({ where: { email_address } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify the hashed password
    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Password is correct; generate a JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email_address,
      },
      'your-secret-key', // Replace with your secret key
      {
        expiresIn: '30d', // Token expiration time (e.g., 1 hour)
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error: ' + error);
    res.status(500).json({ error: 'Login failed' });
  }
}

module.exports = { signup, login };
