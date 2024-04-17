const db = require("../../config/db");
const Milestone = db.Milestone;
const Project = db.Project;
const User = db.User;
const Project_member = db.Project_member;
const Milestone_members = db.Milestone_members;
const { DataTypes, UUID, where } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const project = require("../../models/project");
const getAlllprojectMembers = async (req, res) => {

  
 
  
  
  try {
    const projectMembers = await db.Project_member.findAll();
    const userIds = projectMembers.map(member => member.user_id);
    const users = [];

    // Fetch associated users for each project member
    for (const userId of userIds) {
      const user = await db.User.findByPk(userId);
      users.push(user.full_name);
    }

    // Associate users with their corresponding project members
    

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
  };
  
  

const createMilestone = async (req, res) => {
  const uuid = uuidv4();
  var { name, milestone_status, start_date, end_date, projectmembers } = req.body;
  var { project_id } = req.params;
  console.log(projectmembers)
  // Check if projectmembers field exists and is a string
 
    
  
  // Validate inputs
  if (!name || !project_id || !start_date || !end_date) {
    return res.status(400).json({ "message": "Please provide milestone information properly" });
  }
  try{
    projectmembers = projectmembers.split(",");
  
  
  if (projectmembers.length === 0) {
    return res.status(400).json({ "message": "No project member checkboxes are selected." });
  }

  
    const existingMilestone = await Milestone.findOne({ where: { name } });
    if (existingMilestone) {
      return res.status(409).json({ "message": "Milestone name already exists" });
    }

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
// fetch all milestone with it's respective members
const getAllMilestones = async (req, res) => {
  const { project_id } = req.params;
  try {
    const milestones = await Milestone.findAll({
      where: { project_id: project_id },
      include: [
        {
          model: Project_member,
          as: 'members',
          attributes: ['user_id'],
          through: { attributes: [] },
          include: [{ model: User, as: "UserInfo", attributes: ["full_name", "img_url", "email"] }]
        }
      ]
    });
    return res.status(200).json(milestones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};


//find specific milestone with it's members
const getMilestoneById = async (req, res) => {
  const { id } = req.params;
  try {
    const milestone = await Milestone.findByPk(id, {
      include: [
        {
          model: Project_member,
          as: 'members',
          attributes: ['user_id'],
          through: { attributes: [] },
          include: [{ model: User, as: "UserInfo", attributes: ["full_name", "img_url", "email"] }]
        }
      ]
    });
    if (!milestone) {
      return res.status(404).json({ "message": "Milestone not found" });
    }
    return res.status(200).json(milestone);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};


//find only member of specific milestone
const handleGetAllMembersOfMilestone = async (req, res) => {
  const { id } = req.params;

  try {
    const milestone = await Milestone.findByPk(id, {
      include: [
        {
          model: Project_member,
          as: 'members', // Use the correct alias here
          attributes: ['user_id'],
          through: { attributes: [] },
          include:[{model:User,as:"UserInfo",attributes:["full_name","img_url","email"]}]
        }
      ]
    });
    if (!milestone) {
      return res.status(404).json({ "message": "Milestone not found" });
    }
    const members= milestone.members
    return res.status(200).json(members);
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

    // Delete existing milestone members
    await Milestone_members.destroy({
      where: { milestone_id: id }
    });

    // Create new milestone members
    for (const value of projectMembersArray) {
      await Milestone_members.create({
        milestone_member_id: uuidv4(),
        milestone_id: id,
        project_member_id: value,
      });
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

  deleteMilestone,
  getAlllprojectMembers 
};
