const bcrypt = require('bcrypt');
const db = require("../../config/db");
const User = db.User;
const { v4: uuidv4 } = require('uuid');
const Permission = db.Permission;
const user_role=db.user_role
const {generateRandomPassword}=require('../../middlewares/generate_password')
const handleNewUser = async (req, res) => {
  const uuid2=uuidv4()
  const uuid = uuidv4();
  console.log(req.body)
  const { full_name, email,gender,division,role} = req.body;
  // const isFirstAccount = (await User.count()) === 0;
  // const role_id = isFirstAccount ? "3dba29ec-e51c-11ee-9ec0-c01803d47480" : "7078a968-e51c-11ee-9ec0-c01803d47480";
  const password = generateRandomPassword();

  if (!full_name || !email || !division || !role) {
      return res.status(400).json({ "message": "Incomplete data form" });
    }
  try {
    const duplicateEmail = await User.findOne({ where: { email } });
    if (duplicateEmail) {
      return res.status(409).json({ "message": "Duplicate email" });
    }

    const hashedPwd = await bcrypt.hash(password, 6);
    const unchanged_password= password
    const newUser = await User.create({
      user_id: uuid,
      full_name,
      email,
      gender,
      password:hashedPwd,
      unchanged_password,
      division_id:division
    });
    await user_role.create({
      user_role_id:uuid2,
      user_id:uuid,
      role_id:role
    });
    return res.status(201).json({ "success": "New user is created user account is" ,full_name,email,unchanged_password});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server problem" });
  }
};
module.exports = { handleNewUser};
