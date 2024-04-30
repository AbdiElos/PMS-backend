const db = require("../../config/db");
const User = db.User;
const Division = db.Division;
const Sector=db.sector
const Roles=db.Roles;
const Sequelize = require('sequelize');
const Permission=db.Permission
const { v4: uuidv4 } = require('uuid');
const division = require("../../models/division");
const uuid = uuidv4();


const handleNewDivision = async (req, res) => {
    if(req.body.head_id)var head_id=req.body.head_id
    const { name,sector_id} = req.body;
    if (!name || !sector_id) {
      return res.status(400).json({ "message": "Please provide division info properly" });
    }
    try {
      const existingDivision = await Division.findOne({ where: { name } });
      if (existingDivision) {
        return res.status(409).json({ "message": "division name already exists" });
      }
      const division = await Division.create({
        division_id: uuidv4(),
        sector_id,
        head_id,
        name
      });
      return res.status(201).json({ "message": "New division created", "division": division });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetAllDivision = async (req, res) => {
    try {
      const division = await Division.findAll({where:{is_deleted:false},
        include:[{model:User,as:"Users",attributes:['user_id',"full_name","img_url","email","gender"]},{model:Sector,as:"Sector",attributes:["sector_id","name"]}]});
      return res.status(200).json(division);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetDivisionById = async (req, res) => {
    const { id } = req.params;
    try {
      const division = await Division.findOne({where:{is_deleted:false,division_id:id},
        include:[{model:User,as:"Users",attributes:['user_id',"full_name","img_url","email","gender"]},{model:Sector,as:"Sector",attributes:["sector_id","name"]}]});
      if (!division) {
        return res.status(404).json({ "message": "division not found" });
      }
      return res.status(200).json(division);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleUpdateDivision = async (req, res) => {
    const { id } = req.params;
    const { name,sector_id,head_id} = req.body;

    if (!name || !sector_id || !head_id) {
      return res.status(400).json({ "message": "Please provide division name, sector and head properly" });
    }
    try {
      const division = await Division.findByPk(id);
      if (!division) {
        return res.status(404).json({ "message": "division not found" });
      }
      await division.update({ name,sector_id,head_id });
      return res.status(200).json({ "message": "Division updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };


  // handle all roles
  const handleGetAllDefaultRole= async (req, res) => {
    console.log("getting roles ....")
    try {
      const excludedValues = [process.env.ORGANIZATION_ADMIN, process.env.SECTOR_ADMIN];
      const roles = await Roles.findAll({where:{project_related:false,role_id: {
        [Sequelize.Op.notIn]: excludedValues
      }}});
      return res.status(200).json(roles);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  }
  const handleGetAllUsersInDivision= async (req, res) => {
    console.log("users in certain division called")
    const id=req.params.id;
    try {
      const users = await Division.findAll({
        where: { division_id:id },
        include: [
          {
            model: User,
            as: 'Users',
            attributes: ['user_id','full_name', 'email'],
          },
        ],
        attributes: ['division_id', 'name'],
      });
      console.log(users)
      return res.status(200).json(users)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  module.exports= { handleGetAllUsersInDivision, handleGetAllDefaultRole,handleNewDivision, handleGetAllDivision, handleGetDivisionById, handleUpdateDivision };
