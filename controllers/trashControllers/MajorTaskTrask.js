const db = require("../../config/db");
const Major_task = db.Major_task;
const Major_task_member = db.Major_task_member;

const Project_member= db.Project_member
const User = db.User;

const handleDeleteMajor_task = async (req, res) => {
  const { Major_task_id } = req.params;
  try {
    // Delete the Major Task
    const major_task = await Major_task.findOne({ where: { Major_task_id: Major_task_id } });
    console.log("major task======",major_task)
    if (!major_task) {
      return res.status(404).json({ "message": "Major Task not found" });
    }
    major_task.is_deleted = true;
    major_task.deletedBy = req.id;
    major_task.deletionAt = new Date();
    await  major_task.save();

    // Delete related Major Task members
    await Major_task_member.update(
      { is_deleted: true, deletedBy: req.id, deletionAt: new Date() },
      { where: { Major_task_id: Major_task_id } }
    );

    return res.status(200).json({ "message": "Major task and related activity members deleted successfully. To recover, go to the trash page." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};



const handleRestoreMajor_task = async (req, res) => {
    const { Major_task_id } = req.params;
    try {
      // Restore the Major_task
      const major_task = await Major_task.findOne({ where: { Major_task_id: Major_task_id } });
      console.log("major task======",major_task)
      if (!major_task) {
        return res.status(404).json({ "message": "Major_task not found" });
      }
      major_task.is_deleted = false;
      major_task.deletedBy = null;
      major_task.deletionAt = null;
      await major_task.save();
  
      // Restore related Major_task members
      await Major_task_member.update(
        { is_deleted: false, deletedBy: null, deletionAt: null },
        { where: { Major_task_id: Major_task_id } }
      );
  
      return res.status(200).json({ "message": "Major_task and related Major_task members recovered successfully. To view, go to the original page." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };


const   handleAllDeletedMajortask = async (req, res) => {
 
   const { activity_id } = req.params;
    try {
      const  major_task= await Major_task.findAll({
        where: { activity_id: activity_id  , is_deleted:true},
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
      return res.status(200).json(major_task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };

module.exports = {
  handleDeleteMajor_task,
  handleRestoreMajor_task,
  handleAllDeletedMajortask
};
