const bcrypt = require('bcrypt');
const db = require("../../config/db");
const User = db.User;
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const Roles = db.Roles;
const Permission = db.Permission; 
const {generateRandomPassword}=require('../../middlewares/generate_password')
// const User = require('../../models/user');
//const Roles = require('../../models/roles');


const handleNewUser = async (req, res) => {
  const { full_name, email } = req.body;
  const password = generateRandomPassword();

  // Check if this is the first registered account
  const isFirstAccount = (await User.count()) === 0;
  const role = isFirstAccount ? 'Admin' : 'User'; // Assuming 'Admin' and 'User' are valid role names

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

    const hashedPwd = await bcrypt.hash(password, 6);
    const newUser = await User.create({
      user_id: uuid,
      full_name,
      password: hashedPwd,
      email
    });

   
    await Roles.create({
      role_id: uuidv4(),
      user_id: newUser.id,
      name: role
    });

    return res.status(201).json({ "success": "New user is created user account is ==", full_name, password });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server problem" });
  }
};

module.exports = { handleNewUser };