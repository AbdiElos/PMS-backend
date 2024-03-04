const User=require('../data/User');
const Activity=require('../data/Activity')
const handleLogout= async (req,res)=>{
    // delete access token in the front end
    const cookie=req.cookies;
    console.log(req.username)
    const result2=await Activity.create({
        "username":req.username,
        "activity":"logged off",
        "time":Date()
    })
    console.log(result2);
    if(!cookie?.jwt) return res.sendStatus(204); // no content successfull message
    const refreshToken=cookie.jwt;
    //is there refresh token in the db
    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser){ 
        res.clearCookie('jwt',{ httpOnly:true});
        return res.sendStatus(204);
    }

    // Delete refresh token
    foundUser.refreshToken='';
    const result= await foundUser.save();
    console.log("logged off")
    res.clearCookie('jwt',{httpOnly:true})       // secure:true  only serves on https
    res.sendStatus(204);
}

module.exports={handleLogout};