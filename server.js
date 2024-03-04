require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptionsDelegate = require('./config/cors.js');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middlewares/verifyJWT');
const credentials = require('./middlewares/credentials');
const path = require('path');
const connection = require('./config/connect');
connection

const PORT = process.env.PORT || 3500;



// Establish database connection

// Middleware
app.use(cors(corsOptionsDelegate));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public', 'uploads')));
app.use("/register", require('./routes/api/register'));
app.use("/auth", require('./routes/api/auth'));
app.use('/refresh', require('./routes/api/refresh'));
app.use(verifyJWT);
app.use('/logout', require('./routes/api/logout'));
app.use('/home', require('./routes/api/home'));
app.use('/users', require('./routes/api/landingPage'));
app.use('/admin', require('./routes/api/admin'));
app.use('/admin2', require('./routes/api/admin2'));

// Start the server
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});