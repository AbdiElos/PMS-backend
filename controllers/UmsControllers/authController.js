const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../data/User');
const Activity = require('../../data/Activity');

const handleAuth = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ "message": "Both username and password are required" });
  }
  
  try {
    const foundUser = await User.findOne({ where: { username } });
    if (!foundUser) {
      return res.status(400).json({ "message": "Username is not available, sign up first" });
    }
    
    if (foundUser.suspended) {
      return res.status(400).json({ "message": "You are temporarily banned from accessing your account. Please contact us for assistance." });
    }
    
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const roles = foundUser.roles;
      const accessToken = jwt.sign(
        {
          userInfo: { 
            username: foundUser.username,
            roles: roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
      );
      
      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );
      
      foundUser.refreshToken = refreshToken;
      await foundUser.save();
      
      const activity = await Activity.create({
        username: username,
        activity: 'logged in',
        time: new Date()
      });
      console.log(activity);

      res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.json({ access_token: accessToken, foundUser });
    } else {
      res.status(401).json({ "message": "Wrong password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ "message": "Server problem" });
  }
};

module.exports = { handleAuth };