const express = require('express');
const router=express.Router();
const profileController=require("../../controllers/homeControllers/profileController")
//const multer=require('multer')
/*var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('calling destination...')
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file.originalname)
    cb(null, Date.now()+file.originalname)
  }
})*/

//var upload2= multer({ storage: storage2})
router.route('/profile')
    .get(profileController.getProfile)
router.route('/profile/update')
    .post(profileController.updateProfile)

//router.route('/profile/update')
  //  .post(upload2.single("profileImg"),profileController.updateProfile)
module.exports=router;