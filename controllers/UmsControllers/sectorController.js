const bcrypt = require('bcrypt');
const db = require("../../config/db");
const User = db.User;
const Sector = db.Sector;
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();




const handleNewSector = async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ "message": "Please provide sector name" });
    }

    try {
      const existingSector = await Sector.findOne({ where: { name } });
      if (existingSector) {
        return res.status(409).json({ "message": "Sector name already exists" });
      }

      const sector = await Sector.create({
        sector_id: uuidv4(),
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
      const sectors = await Sector.findAll();
      return res.status(200).json(sectors);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleGetSectorById = async (req, res) => {
    const { id } = req.params;

    try {
      const sector = await Sector.findByPk(id);
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
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ "message": "Please provide sector name" });
    }

    try {
      const sector = await Sector.findByPk(id);
      if (!sector) {
        return res.status(404).json({ "message": "Sector not found" });
      }

      await sector.update({ name });
      return res.status(200).json({ "message": "Sector updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  const handleDeleteSector = async (req, res) => {
    const { id } = req.params;

    try {
      const sector = await Sector.findByPk(id);
      if (!sector) {
        return res.status(404).json({ "message": "Sector not found" });
      }

      await sector.destroy();
      return res.status(200).json({ "message": "Sector deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

  module.exports= { handleNewSector, handleGetAllSectors, handleGetSectorById, handleUpdateSector, handleDeleteSector };
