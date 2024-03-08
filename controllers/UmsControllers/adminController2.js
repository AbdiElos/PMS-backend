const User = require("../../data/User");
const bcrypt = require("bcrypt");

const handleProfileUpdate = async (req, res) => {
  console.log("handle profile update");
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      // Handle case when user is not found
      return res.status(404).json({ message: "User not found" });
    }

    const { full_name,  email, password } = req.body;
   
    if (full_name) user.full_name = full_name;
    if (email) user.email = email;
    if (password) {
      const hashedPwd = await bcrypt.hash(password, 10);
      user.password = hashedPwd;
    }
    await user.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server problem" });
  }
};

module.exports = { handleProfileUpdate };