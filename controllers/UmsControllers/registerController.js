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
  

  const duplicateFullName = await User.findOne({ 
    where: { user_id: "9737cc04-e2c7-481b-b925-0dd5cfcc482f" },
    include: [{
      model: Roles, 
      as: 'Roles', 
      
    }]
  });
  console.log("hello !!!!!")
  console.log("user info ==", duplicateFullName.toJSON());


//code to chack association b/n permission and roles
  const permissionWithRoles = await Permission.findOne({ 
    where: { permission_id: 'f7db6156-8937-41d0-8f62-1c516ea6252b' },
    include: [{
      model: Roles, // Assuming Roles is the model for roles
      as: 'Roles', // 
      //attributes: ['role_id', 'name'] 
    }]


  });
  if (!permissionWithRoles) {
    
    console.log("Permission of id 'f7db6156-8937-41d0-8f62-1c516ea6252b' not found.");
    return res.status(404).json({ "message": "Permission 'view_project_2' not found." });
  }
  console.log("Permission with associated roles:", permissionWithRoles.toJSON());

  

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
    await User.create({
      user_id:uuid,
      full_name,
      password: hashedPwd,
      email
      
    });

    return res.status(201).json({ "success": "New user is created user account is ==" ,full_name, password});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server problem" });
  }
};

module.exports = { handleNewUser };
