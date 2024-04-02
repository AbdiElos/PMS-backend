const bcrypt = require('bcrypt');
const db = require("../../config/db");
const Team = db.Team;
const User=db.User
const { v4: uuidv4 } = require('uuid');

const handleNewTeam = async (req, res) => {
    const { name,description,team_manager_id } = req.body;
    if (!name || !description || !team_manager_id) {
      return res.status(400).json({ "message": "Please provide required team information" });
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
        team_manager_id
      });
      return res.status(201).json({ "message": "New team created", "team": team });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetAllTeams = async (req, res) => {
    try {
      const teams = await Team.findAll();
      return res.status(200).json(teams);
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

  const handleUpdateTeam = async (req, res) => {
    const { id } = req.params;
    const { name,description,team_manager_id} = req.body;

    if (!name || !description || !team_manager_id) {
      return res.status(400).json({ "message": "Please provide team name, description and manager properly" });
    }
    try {
      const team = await Team.findByPk(id);
      if (!team) {
        return res.status(404).json({ "message": "team not found" });
      }
      await team.update({ name,description,team_manager_id });
      return res.status(200).json({ "message": "team updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleDeleteTeam = async (req, res) => {
    const { id } = req.params;

    try {
      const team = await Team.findByPk(id);
      if (!team) {
        return res.status(404).json({ "message": "team not found" });
      }
      await team.destroy();
      return res.status(200).json({ "message": "team deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const AddUserToTeam = async (req, res) => {
    const { id } = req.params;
    const {user_id}=req.body
    try {
      if (!user_id) {
        return res.status(400).json({ "message": "Please provide user id properly" });
      }
      const user=await User.findByPk(user_id)
      if(!user){
        return res.status(404).json({"message":"user not found"})
      }
      const team = await Team.findByPk(id);
      if (!team) {
        return res.status(404).json({ "message": "team not found" });
      }
      await user.update({team_id:id});
      return res.status(200).json({ "message": "user team changed" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  module.exports= {handleNewTeam, handleGetAllTeams,handleGetTeamById,handleUpdateTeam,handleDeleteTeam,AddUserToTeam };
