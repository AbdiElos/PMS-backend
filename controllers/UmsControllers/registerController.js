const bcrypt = require('bcrypt');
const db = require("../../config/db");
const User = db.User;
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const Roles = db.Roles;
// const User = require('../../models/user');
//const Roles = require('../../models/roles');

const handleNewUser = async (req, res) => {
  const { full_name, password, email } = req.body;

  const duplicateFullName = await User.findOne({ 
    where: { user_id: "9737cc04-e2c7-481b-b925-0dd5cfcc482f" },
    include: [{
      model: Roles, // Assuming Roles is the model for roles
      as: 'Roles', // This should match the alias you've defined in the association
      // attributes: ['role_id','name'] // Specify the attributes you want to include from the Roles table
    }]
  });
  console.log("hello !!!!!")
  console.log("user info ==", duplicateFullName.toJSON());
  

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
      user_id:uuid,
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
