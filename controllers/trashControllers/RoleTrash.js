const db = require("../../config/db");
const User=db.User
const UserRole = db.user_role;
const Roles=db.Roles;
const RolePermissions=db.role_permission

const handleDeleteRole = async (req, res) => {
    const role_id=req.params.roleId
    try {
      const current_time=new Date()
      const role = await Roles.findOne({where:{role_id}});
      role.is_deleted=true
      role.deletedBy=req.id
      role.deletionAt=current_time
      role.save()
      const user_roles=await UserRole.findAll({where:{role_id}})
      user_roles.forEach(async(row) => {await row.update({ is_deleted: true,deletedBy:req.id,deletionAt:current_time })})
      const role_permissions=await RolePermissions.findAll({where:{role_id}})
      role_permissions.forEach(async(row) => {await row.update({ is_deleted: true,deletedBy:req.id,deletionAt:current_time })})
      return res.status(200).json({"message":"role deleted successfully to recover go to trash page"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleRestoreRole = async (req, res) => {
    const role_id=req.params.roleId
    try {
        const role = await Roles.findOne({where:{role_id}});
        await role.update({is_deleted:false,deletedBy:null,deletionAt:null})
        const user_roles=await UserRole.findAll({where:{role_id}})
        user_roles.forEach(async(row) => {await row.update({ is_deleted: false,deletedBy:null,deletionAt:null })})
        const role_permissions=await RolePermissions.findAll({where:{role_id}})
        role_permissions.forEach(async(row) => {await row.update({ is_deleted: false,deletedBy:null,deletionAt:null })})
      return res.status(200).json({"message":"role recovered successfully to view go to original page"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleAllDeletedRoles = async (req, res) => {
    try {
      const roles = await Roles.findAll({where:{is_deleted:true},include:[{model:User,as:"RoleDeletedBy",attributes:['user_id','full_name',"img_url","gender"]}],attributes:['role_id','name','deletionAt']});
      if (roles.length==0) {
        return res.status(404).json({ "message": "Role not found" });
      }
      return res.status(200).json(roles);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  module.exports={handleDeleteRole,handleRestoreRole,handleAllDeletedRoles}