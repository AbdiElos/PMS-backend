const db = require('../../config/db');
const Task = db.Task;
const Milestone = db.Milestone;
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
const createTask = async (req, res) => {
  try {

    const { name, start_date, end_date, created_by, updated_by, member_ids } = req.body;
    const { milestone_id } = req.params;
    if (!milestone_id || !name || !start_date || !end_date || !created_by || !updated_by) {
      return res.status(400).json({ "message": "Please fill all the forms" });
    }

    // Check if the milestone exists
    const milestone = await Milestone.findByPk(milestone_id); 
    if (!milestone) {
      return res.status(404).json({ "message": "Milestone not found" });
    }

    // Check if the task name already exists
    const existingTask = await Task.findOne({ where: { name } }); 
    if (existingTask) {
      return res.status(409).json({ "message": "Task name already exists" });
    }

    // Check if the task dates are within the milestone dates
    if (start_date < milestone.start_date || end_date > milestone.end_date) {
      return res.status(400).json({ "message": "Task dates should be within the milestone dates" });
    }

    const task = await Task.create({
      task_id: uuidv4(),
      milestone_id,
      name,
      start_date,
      end_date,
      created_by,
      updated_by,
    });

    // Add members to the task_members table
    if (member_ids && member_ids.length > 0) {
      const taskMembers = member_ids.map(member_id => ({
        task_member_id: uuidv4(),
        task_id: task.task_id,
        project_member_id: member_id
      }));

      await Task_members.bulkCreate(taskMembers);
    }

    return res.status(201).json({ "message": "Task created", "task": task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ "message": "Task not found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { milestone_id, name, start_date, end_date, created_by, updated_by } = req.body;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ "message": "Task not found" });
    }

    await task.update({
      milestone_id,
      name,
      start_date,
      end_date,
      created_by,
      updated_by,
    });

    return res.status(200).json({ "message": "Task updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ "message": "Task not found" });
    }

    await task.destroy();
    return res.status(200).json({ "message": "Task deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask,getAllMilestoneMembers };