require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql' // Ensure this is set to 'mysql' if you're using MySQL
  },
  // Add similar configurations for other environments if needed (e.g., test, production)
};
