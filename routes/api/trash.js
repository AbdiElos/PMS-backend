const express=require('express');
const router=express.Router();
const PDTController=require("../../controllers/trashControllers/ProjectTrash")
const DocumentController=require('../../controllers/trashControllers/DocumentTrash')
const RoleController=require('../../controllers/trashControllers/RoleTrash')
const TeamController=require('../../controllers/trashControllers/TeamTrash')
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


module.exports=router;