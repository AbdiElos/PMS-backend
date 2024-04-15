const express=require('express');
const router=express.Router();
const app=express()
const multer=require('multer')
const verifyJWT = require('../../middlewares/verifyJWT.js');
const registerController = require('../../controllers/UmsControllers/registerController.js')
const refreshTokenController = require('../../controllers/UmsControllers/refreshTokenController.js');
const logoutController = require('../../controllers/UmsControllers/logoutController.js');
// const LandingPageController=require('../../controllers/UmsControllers/LandingPageController.js')
const profileController=require("../../controllers/UmsControllers/profileController")
const authController = require('../../controllers/UmsControllers/authController.js');
const forgotPasswordController = require('../../controllers/UmsControllers/forgotPasswordController.js');
const adminController2 = require('../../controllers/UmsControllers/adminController2.js');
const adminController = require('../../controllers/UmsControllers/adminController.js');
const  changepasswordController= require('../../controllers/UmsControllers/changepasswordController.js');
const verifyAccessWithoutProject=require('../../middlewares/verifyAccessWithoutProject.js')

const { verify } = require('jsonwebtoken');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('calling destination...')
      cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
      console.log(file.originalname)
      cb(null, file.originalname)
    }
  })
var upload = multer({ storage: storage })

router.route('/registerUser')
    .post(registerController.handleNewUser)
    // ('2f33c5e4-f009-11ee-bd81-c01803d475fd')
router.route("/login")
    .post(authController.handleAuth);
router.route('/refresh')
    .get(refreshTokenController.handleRefreshToken)
router.route('/finduser/:user_id')
    .get(adminController.getUser)
router.route('/findalluser')
    .get(adminController.getAllUser)
router.route('/profile/update')
    .put(verifyJWT,adminController.editMember)
router.route("/profile/changeStatus/:id")
    .put(adminController.toggleSuspend)
router.route('/profile/changepassword/:id')
    .put(changepasswordController.handleChangePassword)




// router.route('/profile')
//     .get(profileController.getProfile)
router.route('/profile/update')
    .post(profileController.updateProfile)
router.route("/forgotPassword")
    .post(forgotPasswordController.handleforgot);
router.route("/resetPassword")
    .post(forgotPasswordController.handleReset);
router.route('/logout')
    .get(logoutController.handleLogout)
router.route("/getUser/:username")
    .get(adminController.getUser);
router.route("/editMember/edit/:username")
    .put(adminController.editMember)
router.route("/deleteMember/:username/:role")
    .delete(adminController.deleteUser)

router.route("/update/:id")
    .post(adminController2.handleProfileUpdate)
router.route('/profile/update')
    .post(upload.single("profileImg"),profileController.updateProfile)


module.exports=router;
