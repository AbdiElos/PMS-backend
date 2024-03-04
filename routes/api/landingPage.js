const express=require('express');
const router=express.Router();
const LandingPageController=require('../../controllers/LandingPageController')
router.route('/:username')
    .get(LandingPageController.getUser)
module.exports=router;


