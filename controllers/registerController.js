const bcrypt = require('bcrypt');
const User = require('../data/User');

const handleNewUser = async (req, res) => {
  const { username, firstname, lastname, password, email } = req.body;
  
  if (!username || !password || !firstname || !lastname || !email) {
    return res.status(400).json({ "message": "Incomplete data form" });
  }

  try {
    const duplicate = await User.findOne({ where: { username } });
    if (duplicate) {
      return res.status(409).json({ "message": "Duplicate username" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    await User.create({
      username,
      firstname,
      lastname,
      password: hashedPwd,
      email
    });

    return res.status(201).json({ "success": "New user is created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server problem" });
  }
};

module.exports = { handleNewUser };