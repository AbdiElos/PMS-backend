const bcrypt = require('bcrypt');
const db = require("../../config/db");
const Document = db.Document;
const Project=db.Project
const DocumentType=db.Document_type
const Task=db.Task
const { v4: uuidv4 } = require('uuid');

const handleNewDocumentToProject = async (req, res) => {
    const project_id=req.params.projectId

    const { document_type_id,description } = req.body;
    console.log(document_type_id,project_id,description)
    if (!document_type_id || !project_id) {
      return res.status(400).json({ "message": "Please provide required document information" });
    }
    try {
      const project=await Project.findOne({where:{project_id}})
      if(!project){
        return res.status(400).json({ "message": "project not found " });
      }
      const documentType=await DocumentType.findOne({where:{document_type_id}})
      if(!documentType){
        return res.status(400).json({ "message": "document type not found" });
      }
      console.log(req.files)
      for(let i=0; i<req.files.length; i++){
        await Document.create({
          document_id: uuidv4(),
          document_type_id,
          project_id,
          document:req.files[i].filename,
          description
        });
      }
      return res.status(201).json({ "message": "New document created" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetAllDocuments = async (req, res) => {
    try {
      const documents = await Document.findAll({include:[{model:DocumentType,as:"Document_type",through:{attributes:[]},attributes:["document_type_id","name"]}]});
      return res.status(200).json(documents);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetDocumentByProjectId = async (req, res) => {
    const  project_id  = req.params.projectId;
    try {
      const documents = await Document.findAll({where:{project_id},include:[{model:DocumentType,as:"Document_type",through:{attributes:[]},attributes:["document_type_id","name"]}]});
      if (!documents) {
        return res.status(404).json({ "message": "document not found" });
      }
      return res.status(200).json(documents);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleGetDocumentById = async (req, res) => {
    const  project_id  = req.params.projectId;
    const document_id=req.params.documentId
    try {
      const documents = await Document.findAll({where:{project_id,document_id,is_deleted:false},include:[{model:DocumentType,as:"Document_type",attributes:['document_type_id','document_type']}],attributes:['document_id','document','project_id','description']});
      if (documents.length==0) {
        return res.status(404).json({ "message": "document not found" });
      }
      return res.status(200).json(documents);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleUpdateDocument = async (req, res) => {
    const project_id = req.params.projectId;
    const document_id=req.params.documentId;
    const {document_type_id,description} = req.body;

    if (!document_type_id) {
      return res.status(400).json({ "message": "Please provide document type properly" });
    }
    try {
      const documentType=await DocumentType.findOne({where:{document_type_id}})
      if(!documentType){
        return res.status(400).json({ "message": "document type not found" });
      }
      const foundDocument = await Document.findOne({where:{project_id,document_id}});
      if (!foundDocument) {
        return res.status(404).json({ "message": "document not found" });
      }
      await foundDocument.update({document_type_id,document:req.file.filename,project_id,description });
      return res.status(200).json({ "message": "document updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  module.exports= {handleGetDocumentById,handleNewDocumentToProject,handleGetAllDocuments,handleGetDocumentByProjectId,handleUpdateDocument };