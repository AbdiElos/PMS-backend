const jwt = require('jsonwebtoken');
<<<<<<< HEAD:controllers/refreshTokenController.js
const db = require("../config/db");
const User = db.User;
=======
const User = require('../../data/User');
>>>>>>> 158dbac6b4a26e7b06db8c69ba19d71d273836b2:controllers/UmsControllers/refreshTokenController.js

const handleRefreshToken = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(401);
  const refreshToken = cookie.jwt;
  try {
    const foundUser = await User.findOne({ where: { refreshToken } });
    if (!foundUser) return res.sendStatus(401);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.full_name !== decoded.full_name) return res.sendStatus(403);
        const accessToken = jwt.sign(
          {
            userInfo: {
              full_name: decoded.full_name,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '60s' }
        );
        res.json({ accessToken });
      }
    );
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = { handleRefreshToken };