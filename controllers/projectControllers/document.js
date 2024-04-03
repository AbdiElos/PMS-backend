const bcrypt = require('bcrypt');
const db = require("../../config/db");
const Document = db.Document;
const Project=db.Project
const DocumentType=db.Document_type
const Task=db.Task
const { v4: uuidv4 } = require('uuid');

const handleNewDocumentToProject = async (req, res) => {
    const { document_type_id,project_id,document,description } = req.body;
    if (!document_type_id || !project_id || !document) {
      return res.status(400).json({ "message": "Please provide required document information" });
    }
    try {
      const existingDocument= await Document.findOne({ where: { document } });
      if (existingDocument) {
        return res.status(409).json({ "message": "document already exists" });
      }
      const project=await Project.findOne({where:{project_id}})
      if(!project){
        return res.status(409).json({ "message": "project doesn't exists" });
      }
      const documentType=await DocumentType.findOne({where:{document_type_id}})
      if(!documentType){
        return res.status(409).json({ "message": "document type doesn't exists" });
      }
      const document = await Document.create({
        document_id: uuidv4(),
        document_type_id,
        project_id,
        document,
        description
      });
      return res.status(201).json({ "message": "New document created", "document": document });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleNewDocumentToTask = async (req, res) => {
    const { document_type_id,task_id,document,description } = req.body;
    if (!document_type_id || !task_id || !document) {
      return res.status(400).json({ "message": "Please provide required document information" });
    }
    try {
      const existingDocument= await Document.findOne({ where: { document } });
      if (existingDocument) {
        return res.status(409).json({ "message": "document already exists" });
      }
      const task=await Task.findOne({where:{task_id}})
      if(!task){
        return res.status(409).json({ "message": "task doesn't exists" });
      }
      const documentType=await DocumentType.findOne({where:{document_type_id}})
      if(!documentType){
        return res.status(409).json({ "message": "document type doesn't exists" });
      }
      const document = await Document.create({
        document_id: uuidv4(),
        document_type_id,
        task_id,
        document,
        description
      });
      return res.status(201).json({ "message": "New document created", "document": document });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleGetAllDocuments = async (req, res) => {
    try {
      const documents = await Document.findAll();
      return res.status(200).json(documents);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetDocumentById = async (req, res) => {
    const { id } = req.params;
    try {
      const document = await Document.findByPk(id);
      if (!document) {
        return res.status(404).json({ "message": "document not found" });
      }
      return res.status(200).json(document);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleUpdateDocument = async (req, res) => {
    const { id } = req.params;
    const { document,document_type_id,project_id,task_id,description} = req.body;

    if (!document || !document_type_id) {
      return res.status(400).json({ "message": "Please provide document name, and type properly" });
    }
    try {
      const foundDocument = await Document.findByPk(id);
      if (!foundDocument) {
        return res.status(404).json({ "message": "document not found" });
      }
      await foundDocument.update({ document,document_type_id,project_id,task_id,description });
      return res.status(200).json({ "message": "document updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleDeleteDocument = async (req, res) => {
    const { id } = req.params;

    try {
      const document = await Document.findByPk(id);
      if (!document) {
        return res.status(404).json({ "message": "document not found" });
      }
      await document.destroy();
      return res.status(200).json({ "message": "document deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  module.exports= {handleNewDocumentToProject,handleNewDocumentToTask,handleGetAllDocuments,handleGetDocumentById,handleUpdateDocument,handleDeleteDocument };
