const db = require("../../config/db");
const Activity = db.Activity;
const Activity_member = db.Activity_members;
const Project = db.Project;
const Project_member= db.Project_member
const User = db.User;

const handleDeleteActivity = async (req, res) => {
  const { activity_id } = req.params;
  try {
    // Delete the activity
    const activity = await Activity.findOne({ where: { activity_id: activity_id } });
    if (!activity) {
      return res.status(404).json({ "message": "Activity not found" });
    }
    activity.is_deleted = true;
    activity.deletedBy = req.id;
    activity.deletionAt = new Date();
    await activity.save();

    // Delete related activity members
    await Activity_member.update(
      { is_deleted: true, deletedBy: req.id, deletionAt: new Date() },
      { where: { activity_id: activity_id } }
    );

    return res.status(200).json({ "message": "Activity and related activity members deleted successfully. To recover, go to the trash page." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "message": "Server error" });
  }
};




const handleRestoreActivity = async (req, res) => {
    const { activity_id } = req.params;
    try {
      // Restore the activity
      const activity = await Activity.findOne({ where: { activity_id: activity_id } });
      if (!activity) {
        return res.status(404).json({ "message": "Activity not found" });
      }
      activity.is_deleted = false;
      activity.deletedBy = null;
      activity.deletionAt = null;
      await activity.save();
  
      // Restore related activity members
      await Activity_member.update(
        { is_deleted: false, deletedBy: null, deletionAt: null },
        { where: { activity_id: activity_id } }
      );
  
      return res.status(200).json({ "message": "Activity and related activity members recovered successfully. To view, go to the original page." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };


const handleAllDeletedActivities = async (req, res) => {
 
    const { project_id } = req.params;
    try {
      const activities = await Activity.findAll({
        where: { project_id: project_id , is_deleted:true},
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

module.exports = {
  handleDeleteActivity,
  handleRestoreActivity,
  handleAllDeletedActivities
};
