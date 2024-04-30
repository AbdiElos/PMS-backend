const { Op, where } = require('sequelize');
const db = require('../../config/db');
const Task = db.Task;
const Sub_task = db.Sub_task;
const Activity = db.Activity;
const Major_task_member = db.Major_task_member;
const User = db.User;
const Activity_member = db.Activity_members;
const Project_member = db.Project_member;
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

const getAllMilestone = async (req, res) => {
  const { idType, id } = req.params;
  try {
    let milestones;

    // Check the type of ID provided
    if (idType === 'project_id') {
      // Fetch milestones where is_milestone is true based on project_id
      milestones = await Activity.findAll({
        where: { project_id: id, is_milestone: true ,is_deleted:false},
        include: [
          {
            model: Project_member,
            as: 'members',
            attributes: ['user_id'],
            through: { attributes: [] },
            include: [{ model: User, as: 'UserInfo', attributes: ['full_name', 'img_url', 'email'] }]
          }
        ]
      });
    } else if (idType === 'activity_id') {
      // Fetch milestones where is_milestone is true based on activity_id
      milestones = await Task.findAll({
        where: { activity_id: id, is_milestone: true,is_deleted:false},
        // Include any necessary associations for Task model
      });
    } else if (idType === 'task_id') {
      // Fetch milestones where is_milestone is true based on task_id (sub_task_id)
      milestones = await Sub_task.findAll({
        where: { task_id: id, is_milestone: true,is_deleted:false },
        // Include any necessary associations for Sub_task model
      });
    } else {
      return res.status(400).json({ message: 'Invalid request: Missing or invalid ID type' });
    }

    return res.status(200).json(milestones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllMilestone };
