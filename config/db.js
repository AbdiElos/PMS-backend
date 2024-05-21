require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Roles = require("../models/Roles")(sequelize, Sequelize);
db.User = require("../models/user")(sequelize, Sequelize);
db.Permission = require("../models/permission")(sequelize, Sequelize);
db.Project = require("../models/project")(sequelize, Sequelize);
db.Sector = require("../models/sector")(sequelize, Sequelize);
db.Division = require("../models/division")(sequelize, Sequelize);
db.user_role = require("../models/user_role")(sequelize, Sequelize);
db.role_permission = require("../models/role_has_permission")(
  sequelize,
  Sequelize
);
db.sector = require("../models/sector")(sequelize, Sequelize);
db.division = require("../models/division")(sequelize, Sequelize);
db.Project_member = require("../models/project_member")(sequelize, Sequelize);

db.Activity = require("../models/Activity")(sequelize, Sequelize);

// db.Milestone= require('../models/Milestone')(sequelize, Sequelize);
db.Task = require("../models/task")(sequelize, Sequelize);
db.Sub_task = require("../models/sub_task")(sequelize, Sequelize);
db.Document = require("../models/document")(sequelize, Sequelize);
db.Document_type = require("../models/document_type")(sequelize, Sequelize);
db.Comment = require("../models/comment")(sequelize, Sequelize);
db.Team = require("../models/team")(sequelize, Sequelize);

db.Task_member = require("../models/task_member")(sequelize, Sequelize);
// db.Sub_task_member = require('../models/Subtask_members')(sequelize, Sequelize)

db.Activity_members = require("../models/activity_members")(
  sequelize,
  Sequelize
);
db.Sub_task_member = require("../models/subtask_members")(sequelize, Sequelize);

db.Major_task = require("../models/major_task")(sequelize, Sequelize);

db.Major_task_member = require("../models/major_task_member")(
  sequelize,
  Sequelize
);

// Define associations if any

//many to one association
db.SocialMedia.hasMany(db.OrganizationMedia, {
  foreignKey: "media_id",
  as: "OrganizationMedias",
});
db.OrganizationMedia.belongsTo(db.SocialMedia, {
  foreignKey: "media_id",
  as: "SocialMedias",
});

//for Sub_task and comment
db.Sub_task.hasMany(db.Comment, { foreignKey: "sub_task_id", as: "Coments" });
db.Comment.belongsTo(db.Sub_task, {
  foreignKey: "sub_task_id",
  as: "Sub_tasks",
});

//Project and comment
db.Project.hasMany(db.Comment, { foreignKey: "project_id", as: "Coments" });
db.Comment.belongsTo(db.Project, { foreignKey: "project_id", as: "Projects" });

//Activity and comment
db.Activity.hasMany(db.Comment, { foreignKey: "activity_id", as: "Coments" });
db.Comment.belongsTo(db.Activity, {
  foreignKey: "activity_id",
  as: "Activitys",
});

db.Division.hasMany(db.User, { foreignKey: "division_id", as: "Users" });
db.User.belongsTo(db.Division, { foreignKey: "division_id", as: "Division" });

// db.Task_member.hasMany(db.Sub_task, { foreignKey: 'task_member_id', as: 'Sub_tasks' });
// db.Sub_task.belongsTo(db.Task_member, { foreignKey: 'task_member_id', as: 'Task_member' });

db.Project.hasMany(db.Document, { foreignKey: "project_id", as: "Document" });
db.Document.belongsTo(db.Project, { foreignKey: "project_id", as: "Project" });

db.Team.hasMany(db.User, { foreignKey: "team_id", as: "Users" });
db.User.belongsTo(db.Team, { foreignKey: "team_id", as: "Team" });

db.User.hasMany(db.Project_member, {
  foreignKey: "user_id",
  as: "projectMembers",
});
db.Project_member.belongsTo(db.User, { foreignKey: "user_id", as: "UserInfo" });

db.Document_type.hasMany(db.Document, {
  foreignKey: "document_type_id",
  as: "Document",
});
db.Document.belongsTo(db.Document_type, {
  foreignKey: "document_type_id",
  as: "Document_type",
});

// Define many-to-many relationship between User and Roles
db.User.belongsToMany(db.Roles, {
  through: "User_roles",
  foreignKey: "user_id",
  otherKey: "role_id",
  as: "Roles", // Alias for the association
});

db.Roles.belongsToMany(db.User, {
  through: "User_roles",
  foreignKey: "role_id",
  otherKey: "user_id",
  as: "UsersRole", // Alias for the association
});

db.Permission.belongsToMany(db.Roles, {
  through: "Role_has_permissions",
  foreignKey: "permission_id",
  otherKey: "role_id",
  as: "Roles", // Alias for the association
});

db.Roles.belongsToMany(db.Permission, {
  through: "Role_has_permissions",
  foreignKey: "role_id",
  otherKey: "permission_id",
  as: "Permissions", // Alias for the association
});

