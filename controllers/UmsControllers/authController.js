const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../../config/db");
const User = db.User;
const Roles = db.Roles;

const handleAuth = async (req, res) => {
  console.log(req.body);
  
  
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ "message": "Both username and password are required" });
  }
  try {
    const foundUser = await User.findOne({ 
      where: { email }
    });
    
    if (!foundUser) {
      return res.status(400).json({ "message": "email is not available, sign up first" });
    }
    
    if (!foundUser.account_status) {
      return res.status(400).json({ "message": "You are temporarily banned from accessing your account. Please contact us for assistance." });
    }
   // const hashed= await bcrypt.hash(password, 6);
   console.log(password,foundUser.password)
    const match = await bcrypt.compare(password, foundUser.password);
    console.log(match)
    //const match=password==foundUser.password
    if (match) {
      const accessToken = jwt.sign(
        {
          userInfo: foundUser
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
      
      res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.json({ access_token: accessToken, foundUser, status:foundUser.first_time_status });
    } else {
      res.status(401).json({ "message": "Wrong password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ "message": "Server problem" });
  }
};

module.exports = { handleAuth };
