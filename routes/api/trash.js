const express=require('express');
const router=express.Router();
const PDTController=require("../../controllers/trashControllers/PDTtrash")

router.route('/deleteProject/:projectId')
    .delete(PDTController.handleDeleteProject)


module.exports=router;