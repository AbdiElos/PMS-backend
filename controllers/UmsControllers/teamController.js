const db = require("../../config/db");
const Team=db.Team
const User = db.User;
const { v4: uuidv4 } = require('uuid');

const handleNewTeam = async (req, res) => {
    const { name,description,team_manager_id } = req.body;
    if (!name || !description || !team_manager_id) {
      return res.status(400).json({ "message": "Please provide team info properly" });
    }
    try {
      const team_id=uuidv4()
      const existingTeam = await Team.findOne({ where: { name } });
      if (existingTeam) {
        return res.status(409).json({ "message": "team name already exists" });
      }
      const team = await Team.create({
        team_id,
        name,
        description,
        team_manager_id,
        // division_id:req.division,
        // created_by:req.id
      });
      const manager= await User.findOne({where:{user_id:team_manager_id}})
      await manager.update({team_id})
      return res.status(201).json({ "message": "New team created", "team": team });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleUpdateTeam = async (req, res) => {
    const { id } = req.params;
    const { name,description,team_manager_id } = req.body;
    if (!name || !description || !team_manager_id) {
      return res.status(400).json({ "message": "Please provide team info properly" });
    }

    try {
      const team = await Team.findByPk(id);
      if (!team) {
        return res.status(404).json({ "message": "team not found" });
      }
      await team.update({name,description,team_manager_id});
      const manager=await User.findOne({where:{user_id:team_manager_id}})
      await manager.update({team_id:id})
      return res.status(200).json({ "message": "team is updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
const handleGetAllTeams = async (req, res) => {
    try {
      var teams = await Team.findAll({where:{is_deleted:false},
        include:[{model:User,as:"teamMembers",attributes:['user_id','full_name','img_url',"gender"]
      },{model:User,as:"ManagedBy",attributes:['user_id',"full_name","img_url","gender","email"]}],
     attributes:['team_id',"name","description","team_manager_id","created_by"]});
      return res.status(200).json(teams);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

const handleGetTeamById = async (req, res) => {
    const { id } = req.params;
    try {
      const team = await Team.findOne({where:{team_id:id,is_deleted:false},
        include:[{model:User,as:"teamMembers",attributes:['user_id','full_name','img_url',"gender"]
      },{model:User,as:"ManagedBy",attributes:['user_id',"full_name","img_url","gender","email"]}],
     attributes:['team_id',"name","description","team_manager_id","created_by"]});
      if (!team) {
        return res.status(404).json({ "message": "team not found" });
      }
      return res.status(200).json(team);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleAddUserToTeam = async (req, res) => {
    const { id } = req.params;
    const { user_id} = req.body;

    if (!user_id) {
      return res.status(400).json({ "message": "Please provide user id properly" });
    }
    try {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ "message": "user not found" });
      }

      await user.update({ team_id:id});
      return res.status(200).json({ "message": "user team is updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  
  module.exports={handleNewTeam,handleGetAllTeams,handleGetTeamById,handleAddUserToTeam,handleUpdateTeam}
