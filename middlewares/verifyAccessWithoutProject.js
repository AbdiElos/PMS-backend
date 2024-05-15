const db = require("../config/db");
const RolePermission=db.role_permission
const verifyAccessWithoutProject=(permission_id)=>{
    return async(req,res,next)=>{

        // console.log(permission_id)
        if(!req?.roles) return res.sendStatus(401);
        const role=req.roles.find(obj=>obj.project_related==false)
        const role_id=role.role_id
        console.log(role)
        console.log(permission_id)
        const permissionExist=await RolePermission.findOne({where:{role_id,permission_id}})
        if(!permissionExist) return res.status(401).json({message:"not authorized for this permission"});
        next();
    }
}
module.exports=verifyAccessWithoutProject;