db.User.belongsToMany(db.Project, {
  through: "project_members",
  foreignKey: "user_id",
  otherKey: "project_id",
  as: "Projects", // Alias for the association
});

db.Project.belongsToMany(db.User, {
  through: "project_members",
  foreignKey: "project_id",
  otherKey: "user_id",
  as: "Users", // Alias for the association
});

db.Roles.belongsToMany(db.Project, {
  through: "User_roles",
  foreignKey: "role_id",
  otherKey: "project_id",
  as: "Projects", // Alias for the association
});

db.Project.belongsToMany(db.Roles, {
  through: "User_roles",
  foreignKey: "project_id",
  otherKey: "role_id",
  as: "ProjectRoles", // Alias for the association
});
//many to many relationship b/n Activity and project_member
db.Activity.belongsToMany(db.Project_member, {
  through: "Activity_members",
  foreignKey: "activity_id",
  otherKey: "project_member_id",
  as: "members", // Alias for the association
});

db.Project_member.belongsToMany(db.Activity, {
  through: "Activity_members",
  foreignKey: "project_member_id",
  otherKey: "activity_id",
  as: "Activity", // Alias for the association
});

//many to many relationship b/n Major task and project_member
db.Major_task.belongsToMany(db.Project_member, {
  through: "Major_task_member",
  foreignKey: "Major_task_id",
  otherKey: "project_member_id",
  as: "members", // Alias for the association
});

db.Project_member.belongsToMany(db.Major_task, {
  through: "Major_task_member",
  foreignKey: "project_member_id",
  otherKey: "Major_task_id",
  as: "Major_task", // Alias for the association
});

//many to many relationship b/n Task and project_member
db.Task.belongsToMany(db.Project_member, {
  through: "Task_member",
  foreignKey: "task_id",
  otherKey: "project_member_id",
  as: "members", // Alias for the association
});

db.Project_member.belongsToMany(db.Task, {
  through: "Task_member",
  foreignKey: "project_member_id",
  otherKey: "task_id",
  as: "Task", // Alias for the association
});

//many to many relationship b/n Sub_task and project_member
db.Sub_task.belongsToMany(db.Project_member, {
  through: "Subtask_members",
  foreignKey: "sub_task_id",
  otherKey: "project_member_id",
  as: "members", // Alias for the association
});

db.Project_member.belongsToMany(db.Sub_task, {
  through: "Subtask_members",
  foreignKey: "project_member_id",
  otherKey: "sub_task_id",
  as: "Sub_task", // Alias for the association
});

db.Activity_members.belongsToMany(db.Task, {
  through: "Task_member",
  foreignKey: "activity_member_id",
  otherKey: "task_id",
  as: "Tasks",
});

db.Task.belongsToMany(db.Activity_members, {
  through: "Task_member",
  foreignKey: "task_id",
  otherKey: "activity_member_id",
  as: "Task_members",
});

// trash for deleted by relationship
db.User.hasMany(db.user_role, { foreignKey: "user_id", as: "UserToUserRoles" });
db.user_role.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "UserRoleToUser",
});

db.Roles.hasMany(db.user_role, {
  foreignKey: "role_id",
  as: "RolesToUserRole",
});
db.user_role.belongsTo(db.Roles, {
  foreignKey: "role_id",
  as: "UserRoleToRoles",
});

db.User.hasMany(db.Project, { foreignKey: "deletedBy", as: "DeletedProjects" });
db.Project.belongsTo(db.User, {
  foreignKey: "deletedBy",
  as: "DeletedByProjects",
});

db.User.hasMany(db.Document, {
  foreignKey: "deletedBy",
  as: "DeletedDocuments",
});
db.Document.belongsTo(db.User, {
  foreignKey: "deletedBy",
  as: "DeletedByDocuments",
});

db.User.hasMany(db.Roles, { foreignKey: "deletedBy", as: "DeletedRoles" });
db.Roles.belongsTo(db.User, { foreignKey: "deletedBy", as: "RoleDeletedBy" });

db.User.hasMany(db.Team, { foreignKey: "deletedBy", as: "DeletedTeams" });
db.Team.belongsTo(db.User, { foreignKey: "deletedBy", as: "TeamDeletedBy" });

db.User.hasMany(db.User, { foreignKey: "deletedBy", as: "DeletedUsers" });
db.User.belongsTo(db.User, { foreignKey: "deletedBy", as: "UserDeletedBy" });

db.User.hasMany(db.Sector, { foreignKey: "deletedBy", as: "DeletedSectors" });
db.Sector.belongsTo(db.User, {
  foreignKey: "deletedBy",
  as: "SectorDeletedBy",
});

db.User.hasMany(db.Division, {
  foreignKey: "deletedBy",
  as: "DeletedDivisions",
});
db.Division.belongsTo(db.User, {
  foreignKey: "deletedBy",
  as: "DivisionDeletedBy",
});

module.exports = db;
