const express=require('express');
const router=express.Router();
const PDTController=require("../../controllers/trashControllers/ProjectTrash")
const DocumentController=require('../../controllers/trashControllers/DocumentTrash')
const RoleController=require('../../controllers/trashControllers/RoleTrash')
const TeamController=require('../../controllers/trashControllers/TeamTrash')
const ActivityTrash=require('../../controllers/trashControllers/ActivityTrash')
const MajorTaskTrash= require('../../controllers/trashControllers/MajorTaskTrask')
const TaskTrash= require('../../controllers/trashControllers/TaskTrash')
const SubTaskTrash= require('../../controllers/trashControllers/SubTaskTrash')
//PROJECTS
router.route('/deleteProject/:projectId')
    .delete(PDTController.handleDeleteProject)
router.route('/restoreProject/:projectId')
    .get(PDTController.handleRestoreProject)
router.route('/getDeletedProjects')
    .get(PDTController.handleAllDeletedProjects)
//DOCUMENTS
router.route('/deleteDocument/:projectId/:documentId')
    .delete(DocumentController.handleDeleteDocument)
router.route('/restoreDocument/:projectId/:documentId')
    .get(DocumentController.handleRestoreDocument)
router.route('/getDeletedDocuments')
    .get(DocumentController.handleAllDeletedDocuments)
//ROLES
router.route('/deleteRole/:roleId')
    .delete(RoleController.handleDeleteRole)
router.route('/restoreRole/:roleId')
    .get(RoleController.handleRestoreRole)
router.route('/getDeletedRoles')
    .get(RoleController.handleAllDeletedRoles)
//Teams
router.route('/deleteTeam/:teamId')
    .delete(TeamController.handleDeleteTeam)
router.route('/restoreTeam/:teamId')
    .get(TeamController.handleRestoreTeam)
router.route('/getDeletedTeams')
    .get(TeamController.handleAllDeletedTeams)


//Activity
router.route('/deleteActivity/:activity_id')
    .delete(ActivityTrash.handleDeleteActivity)
router.route('/restoreActivity/:activity_id')
    .get(ActivityTrash.handleRestoreActivity)
router.route('/getDeletedActivity/:project_id')
    .get(ActivityTrash.handleAllDeletedActivities)


    //major task
/
router.route('/deleteMajortask/:Major_task_id')
    .delete(MajorTaskTrash.handleDeleteMajor_task)
router.route('/restoreMajortask/:Major_task_id')
    .get(MajorTaskTrash.handleRestoreMajor_task,)
router.route('/getDeletedMajortask/:activity_id')
    .get(MajorTaskTrash. handleAllDeletedMajortask)



    //task
    /
    router.route('/deleteTask/:task_id')
        .delete(TaskTrash.handleDeletetTask)
    router.route('/restoreTask/:task_id')
        .get(TaskTrash.handleRestoretask)
    router.route('/getDeletedTask/:Major_task_id')
        .get(TaskTrash. handleAllDeletedTask)


    //sub task
   

router.route('/deleteSubTask/:sub_task_id')
    .delete(SubTaskTrash.handleDeletetSubtask)
router.route('/restoreSubTask/:sub_task_id')
    .get(SubTaskTrash.handleRestoreSubtask)
router.route('/getDeletedSubTask/:task_id')
    .get(SubTaskTrash. handleAllDeletedSubtask)
   
module.exports=router;