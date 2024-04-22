

const { Op, where } = require('sequelize');
const db = require('../../config/db');
const Task = db.Task;
const Sub_task = db.Sub_task;
const Activity = db.Activity
const Major_task_member = db.Major_task_member;
const User = db.User;
const Activity_member = db.Activity_members;
const Project_member = db.Project_member;
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

const getAllMilstone = async (req, res) => {
  const { project_id, activity_id,sub_task_id } = req.params;
  try {
    let milestones;

    // Check if project_id, activity_id, or sub_task_id is provided
    if (project_id) {
      // Fetch milestones where is_milestone is true based on project_id
      milestones = await Activity.findAll({
        where: { project_id: project_id, is_milestone: true },
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
    } else if (activity_id) {
      // Fetch milestones where is_milestone is true based on activity_id
      milestones = await Task.findAll({
        where: { activity_id: activity_id, is_milestone: true },
        // Include any necessary associations for Task model
      });
    } else if (sub_task_id) {
      // Fetch milestones where is_milestone is true based on sub_task_id
      milestones = await Sub_task.findAll({
        where: { sub_task_id: sub_task_id, is_milestone: true },
        // Include any necessary associations for Sub_task model
      });
    } else {
      return res.status(400).json({ "message": "Invalid request: Missing ID" });
    }

    return res.status(200).json(milestones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};
module.exports = { getAllMilstone };
