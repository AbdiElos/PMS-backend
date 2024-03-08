
const bcrypt = require("bcrypt");
const db = require("../../config/db");
const User = db.User;
const Roles = db.Roles;
const getProfile = async (req, res) => {
  console.log(req.full_name);
  try {
    const user = await User.findOne({ where: { full_name: req.full_name } });
    user.refreshToken = '';
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "server problem" });
  }
};










const updateProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { full_name: req.full_name } });
    console.log(user);
    const { full_name, email, password } = req.body;
    console.log(req.body);
    if (full_name) user.full_name = full_name;
  
    if (email) user.email = email;
    if (password) {
      const hashedPwd = await bcrypt.hash(password, 10);
      user.password = hashedPwd;
    }
    await user.save();
    console.log(user);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ message: "server problem" });
  }
};

module.exports = { getProfile, updateProfile };