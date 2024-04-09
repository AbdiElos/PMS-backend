const db = require("../../config/db");
const Milestone = db.Milestone;
const Project = db.Project;
const User = db.User;
const Project_member = db.Project_member;
const Milestone_members = db.Milestone_members;
const { DataTypes, UUID } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const project = require("../../models/project");

const createMilestone = async (req, res) => {
  const uuid = uuidv4();
  var { name, milestone_status, start_date, end_date, projectmembers } = req.body;
  var { project_id } = req.params;
  projectmembers = projectmembers.split(",");
  
  // Validate inputs
  if (!name || !project_id || !start_date || !end_date) {
    return res.status(400).json({ "message": "Please provide milestone information properly" });
  }
  
  if (!projectmembers || projectmembers.length === 0) {
    return res.status(400).json({ "message": "No project member checkboxes are selected." });
  }

  try {
    const existingMilestone = await Milestone.findOne({ where: { name } });
    if (existingMilestone) {
      return res.status(409).json({ "message": "Milestone name already exists" });
    }

    // if (start_date < project.start_date || end_date > project.end_date) {
    //   return res.status(400).json({ "message": "Task dates should be within the milestone dates" });
    // }
    // Create the milestone
    const milestone = await Milestone.create({
      milestone_id: uuid,
      project_id: project_id,
      name,
      milestone_status,
      start_date,
      end_date,
    });

    // Create milestone members
    for (const value of projectmembers) {
      const projectMember = await Project_member.findOne({ where: { project_member_id: value } });
      if (!projectMember) {
        await Milestone.destroy({ where: { milestone_id:uuid } });
        return res.status(400).json({ "message": "Invalid project_member_id" });
      }

      await Milestone_members.create({
        milestone_member_id: uuidv4(),
        milestone_id: uuid,
        project_member_id: value,
      });
    }

    return res.status(201).json({ "message": "New milestone created", "milestone": milestone });
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


const handleGetAllMembersOfMilestone = async (req, res) => {
  const { id } = req.params;

  try {
    const milestone = await Milestone.findByPk(id);
    if (!milestone) {
      return res.status(404).json({ "message": "Milestone not found" });
    }

    // Find all milestone members associated with the milestone
    const milestoneMembers = await Milestone_members.findAll({
      attributes: ['milestone_member_id'],
      where: {
        milestone_id: id
      }
    });

    // Array to store user information
    let users = [];

    // Iterate through each milestone member
    for (let i = 0; i < milestoneMembers.length; i++) {
      const milestoneMember = milestoneMembers[i];
      
      // Retrieve the associated user information for the milestone member
      const user = await User.findOne({
        where: { user_id: milestoneMember.milestone_member_id },
        attributes: ["user_id", "full_name", "email"]
      });

      // Add user information to the array
      users.push(user);
    }

    // Return the array of user information JSON along with milestone details
    return res.status(200).json({ milestone, users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};






const updateMilestone = async (req, res) => {
  const { id } = req.params;
  const { project_id, name, milestone_status, technical_manager, start_date, end_date, created_by, updated_by, projectmembers } = req.body;

  // Validate inputs
  // if (!name || !project_id || !start_date || !end_date) {
  //   return res.status(400).json({ "message": "Please provide milestone information properly" });
  // }

  // Convert projectmembers to an array
  let projectMembersArray = [];
  if (projectmembers && typeof projectmembers === 'string') {
    projectMembersArray = projectmembers.split(",");
  }

  try {
    const milestone = await Milestone.findByPk(id);
    if (!milestone) {
      return res.status(404).json({ "message": "Milestone not found" });
    }

    // Update the milestone
    await milestone.update({
      project_id,
      name,
      milestone_status,
      technical_manager,
      start_date,
      end_date,
      created_by,
      updated_by,
    });

    // Create new milestone members
    for (const value of projectMembersArray) {
      const projectMember = await Project_member.findOne({ where: { project_member_id: value } });
      if (!projectMember) {
        return res.status(400).json({ "message": "Invalid project_member_id" });
      }

      // Check if the milestone member already exists
      const existingMember = await Milestone_members.findOne({
        where: { milestone_id: id, project_member_id: value }
      });

      // If the member does not exist, create it
      if (!existingMember) {
        await Milestone_members.create({
          milestone_member_id: uuidv4(),
          milestone_id: id,
          project_member_id: value,
        });
      }
    }

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

module.exports = {
  createMilestone,
  getAllMilestones,
  getMilestoneById,
  handleGetAllMembersOfMilestone,
  updateMilestone,
  deleteMilestone
};
