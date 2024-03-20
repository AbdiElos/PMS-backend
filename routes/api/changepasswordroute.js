const express=require('express');
const router=express.Router();
const app=express()
const multer=require('multer')
const verifyJWT = require('../../middlewares/verifyJWT');

const  changepasswordController= require('../../controllers/UmsControllers/changepasswordController.js');


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

router.route('/profile/changepassword/:user_id')
   .put(changepasswordController.handleChangePassword)

module.exports=router;