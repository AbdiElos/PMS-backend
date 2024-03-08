const bcrypt = require('bcrypt');
<<<<<<< HEAD:controllers/adminController.js
const db = require("../config/db");
const User = db.User;
const Roles = db.Roles;
=======
const User = require('../../data/User');
const Activity = require('../../data/Activity');

>>>>>>> 158dbac6b4a26e7b06db8c69ba19d71d273836b2:controllers/UmsControllers/adminController.js

const getUser = async (req, res) => {
  const full_name = req.params.full_name;
  try {
    const result = await User.findOne({ where: { full_name } });
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
  try {
    const users = await User.findAll();
    if (!users || users.length === 0) {
      return res.status(404).json({ "message": "No users found" });
    }
    return res.status(201).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server error" });
  }
};


const getActivity = async (req, res) => {
  const full_name = req.params.full_name;
  try {
    const result = await Activity.findAll({ where: { full_name } });
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server error" });
  }
};

const addUser = async (req, res) => {
  const {
    full_name, password, roles, email
  } = req.body;

  if (!full_name || !password || !email) {
    return res.status(400).json({ "message": "Bad request" });
  }

  try {
    const duplicate = await User.findOne({ where: { full_name } });
    if (duplicate) {
      return res.sendStatus(409);
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      full_name,
      //roles,
      password: hashedPwd,
      email,
    });

    console.log(newUser);
    console.log('New user added');
    return res.status(201).json({ "success": "New user is created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "error": "Server problem" });
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
  const full_name = req.params.full_name;
  const { role} = req.body;

  try {
    const result = await User.findOne({ where: { full_name } });
    if (!result) {
      return res.status(404).json({ "message": "User not found" });
    }

    if (role) result.role = role;

    await result.save();
    return res.status(201).json({ "message": `${full_name} edited member` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server problem" });
  }
};

const toggleSuspend = async (req, res) => {
  const full_name = req.params.full_name;

  try {
    const result = await User.findOne({ where: { full_name } });
    if (!result) {
      return res.status(404).json({ "message": "User not found" });
    }

    result. account_status = !result. account_status;
    await result.save();

    return res.status(201).json({ "message": `${full_name} status is updated member` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server problem" });
  }
};

module.exports = {
  getUser,
  getActivity,
  addUser,
  deleteUser,
  editMember,
  toggleSuspend,
  getAllUser
};