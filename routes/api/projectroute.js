const express=require('express');
const router=express.Router();
const activityController = require('../../controllers/ProjectController/activityController.js')
const taskController = require('../../controllers/ProjectController/taskController.js')
const majortaskController = require('../../controllers/ProjectController/major_taskController.js')
const sub_taskController = require('../../controllers/ProjectController/sub_taskController.js')
const multer=require('multer')
const documentTypeController = require('../../controllers/ProjectController/documentType.js')
const documentController=require('../../controllers/ProjectController/document.js')
const projectController=require('../../controllers/ProjectController/projectController.js');
const CommentController = require('../../controllers/ProjectController/commentController')
const verifyJWT = require('../../middlewares/verifyJWT.js');
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




router.route('/activity/newactivity/:project_id') 
   .post(activityController.createActivity) 
router.route('/activity/:id') 
   .get(activityController.getActivityById) 
router.route('/getAllactivity/:project_id') 
   .get(verifyJWT,activityController.getAllActivities) 
 router.route('/updateactivity/:id') 
    .put(activityController.updateActivity) 
 router.route('/deleteactivity/:id') 
   .delete(activityController.deleteActivity)

//  router.route('/getAllactivitymember') 
//    .get(taskController.getAllactivityMembers)
router.route('/getAllmemebrsofactivity/:id') 
   .get(activityController.handleGetAllMembersOfActivity)
// fetch all projectmembers for activity members


router.route('/getAllProjectMembers/:project_id') 
   .get(activityController.getAlllprojectMembers ) 

   


//Task routers


router.route('/task/newTask/:Major_task_id') 
   .post(taskController.createTask) 
router.route('/task/:id') 
   .get(taskController.getTaskById) 
router.route('/taskmember/:id') 
   .get(taskController.gettaskmember) 
router.route('/getAlltask/:Major_task_id') 
   .get(taskController.getAllTasks) 
 router.route('/updateTask/:task_id') 
    .put(taskController.updateTask) 
 router.route('/deleteTask/:id') 
   .delete(taskController.deleteTask)
   


router.route('/majortask/newmajortask/:activity_id') 
   .post(majortaskController.createMajortask) 
router.route('/majortask/:id') 
   .get(majortaskController.getmajorTaskById) 
router.route('/majortaskmember/:id') 
   .get(majortaskController. getmajortaskmember) 
router.route('/getAllmajortask/:activity_id') 
    .get(majortaskController.getAllmajorTasks) 
 router.route('/updatemajorTask/:id') 
    .put(majortaskController.updatemajorTask) 
 router.route('/deletemajorTask/:id') 
   .delete(majortaskController.deletemajorTask)




//getAllactivityMembers


   

   //sub_task route


router.route('/sub_task/newSubTask/:task_id') 
   .post(sub_taskController.createSubTask) 
router.route('/sub_task/:id') 
   .get(sub_taskController.getSubTaskById) 
router.route('/sub_taskmembers/:id') 
   .get(sub_taskController.getSubTaskMembers) 
   
router.route('/getAllSub_task/:task_id') 
   .get(sub_taskController.getAllSubTasks) 
 router.route('/updateSub_task/:id') 
    .put(sub_taskController.updateSubTask) 
 router.route('/deleteSub_ask/:id') 
   .delete(sub_taskController.deleteSubTask)



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

// project routes
router.route('/project/add')
    .post(upload.array("documents",5),projectController.handleNewProject)
router.route('/getAll')
    .get(verifyJWT,projectController.handleGetAllProjects)
router.route('/get/:projectId')
    .get(projectController.handleGetProjectById)
router.route('/getMembers/:projectId')
   .get(projectController.handleGetProjectMemberById)



   //comment
   router.route('/newcommentsubtask/:sub_task_id') 
   .post(CommentController.createComment) 
   router.route('/newcommentproject/:project_id') 
   .post(CommentController.createComment) 
   router.route('/newcommentactivity/:activity_id') 
   .post(CommentController.createComment) 


router.route('/comment/:comment_id') 
   .get(CommentController.getCommentById) 


router.route('/getAllacommentOfSubtask/:sub_task_id') 
   .get(CommentController.getAllComments) 
   router.route('/getAllacommentOfProject/:project_id') 
   .get(CommentController.getAllComments) 


   router.route('/getAllacommentOfActivity/:activity_id') 
   .get(CommentController.getAllComments) 


 router.route('/updatecomment/:comment_id') 
    .put(CommentController.updateComment) 
 router.route('/deletecomment/:comment_id') 
   .delete(CommentController.deleteComment)

module.exports=router;







