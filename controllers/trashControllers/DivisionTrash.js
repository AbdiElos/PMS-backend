const db = require("../../config/db");
const User=db.User
const Division=db.Division;


const handleDeleteDivision = async (req, res) => {
    const division_id=req.params.divisionId
    try {
      const current_time=new Date()
      const division = await Division.findOne({where:{division_id}});
      await division.update({is_deleted:true,deletedBy:req.id,deletionAt:current_time})
      return res.status(200).json({"message":"division deleted successfully to recover go to trash page"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleRestoreDivision = async (req, res) => {
    const division_id=req.params.divisionId
    try {
      const division = await Division.findOne({where:{division_id}});
      await division.update({is_deleted:false,deletedBy:null,deletionAt:null})
      return res.status(200).json({"message":"division recovered successfully to view go to original page"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleAllDeletedDivisions = async (req, res) => {
    try {
      const divisions = await Division.findAll({where:{is_deleted:true},include:[{model:User,as:"DivisionDeletedBy",attributes:['user_id','full_name',"img_url","gender"]}],attributes:['division_id','name','deletionAt']});
      return res.status(200).json(divisions);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  module.exports={handleDeleteDivision,handleRestoreDivision,handleAllDeletedDivisions }