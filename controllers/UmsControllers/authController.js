const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../../config/db");
const User = db.User;
const Roles = db.Roles;
//const Activity = db.Activity;

const handleAuth = async (req, res) => {
  console.log(req.body);
  
  
  const { full_name, password } = req.body;
  if (!full_name || !password) {
    return res.status(400).json({ "message": "Both username and password are required" });
  }
  
  try {
    const foundUser = await User.findOne({ 
      where: { full_name }
    });
    
    if (!foundUser) {
      return res.status(400).json({ "message": "full_name is not available, sign up first" });
    }
    
    // if (!foundUser.account_status) {
    //   return res.status(400).json({ "message": "You are temporarily banned from accessing your account. Please contact us for assistance." });
    // }
    
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const accessToken = jwt.sign(
        {
          userInfo: { 
            full_name: foundUser.full_name
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
      );
      
      const refreshToken = jwt.sign(
        { full_name: foundUser.full_name },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );
      
      foundUser.refreshToken = refreshToken;
      await foundUser.save();
      
     /* const activity = await Activity.create({
        full_name: full_name,
        activity: 'logged in',
        time: new Date()
      });
      console.log(activity);*/

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
