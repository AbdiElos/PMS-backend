const db = require("../../config/db");
const Project = db.Project;
const User=db.User;
const Document =db.Document
const DocumentType=db.Document_type
const ProjectMembers=db.Project_member
const Milestone=db.Milestone
const UserRole=db.user_role
const Roles=db.Roles

const handleDeleteProject = async (req, res) => {
    const project_id=req.params.projectId
    try {
      const project = await Project.findOne({where:{project_id}});

      project.is_deleted=true
    //   project.deletedBy=req.id
      project.deletedAt=new Date()
      project.save()
      return res.status(200).json({"message":"project deleted successfully to recover go to trash page"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  module.exports={handleDeleteProject}