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

  const duplicateFullName =  await User.findOne({ where: { user_id:"b7353b88-429d-4b74-a30a-6ffa375d8a21" } },{ include: Roles });
  console.log("user info ==",duplicateFullName)

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
