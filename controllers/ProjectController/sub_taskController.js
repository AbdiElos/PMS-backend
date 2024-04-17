const { where } = require('sequelize');
const db = require('../../config/db');
const Sub_task = db.Sub_task;
const User = db.User;
const Task_member = db.Task_member
const Task = db.Task
const Sub_task_member = db.Sub_task_member
const Project_member = db.Project_member;
const { v4: uuidv4 } = require('uuid');

//const uuid = uuidv4();

const getAlltaskMembers = async (req, res) => {

  
  try {
    const members = await db.Task_member.findAll();
    return res.status(200).json(members);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};



const createSubTask = async (req, res) => {
  const uuid = uuidv4();

  const { name, subtask_status, start_date, end_date, subtaskmembers } = req.body;
  const { task_id } = req.params;
  let subtaskmembersArray = subtaskmembers.split(",");
  console.log("task_id======", task_id);
  console.log("task_memberid=======", subtaskmembersArray);

  if (!name || !subtask_status || !subtaskmembers || !start_date || !end_date || !task_id) {
    return res.status(400).json({ "message": "Please provide the information properly" });
  }

  try {
    const existingSubTask = await Sub_task.findOne({ where: { name } });
    if (existingSubTask) {
      return res.status(409).json({ "message": "Sub_task name already exists" });
    }

    const task = await Task.findByPk(task_id);
    if (!task) {
      return res.status(404).json({ "message": "Task not found" });
    }

    const subTask = await Sub_task.create({
      sub_task_id: uuid,
      name,
      task_id,
      subtask_status,
      start_date,
      end_date,
    });

    console.log("subtaskmembersArray=====", subtaskmembersArray[0]);

    for (const value of subtaskmembersArray) {
      const projectMember = await Project_member.findOne({ where: { project_member_id: value } });
      if (!projectMember) {
        await Sub_task.destroy({ where: { sub_task_id: uuid } });
        return res.status(400).json({ "message": "Select member properly" });
      }

      await Sub_task_member.create({
        subtask_member_id: uuidv4(),
        sub_task_id: uuid,
        project_member_id: value,
      });
    }

    return res.status(201).json({ "message": "Sub-task created", "subTask": subTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const getAllSubTasks = async (req, res) => {
  const {task_id}= req.params
  try {
    const subTasks = await Sub_task.findAll({where:{task_id:task_id},
      include: [
        {
          model: Project_member,
          as: 'members',
          attributes: ['user_id'],
          through: { attributes: [] },
          include: [{ model: User, as: "UserInfo", attributes: ["full_name", "img_url", "email"] }]
        }
      ]});
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
  const { name, subtask_status, start_date, end_date, subtaskmembers } = req.body;

  // Convert subtaskmembers to an array
  let subtaskmembersArray = [];
  if (subtaskmembers && typeof subtaskmembers === 'string') {
    subtaskmembersArray = subtaskmembers.split(",");
  }

  try {
    const subTask = await Sub_task.findByPk(id);
    if (!subTask) {
      return res.status(404).json({ "message": "Sub-task not found" });
    }

    // Update the sub-task
    await subTask.update({
      name,
      subtask_status,
      start_date,
      end_date,
      //...add any attribute here to update
    });




    // Delete existing sub task members
    await Sub_task_member.destroy({
      where: { sub_task_id: id }
    });

    // Create new sub-task members
    for (const value of subtaskmembersArray) {
      await Sub_task_member.create({
        subtask_member_id: uuidv4(),
        sub_task_id: id,
        project_member_id: value,
      });
     
      
    }

    return res.status(200).json({ "message": "Sub-task updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

module.exports = {
  updateSubTask,
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




const getSubTaskMembers = async (req, res) => {
  const { id } = req.params;

  try {
   
    const subTask = await Sub_task.findByPk(id, {
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
    if (!subTask) {
      return res.status(404).json({ "message": "Sub_task not found" });
    }
    const members= subTask.members
    return res.status(200).json(subTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }

};

module.exports = { createSubTask, getAllSubTasks, getSubTaskById, updateSubTask, deleteSubTask , getAlltaskMembers,getSubTaskMembers};