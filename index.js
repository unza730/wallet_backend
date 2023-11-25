var express = require("express");
var bodyParser = require("body-parser");
var sequelize = require("./config/db.config");
const appRoutes = require('./routes/index'); // Adjust the path accordingly

var app = express();

// app.use(json());
app.use(bodyParser.json());
// app.use(urlencoded({ extended: true }));
app.use('/api', appRoutes);
// app.post('/signup', async (req, res) => {
//       try {
//         const {
//           name,
//           email_address,
//           password,
//           cnic,
//           address,
//           dob,
//           phone_no,
//         } = req.body;
    
//         // Check if the email address is already registered
//         const existingUser = await User.findOne({ where: { email_address: email_address } });
        
//         if (existingUser) {
//           // Handle the case where the email address is already in use
//           return res.status(400).json({ error: 'Email address is already registered' });
//         }
    
//         // Hash the password before saving it
//         const hashedPassword = await bcrypt.hash(password, 10);
    
//         // Create a new user record
//         const user = await User.create({
//           name,
//           email_address,
//           password: hashedPassword,
//           cnic,
//           address,
//           dob,
//           phone_no,
//         });
    
//         res.status(201).json({ message: 'Registration successful' });
//       } catch (error) {
//         if (error.name === 'SequelizeUniqueConstraintError') {
//           // Handle the case where a unique constraint is violated
//           res.status(400).json({ error: 'Email address is already registered' });
//         } else {
//           console.error('User registration error: ' + error);
//           res.status(500).json({ error: 'Registration failed' });
//         }
//       }
//     });
// setting port to 3000, & listening for requests http request.
const port = process.env.PORT || 3005;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}.`);
// });
sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });