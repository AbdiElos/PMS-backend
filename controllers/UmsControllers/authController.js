const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../../config/db");
const User = db.User;
const Roles = db.Roles;
const User_role = db.User_role; // Assuming this is the model representing the many-to-many relationship between users and roles

const handleAuth = async (req, res) => {
  console.log(req.body);
  
  const { full_name, password } = req.body;
  if (!full_name || !password) {
    return res.status(400).json({ "message": "Both username and password are required" });
  }
  
  try {
    // Step 1: Retrieve user information from the User table
    const foundUser = await User.findOne({ 
      where: { full_name }
    });
    
    if (!foundUser) {
      return res.status(400).json({ "message": "full_name is not available, sign up first" });
    }
    
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      // Step 2: Use the obtained user_id to fetch associated role IDs from the intermediate table
      const User_roleEntries = await User_role.findAll({
        where: { user_id: foundUser.user_id }
      });

      // Step 3: Fetch role information from the Roles table based on the role IDs
      const roleIds = User_roleEntries.map(entry => entry.role_id);
      const roles = await Roles.findAll({
        where: { id: roleIds }
      });

      const accessToken = jwt.sign(
        {
          userInfo: { 
            user_id: foundUser.user_id,
            full_name: foundUser.full_name,
            roles: roles.map(role => role.role_name) // Extracting role names
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
      );
      
      const refreshToken = jwt.sign(
        { user_id: foundUser.user_id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );
      
      foundUser.refreshToken = refreshToken;
      await foundUser.save();
      
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
