const express=require('express');
const router=express.Router();
const settingsController = require('../../controllers/organizationControllers/settingsController')
const checkExistanceMiddleware=require('../../middlewares/checkIfExists')
const multer=require('multer')

var storage = multer.diskStorage({
    destination: async function (req,file, cb) {
      console.log('calling destination...')
      cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
      console.log(file.originalname)
      cb(null, (new Date()).getTime()+file.originalname)
    }
  })
var upload = multer({ storage: storage })
// ORGANIZATION ROUTES
router.route('/AddOrganization') 
   .post(upload.fields([{ name: 'logo', maxCount: 1 }]),settingsController.handleNewOrganization)
// SOCIALMEDIA ROUTES
router.route('/getOrganization')
    .get(settingsController.handleGetOrganization)
router.route('/AddSocialMedia') 
   .post(settingsController.handleNewSocialMedia)
router.route('/getAllSocialMedias')
    .get(settingsController.handleGetAllSocialMedia)

module.exports=router;