const db = require("../../config/db");
const Activity = db.Activity;
const Project = db.Project;
const User = db.User;
const Project_member = db.Project_member;
const Activity_members = db.Activity_members;
const { DataTypes, UUID, where } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const project = require("../../models/project");

const getAlllprojectMembers = async (req, res) => {
  
 
    const { project_id } = req.params;
    console.log(project_id);
    try {
      const members = await db.Project_member.findAll({
        where: { project_id: project_id },
        include: [{ 
          model: db.User,
          as: 'UserInfo', // Specify the alias for the association
          attributes: ['full_name']
        }]
      });
      return res.status(200).json(members);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  
  
  

const createActivity = async (req, res) => {
  const uuid = uuidv4();
  var { name, activity_status, start_date, end_date, projectmembers } = req.body;
  var { project_id } = req.params;

  if (!name || !project_id || !start_date || !end_date) {
    return res.status(400).json({ "message": "Please provide activity information properly" });
  }
  const existnigProject = await Project.findOne({where:{project_id:project_id}})
    if(!existnigProject){
      return res.status(400).json({"message":"we can't get the project to create activity for it"})
    }

  try {
    projectmembers = projectmembers.split(",");
  
    if (projectmembers.length === 0) {
      return res.status(400).json({ "message": "No project member checkboxes are selected." });
    }

    const existingActivity = await Activity.findOne({ where: { name } });
    
    if (existingActivity) {
      return res.status(409).json({ "message": "Activity name already exists" });
    }

    const activity = await Activity.create({
      activity_id: uuid,
      project_id: project_id,
      name,
      activity_status,
      start_date,
      end_date,
    });

    for (const value of projectmembers) {
      const projectMember = await Project_member.findOne({ where: { project_member_id: value } });
      if (!projectMember) {
        await Activity.destroy({ where: { activity_id: uuid } });
        return res.status(400).json({ "message": "Invalid project_member_id" });
      }

      await Activity_members.create({
        activity_member_id: uuidv4(),
        activity_id: uuid,
        project_member_id: value,
      });
    }

    return res.status(201).json({ "message": "New activity created", "activity": activity });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const getAllActivities = async (req, res) => {
  const { project_id } = req.params;
  try {
    const activities = await Activity.findAll({
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
    return res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const getActivityById = async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findByPk(id, {
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
    if (!activity) {
      return res.status(404).json({ "message": "Activity not found" });
    }
    return res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const handleGetAllMembersOfActivity = async (req, res) => {
  const { id } = req.params;

  try {
    const activity = await Activity.findByPk(id, {
      include: [
        {
          model: Project_member,
          as: 'members',
          attributes: ['user_id'],
          through: { attributes: [] },
          include:[{model:User,as:"UserInfo",attributes:["full_name","img_url","email"]}]
        }
      ]
    });
    if (!activity) {
      return res.status(404).json({ "message": "Activity not found" });
    }
    const members = activity.members;
    return res.status(200).json(members);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const updateActivity = async (req, res) => {
  const { id } = req.params;
  const { project_id, name, activity_status, start_date, end_date, created_by, updated_by, projectmembers } = req.body;

  let projectMembersArray = [];
  if (projectmembers && typeof projectmembers === 'string') {
    projectMembersArray = projectmembers.split(",");
  }

  try {
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ "message": "Activity not found" });
    }

    await activity.update({
      project_id,
      name,
      activity_status,
      start_date,
      end_date,
      created_by,
      updated_by,
    });

    await Activity_members.destroy({
      where: { activity_id: id }
    });

    for (const value of projectMembersArray) {
      await Activity_members.create({
        activity_member_id: uuidv4(),
        activity_id: id,
        project_member_id: value,
      });
    }

    return res.status(200).json({ "message": "Activity updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const deleteActivity = async (req, res) => {
  const { id } = req.params;

  try {
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ "message": "Activity not found" });
    }

    await activity.destroy();
    return res.status(200).json({ "message": "Activity deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  handleGetAllMembersOfActivity,
  updateActivity,
  deleteActivity,
  getAlllprojectMembers
};
