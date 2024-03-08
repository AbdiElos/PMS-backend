const express=require('express');
const router=express.Router();
const app=express()
const multer=require('multer')
const verifyJWT = require('../../middlewares/verifyJWT');
const registerController = require('../../controllers/UmsControllers/registerController.js')
const refreshTokenController = require('../../controllers/UmsControllers/refreshTokenController.js');
const logoutController = require('../../controllers/UmsControllers/logoutController.js');
const LandingPageController=require('../../controllers/UmsControllers/LandingPageController.js')
const profileController=require("../../controllers/UmsControllers/profileController")
const authController = require('../../controllers/UmsControllers/authController.js');
const forgotPasswordController = require('../../controllers/UmsControllers/forgotPasswordController.js');
const adminController2 = require('../../controllers/UmsControllers/adminController2.js');
const adminController = require('../../controllers/UmsControllers/adminController.js');

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

router.route("/login")
    .post(authController.handleAuth);
router.route('/register')
    .post(registerController.handleNewUser)
app.use(verifyJWT)
router.route('/refresh')
    .get(refreshTokenController.handleRefreshToken)
router.route('/:username')
    .get(LandingPageController.getUser)
router.route('/profile')
    .get(profileController.getProfile)
router.route('/profile/update')
    .post(profileController.updateProfile)
router.route("/forgotPassword")
    .post(forgotPasswordController.handleforgot);
router.route("/resetPassword")
    .post(forgotPasswordController.handleReset);
router.route('/logout')
    .get(logoutController.handleLogout)
router.route('/addMember')
    .post(adminController.addUser)
router.route("/getUser/:username")
    .get(adminController.getUser);
router.route("/consumers/:username/activity")
    .get(adminController.getActivity);
router.route("/editMember/edit/:username")
    .put(adminController.editMember)
router.route("/deleteMember/:username/:role")
    .delete(adminController.deleteUser)
router.route("/changeStatus/:id/toggleSuspend")
    .get(adminController.toggleSuspend)
router.route("/update/:id")
    .post(adminController2.handleProfileUpdate)
router.route('/profile/update')
    .post(upload.single("profileImg"),profileController.updateProfile)
module.exports=router;