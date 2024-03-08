const bcrypt = require('bcrypt');
<<<<<<< HEAD:controllers/registerController.js
const db = require("../config/db");
const User = db.User;
const Roles = db.Roles;
=======
const User = require('../../data/User');
>>>>>>> 158dbac6b4a26e7b06db8c69ba19d71d273836b2:controllers/UmsControllers/registerController.js

const handleNewUser = async (req, res) => {
  const { full_name, password, email } = req.body;

  if (!full_name || !password || !email ) {
    return res.status(400).json({ "message": "Incomplete data form" });
  }

  try {
    const duplicateEmail = await User.findOne({ where: { email } });
    if (duplicateEmail) {
      return res.status(409).json({ "message": "Duplicate email" });
    }

    const duplicateFullName = await User.findOne({ where: { full_name } });
    if (duplicateFullName) {
      return res.status(409).json({ "message": "Duplicate full name" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    await User.create({
      full_name,
      password: hashedPwd,
      email
      
    });

    return res.status(201).json({ "success": "New user is created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server problem" });
  }
};

module.exports = { handleNewUser };
