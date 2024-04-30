const db = require("../../config/db");
const User=db.User
const UserRole = db.user_role;
const Sector=db.Sector;
const Division=db.Division

const handleDeleteSector = async (req, res) => {
    const sector_id=req.params.sectorId
    try {
      const current_time=new Date()
      const sector = await Sector.findOne({where:{sector_id}});
      await sector.update({is_deleted:true,deletedBy:req.id,deletionAt:current_time})
      const divisions=await Division.findAll({where:{sector_id}})
      divisions.forEach(async(row) => {await row.update({ is_deleted: true,deletedBy:req.id,deletionAt:current_time })})
      return res.status(200).json({"message":"sector deleted successfully to recover go to trash page"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleRestoreSector = async (req, res) => {
    const sector_id=req.params.sectorId
    try {
      const sector = await Sector.findOne({where:{sector_id}});
      await sector.update({is_deleted:false,deletedBy:null,deletionAt:null})
      const divisions=await Division.findAll({where:{sector_id}})
      divisions.forEach(async(row) => {await row.update({ is_deleted: false,deletedBy:null,deletionAt:null })})
      return res.status(200).json({"message":"sector recovered successfully to view go to original page"});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleAllDeletedSectors = async (req, res) => {
    try {
      const sectors = await Sector.findAll({where:{is_deleted:true},include:[{model:User,as:"SectorDeletedBy",attributes:['user_id','full_name',"img_url","gender"]}],attributes:['sector_id','name','deletionAt']});
      if (sectors.length==0) {
        return res.status(404).json({ "message": "sector not found" });
      }
      return res.status(200).json(sectors);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  module.exports={handleDeleteSector,handleRestoreSector,handleAllDeletedSectors}