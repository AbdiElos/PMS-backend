const allowOrigins=require('../config/allowedOrigins');
const db=require("../config/db")
const Organization=db.Organization
const checkIfOrganizationExists=async(req,res,next)=>{
    try{
        const exists=await Organization.findAll()
        if(exists){
            return res.status(400).json({"message":"organization already exists"})
        }
        next();
    }catch(error){
    console.log(error)
    return res.status(500).json({"message":"server error"})
}
}
module.exports={checkIfOrganizationExists};