const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../../config/db");
const User = db.User;
const Roles = db.Roles;

const handleChangePassword = async (req, res) => {
  const user_id  = req.params.id;
  const {  current_password, new_password  } = req.body;

  if (!current_password || !new_password) {
    return res.status(400).json({ message: "New password and old password are required" });
  }

  try {
    const foundUser = await User.findOne({
      where: { user_id }
    });

    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const match = await bcrypt.compare (current_password,foundUser.password);
    if (!match) {
      return res.status(401).json({ message: "Wrong current password" });
    }

    const hashedNewPassword = await bcrypt.hash(new_password,6)
    foundUser.password = hashedNewPassword;
    foundUser.unchanged_password=''
    foundUser.first_time_status=true;
    await foundUser.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server problem" });
  }

};

module.exports = { handleChangePassword };