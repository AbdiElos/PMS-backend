const db = require("../../config/db");
const Milestone = db.Milestone;
const Project = db.Project;
const User = db.User;
const Project_member = db.Project_member
const Milestone_members= db.Milestone_member
// const Milestone_members = db.Milestone_members
const { DataTypes, UUID } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
//const Project_members = require("../../models/project_member");




//Function to get all members from the project_member table
const getAllProjectMembers= async (req, res) => {
  try {
    const projectmembers = await Project_member.findAll();
    return res.status(200).json(projectmembers);//projectmembers=permissions
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
}

const createMilestone = async (req, res) => {
  const uuid = uuidv4();
  var { name, milestone_status, start_date, end_date, projectmembers } = req.body;
  if (typeof projectmembers !== 'string') {
    projectmembers = String(projectmembers); // Convert to a string if it's not already
  }
  var { project_id } = req.params;
  projectmembers = projectmembers.split(",");

  // Validate inputs
  if (!name || !project_id || !start_date || !end_date) {
    return res.status(400).json({ "message": "Please provide milestone information properly" });
  }
  
  if (!projectmembers || projectmembers.length === 0) {
    return res.status(400).json({ "message": "No project member checkboxes are selected." });
  }

  try {
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
      // Validate project_member_id
      const projectMember = await Project_member.findOne({ where: { project_member_id: value } });
      if (!projectMember) {
        await Milestone.destroy({ where: { milestone_id: milestone.milestone_id } });
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

const getAllMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.findAll();
    return res.status(200).json(milestones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const getMilestoneById = async (req, res) => {
  const { id } = req.params;

  try {
    const milestone = await Milestone.findByPk(id);
    if (!milestone) {
      return res.status(404).json({ "message": "Milestone not found" });
    }
    return res.status(200).json(milestone);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};




const handleGetAllMembersOfMilestone = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const milestone = await Milestone.findOne({
      where: { milestone_id: id },
      include: [{
        model: Project_member,
        as: "Project_members",
        attributes: ["project_member_id"]
      }],
      attributes: ["milestone_id", "name"]
    });

    console.log(milestone);

    if (!milestone) {
      return res.status(400).json({ "message": "Milestone not found" });
    }
    for (let i = 0; i < milestone.Project_members.length; i++) {
      const projectMember = milestone.Project_members[i];
      const user = await User.findOne({
        where: { user_id: "0968dca1-d770-4762-ab55-cee664225974" },
        
        attributes: ["user_id", "full_name", "email"]
      });
      projectMember.User = user; // Attach the user to the projectMember object
      
    }

    return res.status(200).json(milestone);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};



// const handleGetAllMembersOfMilestone= async (req, res) => {
//   const id=req.params.id
//   console.log(id)
//   try {
//     const milestone=await Milestone.findOne({where:{milestone_id:id},include:[{model: Project_member,as:"Project_members",attributes:{exclude:["createdAt","updatedAt"]}}],attributes:["milestone_id","name"]})
//     console.log(milestone)
//     if(!milestone){
//       return res.status(400).json({"message":"milestone not found"})
//     }
//     return res.status(200).json(milestone);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ "message": "Server error" });
//   }
// }



const updateMilestone = async (req, res) => {
  const { id } = req.params;
  const { project_id, name, milestone_status, technical_manager, start_date, end_date, created_by, updated_by } = req.body;

  try {
    const milestone = await Milestone.findByPk(id);
    if (!milestone) {
      return res.status(404).json({ "message": "Milestone not found" });
    }

    if (project_id) {
      const project = await Project.findByPk(project_id);
      if (!project) {
        return res.status(404).json({ "message": "Project not found" });
      }
    }

    await milestone.update({
      project_id:project_id,
      name,
      milestone_status,
      technical_manager,
      start_date,
      end_date,
      created_by,
      updated_by,
    });

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

module.exports = {createMilestone, getAllMilestones, getMilestoneById, updateMilestone, deleteMilestone, getAllProjectMembers,handleGetAllMembersOfMilestone };