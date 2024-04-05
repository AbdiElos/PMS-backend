const db = require("../../config/db");
const User = db.User;
const Division = db.Division;
const Roles=db.Roles;
const Permission=db.Permission
const RolePermissions=db.role_permission
const { v4: uuidv4 } = require('uuid');


const handleNewRole = async (req, res) => {
  var { name, permissions } = req.body;
  if (typeof permissions !== 'string') {
    permissions = String(permissions); // Convert to a string if it's not already
  }
  permissions = permissions.split(",");
    console.log(permissions.length)
    if (!name) {
      return res.status(400).json({ "message": "Please provide role info properly" });
    }
    if (!permissions || permissions.length === 0) {
      return res.status(400).send('No permissions checkbox are selected.');
    }
    const uuid=uuidv4()
    try {
      const existingRole = await Roles.findOne({ where: { name } });
      if (existingRole) {
        return res.status(409).json({ "message": "role name already exists" });
      }
      const role = await Roles.create({
        role_id: uuid,
        name,
        project_related:true,
        // created_by:req.id,
      });
      for (const value of permissions){
        await RolePermissions.create({
          role_permission_id:uuidv4(),
          role_id:uuid,
          permission_id:value,
          // created_by:req.id
        })}
      // const permission=await RolePermissions.bulkCreate(rolePermissions)
      return res.status(201).json({ "message": "New role is created", "role": role});
    } catch (error) {
      console.error(error);
      try{
        await RolePermissions.destroy({where:{role_id:uuid}})
        await Roles.destroy({where:{role_id:uuid}}) 
        
        return res.status(400).json({"message":"permission id error"})
      }catch(error){
        return res.status(500).json({ "message": "Server error from roles" });
      }
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetAllProjectRelatedRole= async (req, res) => {
    try {
      const roles = await Roles.findAll({where:{project_related:true}});
      return res.status(200).json(roles);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  }
  const handleGetAllRole= async (req, res) => {
    try {
      const roles = await Roles.findAll();
      return res.status(200).json(roles);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  }
  const handleGetAllPermissions= async (req, res) => {
    try {
      const permissions = await Permission.findAll();
      
      return res.status(200).json(permissions);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  }

  const handleGetAllPermissionsOfRole= async (req, res) => {
    const id=req.params.id
    console.log(id)
    try {
      const role=await Roles.findOne({where:{role_id:id},include:[{model:Permission,as:"Permissions",attributes:{exclude:["createdAt","updatedAt"]}}],attributes:["role_id","name"]})
      console.log(role)
      if(!role){
        return res.status(400).json({"message":"role not found"})
      }
      return res.status(200).json(role);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  }
  const handleUpdateRole = async (req, res) => {
    const {id}=req.params
    var { name,permissions} = req.body;
    permissions=permissions.split(",")
    console.log(permissions.length)
    if (!name) {
      return res.status(400).json({ "message": "Please provide role info properly" });
    }
    if (!permissions || permissions.length === 0) {
      return res.status(400).send('No permissions checkbox are selected.');
    }
    const uuid=uuidv4()
    try {
      const existingRole = await Roles.findOne({ where: { role_id:id } });
      if (!existingRole) {
        return res.status(401).json({ "message": "role not found" });
      }
      await RolePermissions.destroy({where: {role_id:id}})
      for (const value of permissions){
        console.log("permission value",value)
        await RolePermissions.create({
          role_permission_id:uuidv4(),
          role_id:id,
          permission_id:value,
          // updated_by:req.id
        })
      };
      return res.status(201).json({ "message": "role updated"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  module.exports={handleNewRole,handleGetAllProjectRelatedRole,handleGetAllRole,handleGetAllPermissions,handleGetAllPermissionsOfRole,handleUpdateRole}