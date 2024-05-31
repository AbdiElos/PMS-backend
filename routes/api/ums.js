const express = require("express");
const router = express.Router();
const app = express();
const multer = require("multer");
const verifyJWT = require("../../middlewares/verifyJWT.js");
const registerController = require("../../controllers/UmsControllers/registerController.js");
const refreshTokenController = require("../../controllers/UmsControllers/refreshTokenController.js");
const logoutController = require("../../controllers/UmsControllers/logoutController.js");
// const LandingPageController=require('../../controllers/UmsControllers/LandingPageController.js')
const profileController = require("../../controllers/UmsControllers/profileController");
const authController = require("../../controllers/UmsControllers/authController.js");
const forgotPasswordController = require("../../controllers/UmsControllers/forgotPasswordController.js");
const adminController2 = require("../../controllers/UmsControllers/adminController2.js");
const adminController = require("../../controllers/UmsControllers/adminController.js");
const changepasswordController = require("../../controllers/UmsControllers/changepasswordController.js");
const verifyAccessWithoutProject = require("../../middlewares/verifyAccessWithoutProject.js");

const { verify } = require("jsonwebtoken");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("calling destination...");
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

// router.route("/registerUser").post(registerController.handleNewUser);
router
  .route("/registerUser")
  .post(
    verifyJWT,
    verifyAccessWithoutProject(process.env.REGISTER_NEW_USER),
    registerController.handleNewUser
  );
router.route("/login").post(authController.handleAuth);
router.route("/refresh").get(refreshTokenController.handleRefreshToken);
router
  .route("/finduser/:user_id")
  .get(
    verifyJWT,
    verifyAccessWithoutProject(process.env.GET_SPECIFIC_USER),
    adminController.getUser
  );
router.route("/findalluser").get(
  // verifyAccessWithoutProject(process.env.REGISTER_NEW_USER),
  verifyJWT,
  verifyAccessWithoutProject(process.env.GET_ALL_USER),
  adminController.getAllUser
);

// router.route("/profile/update/:id").put(  verifyJWT,
//   verifyAccessWithoutProject(process.env.UPDATE_USER),adminController.editMember);
router.route("/profile/update/:id").put(
  verifyJWT,
  // verifyAccessWithoutProject(process.env.UPDATE_USER),
  upload.single("image"),
  adminController.editMember
);

router.route("/profile/changeStatus/:id").put(
  verifyJWT,
  // verifyAccessWithoutProject(process.env.CHANGE__USER_STATUS),
  adminController.toggleSuspend
);

router.route("/profile/project/:user_id").get(
  verifyJWT,
  // verifyAccessWithoutProject(process.env.CHANGE__USER_STATUS),
  adminController.getAllUserproject
);

router.route("/profile/subtask/:project_member_id").get(
  verifyJWT,
  // verifyAccessWithoutProject(process.env.CHANGE__USER_STATUS),
  adminController.getAllUsersubtask
);

router
  .route("/profile/changepassword/:id")
  .put(
    verifyJWT,
    verifyAccessWithoutProject(process.env.CHANGE_PASSWORD),
    changepasswordController.handleChangePassword
  );
// router.route('/profile/update')
//     .post(verifyJWT,upload.single("profileImg"),profileController.updateProfile)

// router.route("/profile/project").get(adminController.getAllUserproject);
// router.route('/profile/update')
//     .post(profileController.updateProfile)
// router.route("/forgotPassword")
//     .post(forgotPasswordController.handleforgot);
// router.route("/resetPassword")
//     .post(forgotPasswordController.handleReset);
// router.route('/logout')
//     .get(logoutController.handleLogout)
// router.route("/getUser/:username")
//     .get(adminController.getUser);
// router.route("/editMember/edit/:username")
//     .put(adminController.editMember)
// router.route("/deleteMember/:username/:role")
//     .delete(adminController.deleteUser)

// router.route("/update/:id")
//     .post(adminController2.handleProfileUpdate)
// router.route('/profile/update')
//     .post(verifyJWT,upload.single("profileImg"),profileController.updateProfile)

module.exports = router;
