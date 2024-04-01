const express=require('express');
const router=express.Router();
const milestoneController = require('../../controllers/ProjectController/milestoneController.js')
const taskController = require('../../controllers/ProjectController/taskController.js')
const sub_taskController = require('../../controllers/ProjectController/sub_taskController.js')


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
// fetch all projectmembers for milestone members
router.route('/getAllProjectMembers') 
   .get(milestoneController.getAllMilestones) 
   


//Task routers


router.route('/task/newTask') 
   .post(taskController.createTask) 
router.route('/task/:id') 
   .get(taskController.getTaskById) 
router.route('/getAlltask') 
   .get(taskController.getAllTasks) 
 router.route('/updateTask/:id') 
    .put(taskController.updateTask) 
 router.route('/deleteTask/:id') 
   .delete(taskController.deleteTask)
//getAllMilestoneMembers

router.route('/getAllmilestonemember') 
   .get(taskController.getAllMilestoneMembers)

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
module.exports=router;