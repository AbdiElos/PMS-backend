
const verifyRoles=(permission_id)=>{
    return (req,res,next)=>{
        if(!req?.roles) return res.sendStatus(401);
        const roles=req.roles
        console.log(req.roles);
        const rolesArray=[...allowedRoles];
        console.log(rolesArray);
        const result = req.roles.map(role=>rolesArray.includes(role)).find(val=>val===true);
        if(!result) return res.sendStatus(401);
        next();
    }
}


module.exports=verifyRoles;

