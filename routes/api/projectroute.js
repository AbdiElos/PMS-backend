const express=require('express');
const router=express.Router();
const milestoneController = require('../../controllers/ProjectController/milestoneController.js')
const taskController = require('../../controllers/ProjectController/taskController.js')
const sub_taskController = require('../../controllers/ProjectController/sub_taskController.js')

const documentTypeController = require('../../controllers/ProjectController/documentType.js')
const documentController=require('../../controllers/ProjectController/document.js')
const projectController=require('../../controllers/ProjectController/projectController.js');
const multer=require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('calling destination...')
      cb(null, './public/documents/')
    },
    filename: function (req, file, cb) {
      console.log(file.originalname)
      cb(null, (new Date()).getTime()+file.originalname)
    }
  })
var upload = multer({ storage: storage })
//  document type routes
router.route('/documentType/add') 
   .post(documentTypeController.handleNewDocumentType) 
router.route('/documentType/getAll')
    .get(documentTypeController.handleGetAllDocumentTypes)
router.route('/documentType/get/:id')
    .get(documentTypeController.handleGetDocumentTypeById)
router.route('/documentType/update/:id')
    .put(documentTypeController.handleUpdateDocumentType)
router.route('/documentType/delete/:id')
    .delete(documentTypeController.handleDeleteDocumentType)

// project routes
router.route('/project/add')
    .post(upload.array("documents",5),projectController.handleNewProject)
router.route('/getAll')
    .get(projectController.handleGetAllProjects)
router.route('/get/:projectId')
    .get(projectController.handleGetProjectById)
router.route('/getMembers/:projectId')
   .get(projectController.handleGetProjectMemberById)

router.route('/milestone/newMilestone') 
   .post(milestoneController.createMilestone) 
router.route('/milestone/:id') 
   .get(milestoneController.getMilestoneById) 
router.route('/getAllmilestone') 
   .get(milestoneController.getAllMilestones) 
 router.route('/updateMilestone/:id') 
    .put(milestoneController.updateMilestone) 
 router.route('/deleteMilestone/:id') 
   .delete(milestoneController.deleteMilestone)

 router.route('/getAllmilestonemember') 
   .get(taskController.getAllMilestoneMembers)
router.route('/getAllmemebresofmilstone/:id') 
   .get(milestoneController.handleGetAllMembersOfMilestone)
// fetch all projectmembers for milestone members



router.route('/getAllProjectMembers') 
   .get(milestoneController.getAllMilestones) 
  

   


//Task routers


router.route('/task/newTask/:milestone_id') 
   .post(taskController.createTask) 
router.route('/task/:id') 
   .get(taskController.getTaskById) 
router.route('/taskmember/:id') 
   .get(taskController.gettaskmember) 
router.route('/getAlltask') 
   .get(taskController.getAllTasks) 
 router.route('/updateTask/:id') 
    .put(taskController.updateTask) 
 router.route('/deleteTask/:id') 
   .delete(taskController.deleteTask)
//getAllMilestoneMembers


   

   //sub_task route


router.route('/sub_task/newSubTask') 
   .post(sub_taskController.createSubTask) 
router.route('/sub_task/:id') 
   .get(sub_taskController.getSubTaskById) 
router.route('/getAllSub_task') 
   .get(sub_taskController.getAllSubTasks) 
 router.route('/updateSub_task/:id') 
    .put(sub_taskController.updateSubTask) 
 router.route('/deleteSub_ask/:id') 
   .delete(sub_taskController.deleteSubTask)

// document routes
router.route("/:projectId/document/add")
  .post(upload.array("documents",5),documentController.handleNewDocumentToProject)
router.route("/:projectId/documents")
  .get(documentController.handleGetDocumentByProjectId)
router.route("/getAllDocuments")
  .get(documentController.handleGetAllDocuments)
router.route("/:projectId/document/:documentId")
  .get(documentController.handleGetDocumentById)
router.route("/:projectId/document/:documentId/update")
  .put(upload.single("documents"),documentController.handleUpdateDocument)





   router.route('/documentType/add') 
   .post(documentTypeController.handleNewDocumentType) 
router.route('/documentType/getAll')
    .get(documentTypeController.handleGetAllDocumentTypes)
router.route('/documentType/get/:id')
    .get(documentTypeController.handleGetDocumentTypeById)
router.route('/documentType/update/:id')
    .put(documentTypeController.handleUpdateDocumentType)
router.route('/documentType/delete/:id')
    .delete(documentTypeController.handleDeleteDocumentType)

//

router.route('/project/add')
    .post(upload.array("document",5),projectController.handleNewProject)
router.route('/getAll')
    .get(projectController.handleGetAllProjects)
router.route('/get/:id')
    .get(projectController.handleGetProjectById)
module.exports=router;