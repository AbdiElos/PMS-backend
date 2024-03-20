const express=require('express');
const router=express.Router();
const app=express()
const multer=require('multer')
const verifyJWT = require('../../middlewares/verifyJWT');

const  sectorController= require('../../controllers/UmsControllers/sectorController.js');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('calling destination...')
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      console.log(file.originalname)
      cb(null, file.originalname)
    }
  })
var upload = multer({ storage: storage })

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
module.exports=router;