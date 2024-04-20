const bcrypt = require('bcrypt');
const db = require("../../config/db");
const User = db.User;
const { v4: uuidv4 } = require('uuid');
const Permission = db.Permission;
const user_role=db.user_role
const {generateRandomPassword}=require('../../middlewares/generate_password')
const handleNewUser = async (req, res) => {
  const uuid = uuidv4();
  console.log(req.body)
  const { full_name, email,gender,division,role} = req.body;
  const password = generateRandomPassword();

  if (!full_name || !email || !division || !role) {
      return res.status(400).json({ "message": "Incomplete data form" });



      
    }
  try {
    const duplicateEmail = await User.findOne({ where: { email } });
    if (duplicateEmail) {
      return res.status(409).json({ "message": "Duplicate email" });0
    }

    const hashedPwd = await bcrypt.hash(password, 6);
    const unchanged_password= password
    const newUser = await User.create({
      user_id: uuid,
      full_name,
      email,
      gender,
      first_time_status:false, //change this on production
      password:hashedPwd,
      unchanged_password,
      division_id:division
    });
    await user_role.create({
      user_role_id:uuidv4(),
      user_id:uuid,
      role_id:role,
      project_id:"0f33f2fc-fabf-4442-bc7f-5155bce621a5"
    });
    return res.status(201).json({ "success": "New user is created user account is" ,full_name,email,unchanged_password});
  } catch (err) {
    console.error(err)
    try{
      await User.destroy({where:{user_id:uuid}})
    }catch(err){
      console.error(err)
    }
    return res.status(500).json({ "message": "Server problem" });
  }
};
module.exports = { handleNewUser};
