const bcrypt = require('bcrypt');
const db = require("../../config/db");
const User = db.User;
const Sector = db.Sector;
const Division=db.Division
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

const handleNewSector = async (req, res) => {
    const { name } = req.body;
    console.log(req.body)
    if(req.body.leader_id) var leader_id=req.body.leader_id
    console.log(leader_id)
    if (!name||!leader_id) {
      return res.status(400).json({ "message": "Please provide sector name" });
    }

    try {
      const existingSector = await Sector.findOne({ where: { name } });
      if (existingSector) {
        return res.status(409).json({ "message": "Sector name already exists" });
      }

      const sector = await Sector.create({
        sector_id: uuidv4(),
        //leader_id,
        name
      });

      return res.status(201).json({ "message": "New sector created", "sector": sector });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetAllSectors = async (req, res) => {
    try {
      const sectors = await Sector.findAll({where:{is_deleted:false},include:[{model:Division,as:"Divisions"}]});
      return res.status(200).json(sectors);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetSectorById = async (req, res) => {
    const { id } = req.params;

    try {
      const sector = await Sector.findOne({where:{is_deleted:false,sector_id:id},include:[{model:Division,as:"Divisions"}]});
      if (!sector) {
        return res.status(404).json({ "message": "Sector not found" });
      }
      return res.status(200).json(sector);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleUpdateSector = async (req, res) => {
    const { id } = req.params;
    const { name,leader_id } = req.body;

    if (!name || !leader_id) {
      return res.status(400).json({ "message": "Please provide sector name and leader_id" });
    }

    try {
      const sector = await Sector.findByPk(id);
      if (!sector) {
        return res.status(404).json({ "message": "Sector not found" });
      }

      await sector.update({ name,leader_id });
      return res.status(200).json({ "message": "Sector updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };



  module.exports= { handleNewSector, handleGetAllSectors, handleGetSectorById, handleUpdateSector };
