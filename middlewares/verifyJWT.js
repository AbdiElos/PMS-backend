const jwt=require('jsonwebtoken');
require('dotenv').config();

const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers.authorization ||req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token=authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.sendStatus(403);
            req.id=decoded.userInfo.user_id;
            req.roles=decoded.userInfo.Roles;
            next()
        }
    )
}
module.exports =verifyJWT;