const express=require('express');
const router=express.Router();
const sectorController = require('../../controllers/organizationControllers/sectorController.js')
const divisionController=require('../../controllers/organizationControllers/divisionController.js')

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
    .get(divisionController.handleGetAllRole)
module.exports=router;