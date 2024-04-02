const bcrypt = require('bcrypt');
const db = require("../../config/db");
const DocumentType = db.Document_type;
const User=db.User
const { v4: uuidv4 } = require('uuid');

const handleNewDocumentType = async (req, res) => {
    const {document_type } = req.body;
    if (!document_type) {
      return res.status(400).json({ "message": "Please provide required document type information" });
    }
    try {
      const existingDocumentType = await DocumentType.findOne({ where: { document_type } });
      if (existingDocumentType) {
        return res.status(409).json({ "message": "document type already exists" });
      }
      const documentType = await DocumentType.create({
        document_type_id: uuidv4(),
        document_type
      });
      return res.status(201).json({ "message": "New document type created", "document": documentType });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetAllDocumentTypes = async (req, res) => {
    try {
      const documentTypes = await DocumentType.findAll();
      return res.status(200).json(documentTypes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetDocumentTypeById = async (req, res) => {
    const { id } = req.params;

    try {
      const documentType = await DocumentType.findByPk(id);
      if (!documentType) {
        return res.status(404).json({ "message": "document type not found" });
      }
      return res.status(200).json(documentType);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleUpdateDocumentType = async (req, res) => {
    const { id } = req.params;
    const { document_type} = req.body;

    if (!document_type) {
      return res.status(400).json({ "message": "Please provide document type properly" });
    }
    try {
      const documentType = await DocumentType.findByPk(id);
      if (!documentType) {
        return res.status(404).json({ "message": "document type not found" });
      }
      await documentType.update({ document_type});
      return res.status(200).json({ "message": "document type updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleDeleteDocumentType = async (req, res) => {
    const { id } = req.params;

    try {
      const documentType = await DocumentType.findByPk(id);
      if (!documentType) {
        return res.status(404).json({ "message": "document type not found" });
      }
      await documentType.destroy();
      return res.status(200).json({ "message": "document type deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

module.exports= {handleNewDocumentType,handleGetAllDocumentTypes,handleGetDocumentTypeById,handleUpdateDocumentType,handleDeleteDocumentType };
