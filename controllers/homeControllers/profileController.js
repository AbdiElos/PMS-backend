const User = require("../../data/User");
const bcrypt = require("bcrypt");

const getProfile = async (req, res) => {
  console.log(req.username);
  try {
    const user = await User.findOne({ where: { username: req.username } });
    user.refreshToken = '';
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "server problem" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.username } });
    console.log(user);
    const { username, email, password } = req.body;
    console.log(req.body);
    if (username) user.username = username;
  
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