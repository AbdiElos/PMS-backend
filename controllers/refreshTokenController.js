const jwt = require('jsonwebtoken');
const User = require('../data/User');

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
        if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
          {
            userInfo: {
              username: decoded.username,
              roles: roles,
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