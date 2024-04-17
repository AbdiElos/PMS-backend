const db = require("../../config/db");
const User=db.User
const Team=db.Team
const UserRole = db.user_role;
const Roles=db.Roles;
const RolePermissions=db.role_permission

const handleDeleteTeam = async (req, res) => {
    const team_id=req.params.teamId
    try {
      const current_time=new Date()
      const team = await Team.findOne({where:{team_id}});
      await team.update({is_deleted:true,deletedBy:req.id,deletionAt:current_time})
      return res.status(200).json({"message":"Team deleted successfully to recover go to trash page"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleRestoreTeam = async (req, res) => {
    const team_id=req.params.teamId
    try {
        const team = await Team.findOne({where:{team_id}});
        await team.update({is_deleted:false,deletedBy:null,deletionAt:null})
      return res.status(200).json({"message":"Team recovered successfully to view go to original page"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleAllDeletedTeams = async (req, res) => {
    try {
      const teams = await Team.findAll({where:{is_deleted:true},include:[{model:User,as:"TeamDeletedBy",attributes:['user_id','full_name',"img_url","gender"]}],attributes:['team_id','name','deletionAt']});
      if (teams.length==0) {
        return res.status(404).json({ "message": "team not found" });
      }
      return res.status(200).json(teams);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  module.exports={handleDeleteTeam,handleRestoreTeam,handleAllDeletedTeams}