const { Op } = require('sequelize');
const db = require('../../config/db');
const Task = db.Task;
const Milestone = db.Milestone;
const Task_members = db.Task_member
const User = db.User;
const Milestone_member = db.Milestone_members;
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
  const uuid = uuidv4();
  const { name, start_date, end_date, taskmembers } = req.body;
  const { milestone_id } = req.params;

  let taskmembersArray = taskmembers.split(",");

  if (!milestone_id || !name || !start_date || !end_date || !taskmembers) {
    return res.status(400).json({ "message": "Please provide task information properly" });
  }

  try {
    const existingTask = await Task.findOne({ where: { name } });
    if (existingTask) {
      return res.status(409).json({ "message": "Task name already exists" });
    }

    const milestone = await Milestone.findByPk(milestone_id);
    if (!milestone) {
      return res.status(404).json({ "message": "Milestone not found" });
    }

    const task = await Task.create({
      task_id: uuid,
      milestone_id,
      name,
      start_date,
      end_date,
    });

    for (const value of taskmembersArray) {
      const milestoneMember = await Milestone_member.findOne({ where: { milestone_member_id: value } });
      if (!milestoneMember) {
        await Task.destroy({ where: { task_id: uuid } });
        return res.status(400).json({ "message": "Sellect member properly" });
      }

      await Task_members.create({
        task_member_id: uuidv4(),
        task_id: uuid,
        milestone_member_id: value,
      });
    }

    return res.status(201).json({ "message": "New task created", "task": task });
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
// const gettaskmember = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const task = await Task.findByPk(id);
//     if (!task) {
//       return res.status(404).json({ "message": "Task not found" });
//     }

//     // Find all task members associated with the task
//     const taskMembers = await Task_members.findAll({
//       attributes: ['task_member_id'],
//       where: {
//         task_id: id
//       }
//     });

//     // Array to store user information
//     let users = [];

//     // Iterate through each task member
//     for (let i = 0; i < taskMembers.length; i++) {
//       const taskMember = taskMembers[i];

//       // Retrieve the associated user information for the task member
//       console.log("taskMember========",taskMember.dataValues.task_member_id)
//       const user = await User.findOne({
//         where: { user_id: "eb9b7d27-7e08-4e83-8f78-02aa4453ea6a" },
//         attributes: ["user_id", "full_name", "email"]
//       });
// console.log(user)
//       // Add user information to the array
//       users.push(user);
//     }

//     return res.status(200).json({ task, users });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ "message": "Server error" });
//   }
// };

const gettaskmember = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ "message": "Task not found" });
    }

    // Find all task members associated with the task
    const taskMembers = await Task_members.findAll({
      attributes: ['task_member_id'],
      where: {
        task_id: id
      }
    });

    // Array to store user information
    let users = [];

    // Iterate through each task member
    console.log("taskmembers=====", taskMembers)
    for (let i = 0; i < taskMembers.length; i++) {
      const taskMember = taskMembers[i];
      console.log("taskmember id=========",taskMember.task_member_id)
      const user = await User.findOne({
        where: { user_id: taskMember.task_member_id },
        attributes: ["user_id", "full_name", "email"]
      });

      // Add user information to the array
      users.push(user);
    }

    return res.status(200).json({ task, users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};


module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask,getAllMilestoneMembers, gettaskmember};