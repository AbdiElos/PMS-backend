const { where } = require("sequelize");
const db = require("../../config/db");
const Sub_task = db.Sub_task;
const User = db.User;
const Task_member = db.Task_member;
const Task = db.Task;
const Sub_task_member = db.Sub_task_member;
const Project_member = db.Project_member;
const Project = db.Project;
const Activity = db.Activity;
const { v4: uuidv4 } = require("uuid");

//const uuid = uuidv4();

const getAlltaskMembers = async (req, res) => {
  try {
    const members = await db.Task_member.findAll();
    return res.status(200).json(members);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const createSubTask = async (req, res) => {
  const uuid = uuidv4();

  const { name, subtask_status, start_date, end_date, subtaskmembers } =
    req.body;
  const { task_id } = req.params;
  // let subtaskmembers = subtaskmembers.split(",");
  console.log("task_id======", task_id);
  console.log("task_memberid=======", subtaskmembers);

  if (
    !name ||
    !subtask_status ||
    !subtaskmembers ||
    !start_date ||
    !end_date ||
    !task_id
  ) {
    return res
      .status(400)
      .json({ message: "Please provide the information properly" });
  }

  try {
    const existingSubTask = await Sub_task.findOne({
      where: { name: name, task_id: task_id },
    });
    if (existingSubTask) {
      return res.status(409).json({ message: "Sub_task name already exists" });
    }

    const task = await Task.findByPk(task_id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const subTask = await Sub_task.create({
      sub_task_id: uuid,
      name,
      task_id,
      subtask_status,
      start_date,
      end_date,
    });

    for (const value of subtaskmembers) {
      const projectMember = await Project_member.findOne({
        where: { project_member_id: value },
      });
      if (!projectMember) {
        await Sub_task.destroy({ where: { sub_task_id: uuid } });
        return res.status(400).json({ message: "Select member properly" });
      }

      await Sub_task_member.create({
        subtask_member_id: uuidv4(),
        sub_task_id: uuid,
        project_member_id: value,
      });
    }

    return res
      .status(201)
      .json({ message: "Sub-task created", subTask: subTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllSubTasks = async (req, res) => {
  const { task_id } = req.params;
  try {
    const subTasks = await Sub_task.findAll({
      where: { task_id: task_id, is_deleted: false },
      include: [
        {
          model: Project_member,
          as: "members",
          attributes: ["user_id"],
          through: { attributes: [] },
          include: [
            {
              model: User,
              as: "UserInfo",
              attributes: ["full_name", "img_url", "email"],
            },
          ],
        },
      ],
    });
    return res.status(200).json(subTasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getSubTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const subTask = await Sub_task.findOne({
      where: { sub_task_id: id, is_deleted: false },
    });
    if (!subTask) {
      return res.status(404).json({ message: "Sub-task not found" });
    }
    return res.status(200).json(subTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateSubTask = async (req, res) => {
  const { id } = req.params;
  const { name, subtask_status, start_date, end_date, subtaskmembers } =
    req.body;

  // Convert subtaskmembers to an array
  //let subtaskmembers = [];
  // if (subtaskmembers && typeof subtaskmembers === 'string') {
  //   subtaskmembers = subtaskmembers.split(",");
  // }

  try {
    const subTask = await Sub_task.findOne({
      where: { sub_task_id: id, is_deleted: false },
    });
    if (!subTask) {
      return res.status(404).json({ message: "Sub-task not found" });
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
      where: { sub_task_id: id },
    });

    // Create new sub-task members
    for (const value of subtaskmembers) {
      await Sub_task_member.create({
        subtask_member_id: uuidv4(),
        sub_task_id: id,
        project_member_id: value,
      });
    }

    return res.status(200).json({ message: "Sub-task updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteSubTask = async (req, res) => {
  const { id } = req.params;

  try {
    const subTask = await Sub_task.findByPk(id);
    if (!subTask) {
      return res.status(404).json({ message: "Sub-task not found" });
    }

    await subTask.destroy();
    return res.status(200).json({ message: "Sub-task deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getSubTaskMembers = async (req, res) => {
  const { id } = req.params;

  try {
    const subTask = await Sub_task.findByPk(id, {
      include: [
        {
          model: Project_member,
          as: "members", // Use the correct alias here
          attributes: ["user_id"],
          through: { attributes: [] },
          include: [
            {
              model: User,
              as: "UserInfo",
              attributes: ["full_name", "img_url", "email"],
            },
          ],
        },
      ],
    });
    if (!subTask) {
      return res.status(404).json({ message: "Sub_task not found" });
    }
    const members = subTask.members;
    return res.status(200).json(subTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//update status for sub_task,task,activity and project

const updateSubTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { subtask_status } = req.body;

  try {
    // Find the sub-task
    const subTask = await Sub_task.findOne({
      where: { sub_task_id: id, is_deleted: false },
      include: [
        {
          model: Task,
          as: "Task",
          include: [
            {
              model: Activity,
              as: "activity",
              include: [
                {
                  model: Project,
                  as: "project",
                },
              ],
            },
          ],
        },
      ],
    });
    console.log("subTask===", subTask);
    if (!subTask) {
      return res.status(404).json({ message: "Sub-task not found" });
    }

    // Update the sub-task status
    await subTask.update({
      subtask_status: subtask_status,
    });

    // Check the status of other sub-tasks with the same task_id
    const otherSubTasks = await Sub_task.findAll({
      where: { task_id: subTask.task_id, is_deleted: false },
    });
    console.log("otherSubTasks===", otherSubTasks);

    // Determine the overall task status based on the sub-task statuses
    let overallTaskStatus = "Pending";
    if (otherSubTasks.every((task) => task.subtask_status === "Completed")) {
      overallTaskStatus = "Completed";
      console.log("overall=======", overallTaskStatus);
    } else if (
      otherSubTasks.some((task) => task.subtask_status === "In Progress")
    ) {
      overallTaskStatus = "In Progress";
      console.log("overall=======", overallTaskStatus);
    }

    // Update the task status
    await Task.update(
      { task_status: overallTaskStatus },
      { where: { task_id: subTask.task_id } }
    );

    // Check if there are other tasks with the same activity_id
    const otherTasks = await Task.findAll({
      where: { activity_id: subTask.Task.activity_id, is_deleted: false },
    });
    console.log("otherTasks===", otherTasks);

    // Determine the overall activity status based on the task statuses
    let overallActivityStatus = "In Progress";
    if (otherTasks.every((task) => task.task_status === "Completed")) {
      overallActivityStatus = "Completed";
      console.log("overall activity=======", overallActivityStatus);
    } else if (otherTasks.some((task) => task.task_status === "Pending")) {
      overallActivityStatus = "Pending";
      console.log("overall activity=======", overallActivityStatus);
    }

    // Update the activity status
    await Activity.update(
      { activity_status: overallActivityStatus },
      { where: { activity_id: subTask.Task.activity_id } }
    );

    // Check if there are other activities with the same project_id
    const otherActivities = await Activity.findAll({
      where: {
        project_id: subTask.Task.activity.project_id,
        is_deleted: false,
      },
    });
    console.log("otherActivities===", otherActivities);

    // Determine the overall project status based on the activity statuses
    let overallProjectStatus = "In Progress";
    if (
      otherActivities.every(
        (activity) => activity.activity_status === "Completed"
      )
    ) {
      overallProjectStatus = "Completed";
      console.log("overall project=======", overallProjectStatus);
    } else if (
      otherActivities.some((activity) => activity.activity_status === "Pending")
    ) {
      overallProjectStatus = "Pending";
      console.log("overall project=======", overallProjectStatus);
    }

    // Update the project status
    await Project.update(
      { overall_progress: overallProjectStatus },
      { where: { project_id: subTask.Task.activity.project_id } }
    );

    return res
      .status(200)
      .json({ message: "Sub-task status updated", subTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  updateSubTaskStatus,
  createSubTask,
  getAllSubTasks,
  getSubTaskById,
  updateSubTask,
  deleteSubTask,
  getAlltaskMembers,
  getSubTaskMembers,
};
