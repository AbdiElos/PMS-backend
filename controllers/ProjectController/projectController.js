const db = require("../../config/db");
const Project = db.Project;
const User=db.User;
const Document =db.Document
const DocumentType=db.Document_type
const ProjectMembers=db.Project_member
const Milestone=db.Milestone
const { v4: uuidv4, validate: isValidUUID } = require('uuid');
const user_role = require("../../models/user_role");
const UserRole=db.user_role
const Roles=db.Roles
require('dotenv').config()

const handleNewProject = async (req, res) => {
    console.log("project body")
    const { name,project_managers,technical_managers,start_date,end_date,document_type_id,document_description,members,division_id } = req.body;
    if (!name || !start_date || !end_date || !document_type_id || !project_managers || !technical_managers || !members||!division_id ) {
      return res.status(400).json({ "message": "Please provide required project information" });
    }

    console.log("members===",members)
    const uuid=uuidv4()
    try {
      var allMembers=members+","+project_managers+","+technical_managers;
      allMembers=allMembers.split(",")
      var newmembers=members.split(",")
      var newproject_managers=project_managers.split(",")
      var newtechnical_managers=technical_managers.split(",")
      console.log(newmembers,newproject_managers,newtechnical_managers)
      const existingProject = await Project.findOne({ where: { name:name } });
      if (existingProject) {
        return res.status(409).json({ "message": "project name already exists" });
      }
      const existingDocumentType = await DocumentType.findOne({ where: { document_type_id } });
      if (!existingDocumentType) {
        return res.status(400).json({ "message": "document type not found" });
      }
      const project = await Project.create({
        project_id: uuid,
        name,
        overall_progress:"Process",
        start_date,
        end_date,
        division_id
      });
      console.log("creating project managers")
      for(let i=0; i<newproject_managers.length; i++){
        const projectManager=await UserRole.create({
          user_role_id:uuidv4(),
          user_id:newproject_managers[i],
          project_id:uuid,
          role_id:process.env.PROJECT_MANAGER
        })
      }
      //creates technical managers
      console.log("creating technical managers")
      for(let i=0; i<newtechnical_managers.length; i++){
        const technicalManager=await UserRole.create({
          user_role_id:uuidv4(),
          user_id:newtechnical_managers[i],
          project_id:uuid,
          role_id:process.env.TECHNICAL_MANAGER
        })
      }
      //creates project members
      for(let i=0; i<newmembers.length; i++){
        const memberRole=await UserRole.create({
          user_role_id:uuidv4(),
          user_id:newmembers[i],
          project_id:uuid,
          role_id:process.env.PROJECT_MEMBER
        })
      }
      //creates all members
      for(let i=0; i<allMembers.length; i++){
          const projectMember=await ProjectMembers.create({
            project_member_id: uuidv4(),
            user_id:allMembers[i],
            
            project_id:uuid
          });
        }
        
    for(let i=0; i<req.files.length; i++){
        const documents=await Document.create({
          document_id: uuidv4(),
          document_type_id,
          project_id:uuid,
          document:req.files[i].filename,
          description:document_description
        });
      }
      return res.status(201).json({ "message": "New project created", "project": project });
    } catch (error) {
      try{
        await Document.destroy({where:{project_id:uuid}})
        await UserRole.destroy({where:{project_id:uuid}})
        await ProjectMembers.destroy({where:{project_id:uuid}})
        await Milestone.destroy({where:{project_id:uuid}})
        await Project.destroy({where:{project_id:uuid}})
      }catch(error){
        console.log("project info deleted")
        return res.status(501).json({ "message": "project is deleted error" });
      }
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetAllProjects = async (req, res) => {
    try {
      const projects = await Project.findAll({include:[{model:Roles,as:"ProjectRoles",include:[{model:User,as:"Users",attributes:["user_id","full_name","img_url","gender"]}],attributes:["role_id","name"]}],attributes:["project_id","name","overall_progress","start_date","end_date","createdAt"]});
      return res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetProjectById = async (req, res) => {
    const project_id = req.params.projectId;
    try {
      const project = await Project.findOne({where:{project_id,is_deleted:false},include:[{model:Roles,as:"ProjectRoles",include:[{model:User,as:"Users"}]}]});
      if (!project) {
        return res.status(404).json({ "message": "project not found" });
      }
      return res.status(200).json(project);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleGetProjectMemberById = async (req, res) => {
    const  id  = req.params.projectId;
    try {
      const projectMembers = await ProjectMembers.findAll({where:{project_id:id,is_deleted:true},include:[{model:User,as:"UserInfo"}]});
      if (!projectMembers) {
        return res.status(404).json({ "message": "project not found" });
      }
      return res.status(200).json(projectMembers);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleUpdateProject = async (req, res) => {
    const  project_id= req.params.projectId;
    const {name,project_managers,technical_managers,start_date,end_date,members} = req.body;

    if (!name || !start_date || !end_date || !project_managers || !technical_managers || !members || !project_id) {
      return res.status(400).json({ "message": "Please provide project id, name, start_date, end_date, properly" });
    }
    try {
      var allMembers=members+","+project_managers+","+technical_managers;
      allMembers=allMembers.split(",")
      var newmembers=members.split(",")
      var newproject_managers=project_managers.split(",")
      var newtechnical_managers=technical_managers.split(",")
      const project = await Project.findByPk(project_id);
      if (!project) {
        return res.status(404).json({ "message": "project not found" });
      }
      await project.update(name,start_date,end_date)

      //delete old members and create new members
      await UserRole.destroy({where:{project_id}})
      console.log("creating project managers")
      for(let i=0; i<newproject_managers.length; i++){
        const projectManager=await UserRole.create({
          user_role_id:uuidv4(),
          user_id:newproject_managers[i],
          project_id,
          role_id:process.env.PROJECT_MANAGER
        })
      }
      //creates technical managers
      console.log("creating technical managers")
      for(let i=0; i<newtechnical_managers.length; i++){
        const technicalManager=await UserRole.create({
          user_role_id:uuidv4(),
          user_id:newtechnical_managers[i],
          project_id,
          role_id:process.env.TECHNICAL_MANAGER
        })
      }
      //creates project members
      for(let i=0; i<newmembers.length; i++){
        const memberRole=await UserRole.create({
          user_role_id:uuidv4(),
          user_id:newmembers[i],
          project_id,
          role_id:process.env.PROJECT_MEMBER
        })
      }
      //creates all members
      for(let i=0; i<allMembers.length; i++){
        const member=await ProjectMembers.findOne({where:{project_id,user_id:allMembers[i]}})
        if(!member){
          const projectMember=await ProjectMembers.create({
            project_member_id: uuidv4(),
            user_id:allMembers[i],
            project_id
          })
        }
        if(!allMembers.indexOf(member.user_id) !== -1){
          await ProjectMembers.destroy({where:{project_id,user_id:allMembers[i]}})
        }}
      return res.status(200).json({ "message": "project updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const AddUserToProject = async (req, res) => {
    const { id } = req.params;
    const {user_id}=req.body
    try {
      if (!user_id) {
        return res.status(400).json({ "message": "Please provide user id properly" });
      }
      //check user availabiliry
      const user=await User.findByPk(user_id)
      if(!user){
        return res.status(404).json({"message":"user not found"})
      }
      //check project availability
      const project=await Project.findByPk(id)
      if(!project){
        return res.status(404).json({"message":"project not found"})
      }
      //check if the user is already a member
      const existingMember=await ProjectMembers.findOne({where:{user_id,project_id:id}})
      if(existingMember){
        return res.status(404).json({"message":"user already a member"})
      }
      const member=await ProjectMembers.create({
        project_member_id:uuidv4(),
        user_id,
        project_id:id
      })
      
      return res.status(200).json({ "message": "new member is added to the project ", "member" :member });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  module.exports= {handleGetProjectMemberById, handleNewProject,handleGetAllProjects,handleGetProjectById,handleUpdateProject,AddUserToProject};