const db = require("../../config/db");
const Project = db.Project;
const User=db.User;

const handleDeleteProject = async (req, res) => {
    const project_id=req.params.projectId
    try {
      const project = await Project.findOne({where:{project_id}});
      project.is_deleted=true
      project.deletedBy=req.id
      project.deletionAt=new Date()
      project.save()
      return res.status(200).json({"message":"project deleted successfully to recover go to trash page"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleRestoreProject = async (req, res) => {
    const project_id=req.params.projectId
    try {
      const project = await Project.findOne({where:{project_id}});

      project.is_deleted=false
      project.deletedBy=null
      project.deletionAt=null
      project.save()
      return res.status(200).json({"message":"project recovered successfully to view go to original page"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleAllDeletedProjects = async (req, res) => {
    try {
      const projects = await Project.findAll({where:{is_deleted:true},include:[{model:User,as:"DeletedByProjects",attributes:['user_id','full_name',"img_url","gender"]}],attributes:['project_id','name','deletionAt']});
      if (projects.length==0) {
        return res.status(404).json({ "message": "project not found" });
      }
      return res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  module.exports={handleDeleteProject,handleRestoreProject,handleAllDeletedProjects}