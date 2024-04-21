
const db = require("../../config/db");
const User = db.User;
const { DataTypes, UUID, where, UUIDV4 } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const project = require("../../models/project");
const Sub_task = db.Sub_task;
const Project = db.Project;
const Activity = db.Activity;




const Comment = db.Comment



const createComment = async (req, res) => {
  const uuid = uuidv4();
  const { sub_task_id, project_id, activity_id } = req.params;
  const { comment } = req.body;

  if ((!sub_task_id && !project_id && !activity_id) || !comment) {
    return res.status(400).json({ message: "Please provide sub_task_id and comment" });
  }

  try {
    // Check if the provided IDs exist in the respective tables
    const existingSubtask = sub_task_id ? await Sub_task.findByPk(sub_task_id) : null;
    const existingProject = project_id ? await Project.findByPk(project_id) : null;
    const existingActivity = activity_id ? await Activity.findByPk(activity_id) : null;

  //one Id must be there to create
    if (!existingSubtask &&!existingProject && !existingActivity) {
      return res.status(401).json({ message: "IDs not found" });
    }
console.log(req.id)
    const newComment = await Comment.create({
      comment_id: uuid,
      sub_task_id: sub_task_id || null,
      project_id: project_id || null,
      activity_id: activity_id || null,
      comment,
      created_by: req.id,
      updated_by: req.id
    });

    return res.status(201).json({ message: "New comment created", comment: newComment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


const getCommentById = async (req, res) => {
  var { comment_id } = req.params;
  console.log("comment_id=======",comment_id)

  try {
    const comments = await Comment.findByPk(comment_id);
    if (!comments) {
      return res.status(404).json({ "message": "Comment not found" });
    }
  
      const user = await User.findByPk(comments.created_by); // to get the info of comment creator
      console.log(user)
      comments.dataValues.commentedby = user.full_name;
       

    console.log("comment=====",comments)
    
    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const getAllComments = async (req, res) => {
  const { sub_task_id, project_id, activity_id } = req.params;

  try {
    // Define the filter object based on the presence of sub_task_id, project_id, or activity_id
    const filter = {};
    if (sub_task_id) filter.sub_task_id = sub_task_id;
    if (project_id) filter.project_id = project_id;
    if (activity_id) filter.activity_id = activity_id;

    // Find all comments based on the filter object
    const comments = await Comment.findAll({ where: filter });

    // Fetch the full_name of the creator for each comment using a loop
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      const user = await User.findByPk(comment.created_by); // Assuming created_by is the foreign key linking to User table
      if (user) {
        // Add full_name to the comment object if user exists
        comment.dataValues.commentedBy = user.full_name;
      }
    }

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


const updateComment = async (req, res) => {
  const { comment_id } = req.params;
  
  const {comment } = req.body;

  if (!comment) {
    return res.status(400).json({ "message": "Please provide comment" });
  }

  try {
    const existingComment = await Comment.findByPk(comment_id);
    if (!existingComment) {
      return res.status(404).json({ "message": "Comment not found" });
    }

    await existingComment.update({ comment});
    return res.status(200).json({ "message": "Comment updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const deleteComment = async (req, res) => {
  const { comment_id } = req.params;

  try {
    const existingComment = await Comment.findByPk(comment_id);
    if (!existingComment) {
      return res.status(404).json({ "message": "Comment not found" });
    }

    await existingComment.destroy();
    return res.status(200).json({ "message": "Comment deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

module.exports = { 
  createComment,
   getAllComments,
    getCommentById,
     updateComment, 
     deleteComment 
    };
