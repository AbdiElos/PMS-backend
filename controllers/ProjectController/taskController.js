const { Op } = require('sequelize');
const db = require('../../config/db');
const Task = db.Task;
const Milestone = db.Milestone;
const Task_members = db.Task_member
const Major_task = db.Major_task;
const User = db.User;
const Milestone_member = db.Milestone_members;
const Project_member = db.Project_member;
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();


const getAllMilestoneMembers = async (req, res) => {

  
  // try {
  //   const members = await db.Milestone_members.findAll();
  //   return res.status(200).json(members);
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ "message": "Server error" });
  // }
};
const createTask = async (req, res) => {
  const uuid = uuidv4();
  const { name, start_date, end_date, taskmembers } = req.body;
  const { Major_task_id } = req.params;
  console.log("taskmembers====", req.body);
  let taskmembersArray = [];
    if (taskmembers) {
      taskmembersArray = taskmembers.split(",");
    }
  
  try {
    
    console.log(Major_task_id)

    if (!Major_task_id || !name || !start_date || !end_date || !taskmembers) {
      return res.status(400).json({ "message": "Please provide task information properly" });
    }

    const existingTask = await Task.findOne({ where: { name } });
    if (existingTask) {
      return res.status(409).json({ "message": "Task name already exists" });
    }

    const major_task = await Major_task.findByPk(Major_task_id);
    if (!major_task) {
      return res.status(404).json({ "message": "Major_task not found" });
    }

    const task = await Task.create({
      task_id: uuid,
      Major_task_id,
      name,
      start_date,
      end_date,
    });

    for (const value of taskmembersArray) {
      const projectMember = await Project_member.findOne({ where: { project_member_id: value } });
      if (!projectMember) {
        await Task.destroy({ where: { task_id: uuid } });
        return res.status(400).json({ "message": "Invalid project_member_id" });
      }

      await Task_members.create({
        task_member_id: uuidv4(),
        task_id: uuid,
        project_member_id: value,
      });
    }

    return res.status(201).json({ "message": "New task created", "task": task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};


const getAllTasks = async (req, res) => {
  const{Major_task_id}= req.params
  try {
    const tasks = await Task.findAll({wher:{Major_task_id:Major_task_id},
      include: [
        {
          model: Project_member,
          as: 'members',
          attributes: ['user_id'],
          through: { attributes: [] },
          include: [{ model: User, as: "UserInfo", attributes: ["full_name", "img_url", "email"] }]
        }
      ]});
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
  const uuid = uuidv4();
  
  
  const {Major_task_id,name, start_date, end_date, created_by, updated_by,taskmembers  } = req.body;
  const { task_id } = req.params;
  console.log("taskmembers====", req.body);
  let taskmembersArray = [];
    if (taskmembers) {
      taskmembersArray = taskmembers.split(",");
    }

  try {
    const task = await Task.findByPk(task_id);
    if (!task) {
      return res.status(404).json({ "message": "Task not found" });
    }

    await task.update({
      Major_task_id,
      name,
      start_date,
      end_date,
      created_by,
      updated_by,
    });

      // Delete existing major task members
      await Task_members.destroy({
        where: { task_id: task_id }
      });
  
      // Create new task members
      
  
      for (const value of taskmembersArray) {
        await Task_members.create({
          task_member_id: uuidv4(),
          task_id: task_id,
          project_member_id: value,
        });
      }
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



const gettaskmember = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id, {
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
    if (!task) {
      return res.status(404).json({ "message": "Task not found" });
    }
    const members= task.members
    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }

};




module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask,getAllMilestoneMembers, gettaskmember};