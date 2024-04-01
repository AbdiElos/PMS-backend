const db = require('../../config/db');
const Sub_task = db.Sub_task;
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

const createSubTask = async (req, res) => {
  try {
    const { task_member_id, name, subtask_status, start_date, end_date, created_by, updated_by } = req.body;
    if (!task_member_id || !name || !subtask_status) {
      return res.status(400).json({ "message": "Please provide task_member_id, name, and subtask_status" });
    }

    const subTask = await Sub_task.create({
      sub_task_id: uuidv4(),
      task_member_id,
      name,
      subtask_status,
      start_date,
      end_date,
      created_by,
      updated_by,
    });

    return res.status(201).json({ "message": "Sub-task created", "subTask": subTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const getAllSubTasks = async (req, res) => {
  try {
    const subTasks = await Sub_task.findAll();
    return res.status(200).json(subTasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const getSubTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const subTask = await Sub_task.findByPk(id);
    if (!subTask) {
      return res.status(404).json({ "message": "Sub-task not found" });
    }
    return res.status(200).json(subTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const updateSubTask = async (req, res) => {
  const { id } = req.params;
  const { task_member_id, name, subtask_status, start_date, end_date, created_by, updated_by } = req.body;

  try {
    const subTask = await Sub_task.findByPk(id);
    if (!subTask) {
      return res.status(404).json({ "message": "Sub-task not found" });
    }

    await subTask.update({
      task_member_id,
      name,
      subtask_status,
      start_date,
      end_date,
      created_by,
      updated_by,
    });

    return res.status(200).json({ "message": "Sub-task updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const deleteSubTask = async (req, res) => {
  const { id } = req.params;

  try {
    const subTask = await Sub_task.findByPk(id);
    if (!subTask) {
      return res.status(404).json({ "message": "Sub-task not found" });
    }

    await subTask.destroy();
    return res.status(200).json({ "message": "Sub-task deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

module.exports = { createSubTask, getAllSubTasks, getSubTaskById, updateSubTask, deleteSubTask };