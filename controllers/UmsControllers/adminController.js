const bcrypt = require('bcrypt');
const db = require("../../config/db");
const user_role =db.user_role
const User = db.User;
const Roles = db.Roles;

const getUser = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const result = await User.findOne({ where: { user_id ,is_deleted:false} });
    if (!result) {
      return res.status(404).json({ "message": "User not found" });
    }
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server error" });
  }
};


const getAllUser = async (req, res) => {
  console.log("getting all users .....");
  try {
    const users = await User.findAll({where:{is_deleted:false}});
    if (!users || users.length === 0) {
      return res.status(404).json({ "message": "No users found" });
    }
    
    return res.status(200).json(users); // Use 200 status code for success
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server error" });
  }
};



const deleteUser = async (req, res) => {
  const full_name = req.params.full_name;
  const role = req.params.role;

  if (!full_name || !role) {
    return res.sendStatus(404);
  }

  try {
    const deleteUser = await User.destroy({ where: { full_name } });
    return res.status(201).json({ "message": `${full_name} deleted successfully` });
  } catch (err) {
    console.error(err);
    return res.status(404).json({ "message": "User can't be deleted" });
  }
};

const editMember = async (req, res) => {
  const user_id = req.params.id;
  console.log(user_id)
  const { full_name,email,gender} = req.body;

  try {
    const result = await User.findOne({ where: { user_id } });
    if (!result) {
      return res.status(404).json({ "message": "User not found" });
    }

    
    if (full_name) result.full_name = full_name;
    if (email) result.email = email;
    if (gender) result.gender = gender;
   //add other atribute here to update

    await result.save();
    return res.status(201).json({ "message": `user account updated` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server problem" });
  }
};
const toggleSuspend = async (req, res) => {
  const user_id = req.params.id;
  try {
    const result = await User.findOne({ where: { user_id } });
    if (!result) {
      return res.status(404).json({ "message": "User not found" });
    }

    result.account_status = !result.account_status; // Remove the space before 'account_status'
    await result.save();

    return res.status(201).json({ "message": `status is updated ` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server problem" });
  }
};
module.exports = {
  getUser,
  deleteUser,
  editMember,
  toggleSuspend,
  getAllUser
};