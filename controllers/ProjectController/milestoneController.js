const db = require("../../config/db");
const Milestone = db.Milestone;
const Project = db.Project;
const Project_member = db.Project_member
// const Milestone_members = db.Milestone_members
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4();

//Function to get all members from the project_member table
const getAllProjectMembers = async (req, res) => {
  try {
    const members = await Project_member.findAll();
    return res.status(200).json(members);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const createMilestone = async (req, res) => {
  try {
    const { name, milestone_status, technical_manager, start_date, end_date, created_by, updated_by, member_ids } = req.body;
    const { project_id } = req.params; // Retrieve project_id from URL parameters

    if (!name || !project_id  || !start_date || !end_date || !member_ids) {
      return res.status(400).json({ "message": "Please fill all the forms" });
    }

    const project = await Project.findByPk(project_id);
    const existingMilestone = await Milestone.findOne({ where: { name } });
    if (!project) {
      return res.status(404).json({ "message": "Project not found" });
    }
    if (existingMilestone) {
      return res.status(409).json({ "message": "Milestone name already exists" });
    }

    const milestone = await Milestone.create({
      milestone_id: uuidv4(),
      project_id:project_id,
      name,
      milestone_status,
      technical_manager,
      start_date,
      end_date,
      created_by,
      updated_by,
    });

    // Add members to the milestone_members table
    // if (member_ids && member_ids.length > 0) {
    //   const milestoneMembers = member_ids.map(member_id => ({
    //     milestone_member_id: uuidv4(),
    //     milestone_id: milestone.milestone_id,
    //     project_member_id: member_id
    //   }));

    //   await Milestone_members.bulkCreate(milestoneMembers);
    // }

    return res.status(201).json({ "message": "Milestone created", "milestone": milestone });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};




const getAllMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.findAll();
    return res.status(200).json(milestones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const getMilestoneById = async (req, res) => {
  const { id } = req.params;

  try {
    const milestone = await Milestone.findByPk(id);
    if (!milestone) {
      return res.status(404).json({ "message": "Milestone not found" });
    }
    return res.status(200).json(milestone);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const updateMilestone = async (req, res) => {
  const { id } = req.params;
  const { project_id, name, milestone_status, technical_manager, start_date, end_date, created_by, updated_by } = req.body;

  try {
    const milestone = await Milestone.findByPk(id);
    if (!milestone) {
      return res.status(404).json({ "message": "Milestone not found" });
    }

    if (project_id) {
      const project = await Project.findByPk(project_id);
      if (!project) {
        return res.status(404).json({ "message": "Project not found" });
      }
    }

    await milestone.update({
      project_id:project_id,
      name,
      milestone_status,
      technical_manager,
      start_date,
      end_date,
      created_by,
      updated_by,
    });

    return res.status(200).json({ "message": "Milestone updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const deleteMilestone = async (req, res) => {
  const { id } = req.params;

  try {
    const milestone = await Milestone.findByPk(id);
    if (!milestone) {
      return res.status(404).json({ "message": "Milestone not found" });
    }

    await milestone.destroy();
    return res.status(200).json({ "message": "Milestone deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

module.exports = {createMilestone, getAllMilestones, getMilestoneById, updateMilestone, deleteMilestone, getAllProjectMembers };