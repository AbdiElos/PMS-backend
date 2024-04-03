const bcrypt = require('bcrypt');
const db = require("../../config/db");
const Role = db.Roles;
const User=db.User
const { v4: uuidv4 } = require('uuid');

const handleNewRole = async (req, res) => {
    const { name} = req.body;
    if (!name) {
      return res.status(400).json({ "message": "Please provide required role name information" });
    }
    try {
      const existingRole = await Role.findOne({ where: { name } });
      if (existingRole) {
        return res.status(409).json({ "message": "role name already exists" });
      }
      const role = await Role.create({
        role_id: uuidv4(),
        name,
      });
      return res.status(201).json({ "message": "New role created", "role": role });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetRoleById = async (req, res) => {
    const { id } = req.params;

    try {
      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ "message": "role not found" });
      }
      return res.status(200).json(role);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleUpdateRole= async (req, res) => {
    const { id } = req.params;
    const { name} = req.body;

    if (!name) {
      return res.status(400).json({ "message": "Please provide role name properly" });
    }
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ "message": "role not found" });
      }
      await role.update({ name});
      return res.status(200).json({ "message": "role updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleDeleteRole = async (req, res) => {
    const { id } = req.params;
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ "message": "role not found" });
      }
      await role.destroy();
      return res.status(200).json({ "message": "role deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  module.exports= {handleNewRole, handleUpdateRole, handleGetRoleById,handleDeleteRole};
