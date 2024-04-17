
const { Op, where } = require('sequelize');
const db = require('../../config/db');
const Major_task = db.Major_task;
const Milestone = db.Milestone;
const Major_task_member = db.Major_task_member;
const User = db.User;
const Milestone_member = db.Milestone_members;
const Project_member = db.Project_member;
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

const getAllMilestoneMembers = async (req, res) => {
  try {
    const members = await db.Milestone_members.findAll();
    return res.status(200).json(members);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const createMajortask = async (req, res) => {
  const uuid = uuidv4();
  const { name, start_date, end_date, majortaskmembers } = req.body;
  const { milestone_id  } = req.params;
  console.log("milestone_id",milestone_id )
  console.log("majortaskmembers====", req.body);
  let majortaskmembersArray = [];
  
    majortaskmembersArray = majortaskmembers.split(",");
 

  try {
    if (!milestone_id ||!name || !start_date || !end_date || !majortaskmembers) {
      return res.status(400).json({ "message": "Please provide Major_task information properly" });
    }

    const existingTask = await Major_task.findOne({ where: { name } });
    if (existingTask) {
      return res.status(409).json({ "message": "Major task name already exists" });
    }

    const milestone = await Milestone.findByPk(milestone_id);
    if (!milestone) {
      return res.status(404).json({ "message": "Milestone not found" });
    }

    const Majortask = await Major_task.create({
      major_task_id: uuid,
      milestone_id :milestone_id,
      name,
      start_date,
      end_date,
    });

    for (const value of majortaskmembersArray) {
      const projectMember = await Project_member.findOne({ where: { project_member_id: value } });
      if (!projectMember) {
        await Major_task.destroy({ where: { Major_task_id: uuid } });
        return res.status(400).json({ "message": "Invalid project_member_id" });
      }

      await Major_task_member.create({
        major_task_member_id: uuidv4(),
        Major_task_id: uuid,
        project_member_id: value,
      });
    }

    return res.status(201).json({ "message": "New task created", "majortask": Majortask  });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};





const getAllmajorTasks = async (req, res) => {
  const { milestone_id } = req.params;
  try {
    const majortasks = await Major_task.findAll({
      where: { milestone_id: milestone_id },
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
    return res.status(200).json(majortasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};


const getmajorTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const majortask = await Major_task.findByPk(id);
    if (!majortask) {
      return res.status(404).json({ "message": "major task not found" });
    }
    return res.status(200).json(majortask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const updatemajorTask = async (req, res) => {
  const { id } = req.params;
  const { milestone_id, name, start_date, end_date, created_by, updated_by, majortaskmembers } = req.body;

  // Validate inputs
  // if (!milestone_id || !name || !start_date || !end_date) {
  //   return res.status(400).json({ "message": "Please provide major task information properly" });
  // }

  // Convert taskmembers to an array
  let majortaskMembersArray = [];
  if (majortaskmembers && typeof majortaskmembers === 'string') {
    majortaskMembersArray = majortaskmembers.split(",");
  }

  try {
    const majortask = await Major_task.findByPk(id);
    if (!majortask) {
      return res.status(404).json({ "message": "Major task not found" });
    }

    // Update the major task
    await majortask.update({
      milestone_id,
      name,
      start_date,
      end_date,
      created_by,
      updated_by,
    });

    // Delete existing major task members
    await Major_task_member.destroy({
      where: { major_task_id: id }
    });

    // Create new task members
    

    for (const value of majortaskMembersArray) {
      await Major_task_member.create({
        major_task_member_id: uuidv4(),
        Major_task_id: id,
        project_member_id: value,
      });
    }
    return res.status(200).json({ "message": "Major task updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};


const deletemajorTask = async (req, res) => {
  const { id } = req.params;

  try {
    const majortsk = await Major_task.findByPk(id);
    if (!majortsk) {
      return res.status(404).json({ "message": "major task not found" });
    }

    await Major_task.destroy();
    return res.status(200).json({ "message": "major task deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
 }
 };

const getmajortaskmember = async (req, res) => {
  const { id } = req.params;

  try {
    const majortask = await Major_task.findByPk(id, {
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
    if (!majortask) {
      return res.status(404).json({ "message": "major task not found" });
    }
    const members= majortask.members
    return res.status(200).json(majortask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

module.exports = { createMajortask,getAllmajorTasks,getmajorTaskById,  updatemajorTask, deletemajorTask, getAllMilestoneMembers, getmajortaskmember };
