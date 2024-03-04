const express = require('express');
const router=express.Router();
//const multer=require('multer')
const adminController2 = require('../../controllers/adminController2.js');
/*const verifyAdmin=(req,res,next)=>{
  if(!req?.roles) return res.sendStatus(401)
  if(!(req.roles===5150)){
      return res.sendStatus(401)
  }
  next()
}/*
/*var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('calling destination...')
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      console.log(file.originalname)
      cb(null, Date.now()+file.originalname)
    }
  })
var upload2= multer({ storage: storage2})
*/
router.route("/update/:id")
    .post(adminController2.handleProfileUpdate)
module.exports=router;