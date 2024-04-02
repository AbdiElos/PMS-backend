const express=require('express');
const router=express.Router();
const sectorController = require('../../controllers/organizationControllers/sectorController.js')
const divisionController=require('../../controllers/organizationControllers/divisionController.js')
const roleController=require('../../controllers/UmsControllers/rolesController.js')
const teamController=require('../../controllers/UmsControllers/teamController.js')
const verifyAccessWithoutProject=require('../../middlewares/verifyAccessWithoutProject.js')

// sector routes
router.route('/sector/newsector') 
   .post(sectorController.handleNewSector) 
router.route('/sector/getsector/:id') 
   .get(sectorController.handleGetSectorById) 
 
router.route('/sector/getallsector') 
   .get(sectorController.handleGetAllSectors) 
 
router.route('/sector/updatesector/:id') 
   .put(sectorController.handleUpdateSector) 
router.route('/sector/deletesector/:id') 
   .delete(sectorController. handleDeleteSector)

// division routes
router.route('/division/newdivision')
    .post(divisionController.handleNewDivision)
router.route('/division/getdivision/:id')
    .get(divisionController.handleGetDivisionById)
router.route('/division/getalldivision')
    .get(divisionController.handleGetAllDivision)
router.route('/division/updatedivision/:id')
    .put(divisionController.handleUpdateDivision)
router.route('/division/deletedivision/:id')
    .delete(divisionController.handleDeleteDivision)
router.route('/division/users/:id')
    .get(divisionController.handleGetAllUsersInDivision)
router.route('/roles')
    .get(divisionController.handleGetAllDefaultRole)

// roles controller

router.route("/role/add")
  .post(roleController.handleNewRole)
router.route('/role/getallprojectroles')
  .get(roleController.handleGetAllProjectRelatedRole)
router.route('/role/getallroles')
  .get(roleController.handleGetAllRole)
router.route('/getallpermissions')
  .get(roleController.handleGetAllPermissions)
router.route('/role/:id/update')
  .put(roleController.handleUpdateRole)
router.route('/role/:id/getallpermissions')
  .get(roleController.handleGetAllPermissionsOfRole)
router.route('/team/add')
  .post(teamController.handleNewTeam)
router.route('/team/getall')
  .get(verifyAccessWithoutProject("042b3d2d-f0bd-11ee-a446-c01803d475fd"),teamController.handleGetAllTeams)
router.route('/team/:id')
  .get(teamController.handleGetTeamById)
router.route('/team/:id/addmember')
  .put(teamController.handleAddUserToTeam)
router.route('/team/:id/update')
  .put(teamController.handleUpdateTeam)
module.exports=router;