const db = require("../../config/db");
const Project = db.Project;
const User=db.User;
const Document =db.Document
const DocumentType=db.Document_type
const ProjectMembers=db.Project_member
const Milestone=db.Milestone
const UserRole=db.user_role
const Roles=db.Roles

const handleDeleteDocument = async (req, res) => {
    const document_id=req.params.documentId
    try {
      const document = await Document.findOne({where:{document_id}});
      document.is_deleted=true
      document.deletedBy=req.id
      document.deletionAt=new Date()
      document.save()
      return res.status(200).json({"message":"document deleted successfully to recover go to trash page"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleRestoreDocument = async (req, res) => {
    const document_id=req.params.documentId
    try {
      const document = await Document.findOne({where:{document_id}});

      document.is_deleted=false
      document.deletedBy=null
      document.deletionAt=null
      document.save()
      return res.status(200).json({"message":"document recovered successfully to view go to original page"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleAllDeletedDocuments = async (req, res) => {
    try {
      const documents = await Document.findAll({where:{is_deleted:true},
        include:[{model:User, as:"DeletedByDocuments",attributes:['user_id','full_name',"img_url","gender"]},{model:DocumentType,as:"Document_type",attributes:["document_type_id","document_type"]}],attributes:['document_id','description','deletionAt','project_id']});
      if (documents.length==0) {
        return res.status(404).json({ "message": "document not found" });
      }
      return res.status(200).json(documents);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  module.exports={handleDeleteDocument,handleRestoreDocument,handleAllDeletedDocuments}