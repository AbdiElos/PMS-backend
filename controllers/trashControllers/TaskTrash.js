const db = require("../../config/db");
const Task = db.Task;
const Task_member = db.Task_member;

const Project_member= db.Project_member
const User = db.User;

const handleDeletetTask = async (req, res) => {
  const { task_id } = req.params;
  try {
    // Delete the  Task
    const task = await Task.findOne({ where: { task_id: task_id } });
    console.log("major task======",task)
    if (!task) {
      return res.status(404).json({ "message": "Task not found" });
    }
    task.is_deleted = true;
    task.deletedBy = req.id;
    task.deletionAt = new Date();
    await  task.save();

    // Delete related  Task members
    await Task_member.update(
      { is_deleted: true, deletedBy: req.id, deletionAt: new Date() },
      { where: { task_id: task_id } }
    );

    return res.status(200).json({ "message": "task and related task members deleted successfully. To recover, go to the trash page." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};



const handleRestoretask = async (req, res) => {
    const { task_id } = req.params;
    try {
      // Restore the task
      const task = await Task.findOne({ where: { task_id: task_id } });
      console.log(" task======",task)
      if (!task) {
        return res.status(404).json({ "message": "task not found" });
      }
      task.is_deleted = false;
      task.deletedBy = null;
      task.deletionAt = null;
      await task.save();
  
      // Restore related task members
      await Task_member.update(
        { is_deleted: false, deletedBy: null, deletionAt: null },
        { where: { task_id: task_id } }
      );
  
      return res.status(200).json({ "message": "task and related task members recovered successfully. To view, go to the original page." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };


const  handleAllDeletedTask = async (req, res) => {
 
   const { Major_task_id } = req.params;
    try {
      const  task= await Task.findAll({
        where: { major_task_id: Major_task_id  , is_deleted:true},
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
      return res.status(200).json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

module.exports = {
  handleDeletetTask,
  handleRestoretask,
  handleAllDeletedTask
};
