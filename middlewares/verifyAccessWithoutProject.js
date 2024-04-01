
const verifyAccessWithoutProject=(Permission_id)=>{
    return (req,res,next)=>{
        if(!req?.roles) return res.sendStatus(401);
        const roles=req.roles
        console.log(roles)
        if(!result) return res.sendStatus(401);
        next();
    }
}
module.exports=verifyAccessWithoutProject;

