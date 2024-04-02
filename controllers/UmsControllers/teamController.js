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
      const existingTeam = await Team.findOne({ where: { name } });
      if (existingTeam) {
        return res.status(409).json({ "message": "team name already exists" });
      }
      const team = await Team.create({
        team_id: uuidv4(),
        name,
        description,
        team_manager_id,
        // division_id:req.division,
        // created_by:req.id
      });
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
      return res.status(200).json({ "message": "team is updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
const handleGetAllTeams = async (req, res) => {
    try {
      var teams = await Team.findAll({include:{
        model:User,
        as:"Users",
        attributes:['user_id','full_name','img_url']
      },attributes:['team_id','name','description','team_manager_id']});
      const newTeams=[]
      for(const team of teams){
        const newTeam={}
        var user=await User.findByPk(team.team_manager_id)
        newTeam.manager_img=user.dataValues.img_url
        newTeam.manager_name=user.dataValues.full_name
        newTeam.name=team.name
        newTeam.description=team.description
        newTeam.team_id=team.team_id
        newTeam.manager_id=team.team_manager_id
        newTeam.users=team.Users
        newTeams.push(newTeam)
      }
      return res.status(200).json(newTeams);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

const handleGetTeamById = async (req, res) => {
    const { id } = req.params;
    try {
      const team = await Team.findByPk(id);
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