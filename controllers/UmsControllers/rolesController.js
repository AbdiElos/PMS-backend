const db = require("../../config/db");
const User = db.User;
const Division = db.Division;
const Roles=db.Roles;
const Permission=db.Permission
const RolePermissions=db.role_permission
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();


const handleNewRole = async (req, res) => {
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
        console.log("permission value",value)
        await RolePermissions.create({
          role_permission_id:uuidv4(),
          role_id:uuid,
          permission_id:value,
          // created_by:req.id
        })
      };

      // const permission=await RolePermissions.bulkCreate(rolePermissions)
      return res.status(201).json({ "message": "New role is created", "role": role});
    } catch (error) {
      console.error(error);
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
    try {
      const permissions = await RolePermissions.findAll({
        where:{role_id:id},
        include:[{
          model:Permission,
          as:"Permissions"
        }]
      });
      return res.status(200).json(permissions);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  }


  module.exports={handleNewRole,handleGetAllProjectRelatedRole,handleGetAllRole,handleGetAllPermissions}