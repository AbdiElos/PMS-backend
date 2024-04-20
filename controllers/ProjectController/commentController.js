
const db = require("../../config/db");
const User = db.User;
const { DataTypes, UUID, where, UUIDV4 } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const project = require("../../models/project");
const Sub_task = db.Sub_task;

const Comment = db.Comment




const createComment = async (req, res) => {
  const uuid = uuidv4();
    var {sub_task_id}= req.params
  const { comment} = req.body;
console.log(sub_task_id)
  if (!sub_task_id || !comment) {
    return res.status(400).json({ "message": "Please provide sub_task_id and comment" });
  }
  const existingSubtask= await Sub_task.findByPk(sub_task_id)
  if(!existingSubtask){
    return res.status(401).json({"message":"sub task not found"})
  }

  try {
    const newComment = await Comment.create({
      comment_id: uuid,
      sub_task_id:sub_task_id,
      comment,
      created_by:req.id,
      updated_by:req.id
    });

    return res.status(201).json({ "message": "New comment created", "comment": newComment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};


const getCommentById = async (req, res) => {
  var { comment_id } = req.params;
  console.log("comment_id=======",comment_id)

  try {
    const comment = await Comment.findByPk(comment_id);
    console.log("comment=====",comment)
    if (!comment) {
      return res.status(404).json({ "message": "Comment not found" });
    }
    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};

const getAllComments = async (req, res) => {
    var {sub_task_id}=req.params
  try {
    const comments = await Comment.findAll({where:{sub_task_id:sub_task_id}});
    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
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
