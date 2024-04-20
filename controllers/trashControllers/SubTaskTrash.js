const db = require("../../config/db");
const Sub_task = db.Sub_task;
const Sub_task_member = db.Sub_task_member;

const Project_member= db.Project_member
const User = db.User;

const   handleDeletetSubtask= async (req, res) => {
  const { sub_task_id } = req.params;
  try {
    // Delete the sub Task
    const sub_task = await Sub_task.findOne({ where: { sub_task_id: sub_task_id } });
    console.log("major task======",sub_task)
    if (!sub_task) {
      return res.status(404).json({ "message": "sub_Task not found" });
    }
    sub_task.is_deleted = true;
    sub_task.deletedBy = req.id;
    Sub_task.deletionAt = new Date();
    await  sub_task.save();

    // Delete related  sub_Task members
    await Sub_task_member.update(
      { is_deleted: true, deletedBy: req.id, deletionAt: new Date() },
      { where: { sub_task_id: sub_task_id } }
    );

    return res.status(200).json({ "message": "sub_task and related sub_task members deleted successfully. To recover, go to the trash page." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};



const handleRestoreSubtask = async (req, res) => {
    const { sub_task_id } = req.params;
    try {
      // Restore the sub task
      const sub_task = await Sub_task.findOne({ where: {sub_task_id:sub_task_id } });
      console.log(" task======",sub_task)
      if (!sub_task) {
        return res.status(404).json({ "message": "task not found" });
      }
      sub_task.is_deleted = false;
      sub_task.deletedBy = null;
      sub_task.deletionAt = null;
      await sub_task.save();
  
      // Restore related task members
      await Sub_task_member.update(
        { is_deleted: false, deletedBy: null, deletionAt: null },
        { where: {sub_task_id:sub_task_id } }
      );
  
      return res.status(200).json({ "message": "sub_task and related sub_task members recovered successfully. To view, go to the original page." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };


const  handleAllDeletedSubtask= async (req, res) => {
 
   const {task_id } = req.params;
    try {
      const  sub_Task= await Sub_task.findAll({
        where: { task_id : task_id   , is_deleted:true},
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
      return res.status(200).json(sub_Task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

module.exports = {
  handleDeletetSubtask,
  handleRestoreSubtask,
  handleAllDeletedSubtask
};
