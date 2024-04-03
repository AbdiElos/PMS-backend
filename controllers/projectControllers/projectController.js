const bcrypt = require('bcrypt');
const db = require("../../config/db");
const Project = db.Project;
const User=db.User;
const { v4: uuidv4 } = require('uuid');
const Document =db.Document
const DocumentType=db.Document_type
const ProjectMembers=db.Project_member
const handleNewProject = async (req, res) => {
    const { name,project_manager,technical_manager,start_date,end_date,document_type_id,document_description } = req.body;
    if (!name || !start_date || !end_date || !document_type_id || !document_description || !project_manager || !technical_manager ) {
      return res.status(400).json({ "message": "Please provide required project information" });
    }
    try {
      const existingProject = await Project.findOne({ where: { name } });
      if (existingProject) {
        return res.status(409).json({ "message": "project name already exists" });
      }
     
      const existingManager = await User.findOne({ where: { user_id:technical_manager } });
      if (!existingManager) {
        return res.status(400).json({ "message": "technical manager not found" });
      }
     
      const existingPManager = await User.findOne({ where: { user_id:project_manager } });
      if (!existingPManager) {
        return res.status(400).json({ "message": "project manager not found" });
      }
      const existingDocumentType = await DocumentType.findOne({ where: { document_type_id } });
      if (!existingDocumentType) {
        return res.status(400).json({ "message": "document type not found" });
      }
      const uuid=uuidv4()
      const project = await Project.create({
        project_id: uuid,
        name,
        project_manager,
        technical_manager,
        start_date,
        end_date
      });
    for(let i=0; i<req.files.length; i++){
      const document=req.files[i].filename;
        await Document.create({
          document_id: uuidv4(),
          document_type_id,
          project_id:uuid,
          document,
          description:document_description
        });
      }
     
      return res.status(201).json({ "message": "New project created", "project": project });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetAllProjects = async (req, res) => {
    try {
      const projects = await Project.findAll();
      return res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetProjectById = async (req, res) => {
    const { id } = req.params;
    try {
      const project = await Project.findByPk(id);
      if (!project) {
        return res.status(404).json({ "message": "project not found" });
      }
      return res.status(200).json(project);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleUpdateProject = async (req, res) => {
    const { id } = req.params;
    const {document,name,project_manager,technical_manager,start_date,end_date,document_type_id,document_description} = req.body;
    if(req.files)document=req.files
    if (!name || !start_date || !end_date ||!document || !document_description || !document_type_id) {
      return res.status(400).json({ "message": "Please provide project document name, start_date, end_date, document_description, document type properly" });
    }
    try {
      const project = await Project.findByPk(id);
      const document=await Document.findOne({where:{document}})
      if(!document){
        return res.status(404).json({"message":"document not found"})
      }
      if (!project) {
        return res.status(404).json({ "message": "project not found" });
      }
      if(technical_manager){
        const existingManager = await User.findOne({ where: { user_id:technical_manager } });
        if (!existingManager) {
          return res.status(400).json({ "message": "technical manager not found" });
        }}
      if(project_manager){
        const existingPManager = await User.findOne({ where: { user_id:project_manager } });
        if (!existingPManager) {
          return res.status(400).json({ "message": "project manager not found" });
        }}
      await project.update({ name,project_manager,technical_manager,start_date,end_date });
      await document.update({document,document_type_id,description:document_description})
      return res.status(200).json({ "message": "project updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleDeleteProject = async (req, res) => {
    const { id } = req.params;

    try {
      const project = await Project.findByPk(id);
      if (!project) {
        return res.status(404).json({ "message": "project not found" });
      }
      await project.destroy();
      return res.status(200).json({ "message": "project deleted" });
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

  module.exports= { handleNewProject,handleGetAllProjects,handleGetProjectById,handleUpdateProject,handleDeleteProject,AddUserToProject};
