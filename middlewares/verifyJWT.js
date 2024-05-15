const jwt=require('jsonwebtoken');
require('dotenv').config();

const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers.authorization ||req.headers.Authorization;
    console.log(authHeader)
    if(!authHeader?.startsWith('Bearer ')) return res.status(401).json({message:"token required"});
    const token=authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.status(401).json({message:"incorrect access token"});
            req.id=decoded.userInfo.user_id;
            req.division_id=decoded.userInfo.division_id
            req.roles=decoded.userInfo.Roles;
            next()
        }
    )
}
module.exports =verifyJWT;