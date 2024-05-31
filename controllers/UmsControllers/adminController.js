const bcrypt = require("bcrypt");
const db = require("../../config/db");

const user_role = db.user_role;
const User = db.User;
const Roles = db.Roles;
const Project = db.Project;
const Project_member = db.Project_member;
const Sub_task = db.Sub_task;
const Activity = db.Activity;
const Task = db.Task;

const getUser = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const result = await User.findOne({
      where: { user_id, is_deleted: false },
    });
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllUser = async (req, res) => {
  console.log("getting all users .....");
  try {
    const users = await User.findAll({ where: { is_deleted: false } });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users); // Use 200 status code for success
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  const full_name = req.params.full_name;
  const role = req.params.role;

  if (!full_name || !role) {
    return res.sendStatus(404);
  }

  try {
    const deleteUser = await User.destroy({ where: { full_name } });
    return res
      .status(201)
      .json({ message: `${full_name} deleted successfully` });
  } catch (err) {
    console.error(err);
    return res.status(404).json({ message: "User can't be deleted" });
  }
};

const editMember = async (req, res) => {
  const user_id = req.params.id;
  console.log(user_id);
  const { full_name, email, gender } = req.body;
  const img_url = req.file; // Get the uploaded image from the request
  console.log("image_name==", img_url.filename);

  try {
    const result = await User.findOne({ where: { user_id } });
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    if (full_name) result.full_name = full_name;
    if (email) result.email = email;
    if (gender) result.gender = gender;
    if (img_url) result.img_url = img_url.filename; // Save the image filename to the database

    await result.save();
    return res.status(201).json({ message: `user account updated` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server problem" });
  }
};
const toggleSuspend = async (req, res) => {
  const user_id = req.params.id;
  try {
    const result = await User.findOne({ where: { user_id } });
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    result.account_status = !result.account_status; // Remove the space before 'account_status'
    await result.save();

    return res.status(201).json({ message: `status is updated ` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server problem" });
  }
};

const getAllUserproject = async (req, res) => {
  const { user_id } = req.params;
  console.log("getting all user project.....");
  try {
    const projectMembers = await db.Project_member.findAll({
      where: { user_id: user_id },
      include: [
        {
          model: db.Project,
          as: "userproject",
          include: [
            {
              model: db.Activity,
              as: "activity",
              include: [
                {
                  model: db.Task,
                  as: "Task",
                  include: [
                    {
                      model: db.Sub_task,
                      as: "subTask",
                      attributes: [
                        "sub_task_id",

                        "name",
                        "subtask_status",
                        "start_date",
                        "end_date",
                        "is_milestone",
                        "created_by",
                        "updated_by",
                        "createdAt",
                        "updatedAt",
                        "is_deleted",
                        "deletionAt",
                        "deletedBy",
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    if (projectMembers.length === 0) {
      return res.status(404).json({ message: "No result" });
    }

    return res.status(200).json(projectMembers); // Use 200 status code for success
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllUsersubtask = async (req, res) => {
  const { project_member_id } = req.params;
  console.log("getting all user sub_task_of project_member.....");
  try {
    const SubTaskmember = await db.Sub_task_member.findAll({
      where: { project_member_id: project_member_id },
      include: [
        {
          model: db.Sub_task,
          as: "Subtaskdetail",
          attributes: [
            "sub_task_id",

            "name",
            "subtask_status",
            "start_date",
            "end_date",
            "is_milestone",
            "created_by",
            "updated_by",
            "createdAt",
            "updatedAt",
            "is_deleted",
            "deletionAt",
            "deletedBy",
          ],
        },
      ],
    });

    if (SubTaskmember.length === 0) {
      return res.status(404).json({ message: "No result" });
    }

    return res.status(200).json(SubTaskmember); // Use 200 status code for success
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllUserproject,
  getAllUsersubtask,
  getUser,
  deleteUser,
  editMember,
  toggleSuspend,
  getAllUser,
};
