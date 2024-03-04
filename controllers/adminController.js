const bcrypt = require('bcrypt');
const User = require('../data/User');
const Activity = require('../data/Activity');


const getUser = async (req, res) => {
  const username = req.params.username;
  try {
    const result = await User.findOne({ where: { username } });
    if (!result) {
      return res.status(404).json({ "message": "User not found" });
    }
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server error" });
  }
};

const getActivity = async (req, res) => {
  const username = req.params.username;
  try {
    const result = await Activity.findAll({ where: { username } });
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server error" });
  }
};

const addUser = async (req, res) => {
  const {
    username, firstname, lastname, password, roles, email
  } = req.body;

  if (!username || !password || !roles || !firstname || !lastname || !email) {
    return res.status(400).json({ "message": "Bad request" });
  }

  try {
    const duplicate = await User.findOne({ where: { username } });
    if (duplicate) {
      return res.sendStatus(409);
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      firstname,
      lastname,
      roles,
   
      
      password: hashedPwd,
      
      email,
    });

    console.log(newUser);
    console.log('New user added');
    return res.status(201).json({ "success": "New username is created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "error": "Server problem" });
  }
};

const deleteUser = async (req, res) => {
  const username = req.params.username;
  const role = req.params.role;

  if (!username || !role) {
    return res.sendStatus(404);
  }

  try {
    const deleteUser = await User.destroy({ where: { username } });
    return res.status(201).json({ "message": `${username} deleted successfully` });
  } catch (err) {
    console.error(err);
    return res.status(404).json({ "message": "User can't be deleted" });
  }
};

const editMember = async (req, res) => {
  const username = req.params.username;
  const { role} = req.body;

  try {
    const result = await User.findOne({ where: { username } });
    if (!result) {
      return res.status(404).json({ "message": "User not found" });
    }

    if (role) result.role = role;

    await result.save();
    return res.status(201).json({ "message": `${username} edited member` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server problem" });
  }
};

const toggleSuspend = async (req, res) => {
  const username = req.params.id;

  try {
    const result = await User.findOne({ where: { username } });
    if (!result) {
      return res.status(404).json({ "message": "User not found" });
    }

    result.suspended = !result.suspended;
    await result.save();

    return res.status(201).json({ "message": `${username} status is updated member` });
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
  toggleSuspend
};