const db = require("../../config/db");
const User=db.User
const UserRole = db.user_role;
const ProjectMembers=db.Project_member;
const MajorTaskMembers=db.Major_task_member
const SubtaskMembers=db.Sub_task_member

const handleDeleteUser = async (req, res) => {
    const user_id=req.params.userId
    try {
      const current_time=new Date()
      const user = await User.findOne({where:{user_id}});
      await user.update({is_deleted:true,deletedBy:req.id,deletionAt:current_time})
      const user_roles=await UserRole.findAll({where:{user_id}})
      user_roles.forEach(async(row) => {await row.update({ is_deleted: true,deletedBy:req.id,deletionAt:current_time })})
      const project_members=await ProjectMembers.findAll({where:{user_id}})
      project_members.forEach(async(row)=>{
        await row.update({is_deleted:true,deletedBy:req.id,deletionAt:current_time})
        //elliminate major task members,subtask ,task , activity member based on row.project_member_id
    })

      return res.status(200).json({"message":"user deleted successfully to recover go to trash page"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleRestoreUser = async (req, res) => {
    const user_id=req.params.userId
    try {
      const user = await User.findOne({where:{user_id}});
      await user.update({is_deleted:false,deletedBy:null,deletionAt:null})
      const user_roles=await UserRole.findAll({where:{user_id}})
      user_roles.forEach(async(row) => {await row.update({ is_deleted: false,deletedBy:null,deletionAt:null })})
      const project_members=await ProjectMembers.findAll({where:{user_id}})
      project_members.forEach(async(row)=>{
        await row.update({is_deleted:false,deletedBy:null,deletionAt:null})
        //recover major task members,subtask ,task , activity member based on row.project_member_id
    })
      return res.status(200).json({"message":"user recovered successfully to view go to original page"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleAllDeletedUsers = async (req, res) => {
    try {
      const users = await User.findAll({where:{is_deleted:true},include:[{model:User,as:"UserDeletedBy",attributes:['user_id','full_name',"img_url","gender"]}],attributes:['user_id','full_name','deletionAt']});
      if (users.length==0) {
        return res.status(404).json({ "message": "user not found" });
      }
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  module.exports={handleDeleteUser,handleRestoreUser,handleAllDeletedUsers}