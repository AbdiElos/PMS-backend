const User=require('../data/User');
// const { el } = require('date-fns/locale');
const getUser=async (req,res)=>{
    var isFavored;
    if(!req?.params?.username){
        return res.status(400).json({"message":" username is required"})
    }
    const user= await User.findOne({ username:req.params.username}).exec();
    if(!user){
        return res.status(204).json({"message":"No user matches the username"})
    }
    const checkFav=user.favoredBy.find((item)=>req.username==item)
    console.log(checkFav)
    if(checkFav){
        isFavored=true
    }else{
        isFavored=false
    }
    user.password="";
    res.status(200).json({user,isFavored});
};

module.exports={getUser}


