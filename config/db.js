require('dotenv').config();
const Sequelize = require('sequelize');


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql', 
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

// Import  models here
db.Roles = require('../models/Roles')(sequelize, Sequelize);
db.User = require('../models/user')(sequelize, Sequelize);
db.Activity = require('../models/activity')(sequelize, Sequelize);
db.Permission = require('../models/permission')(sequelize, Sequelize);
db.Project= require('../models/project')(sequelize, Sequelize);
db.Sector = require('../models/sector')(sequelize, Sequelize);
db.Division= require('../models/division')(sequelize, Sequelize);
//db.User_role = require('../models/user_role')(sequelize, Sequelize);
db.user_role=require('../models/user_role')(sequelize, Sequelize)
db.role_permission=require('../models/role_has_permission')(sequelize,Sequelize)
db.sector=require('../models/sector')(sequelize,Sequelize)
db.division=require('../models/division')(sequelize,Sequelize)
db.Project_member= require('../models/project_member')(sequelize, Sequelize);

db.Milestone= require('../models/Milestone')(sequelize, Sequelize);
db.Milestone_members= require('../models/milestone_members')(sequelize, Sequelize);
db.Task= require('../models/task')(sequelize, Sequelize);
db.Task_member= require('../models/task_member')(sequelize, Sequelize);
db.Sub_task= require('../models/sub_task')(sequelize, Sequelize);
db.Document= require('../models/document')(sequelize, Sequelize);
db.Document_type= require('../models/document_type')(sequelize, Sequelize);
db.Comment= require('../models/comment')(sequelize, Sequelize);
db.Team= require('../models/team')(sequelize, Sequelize);








// Define associations if any

//many to one association

db.Division.hasMany(db.User, { foreignKey: 'division_id', as: 'Users' });
db.User.belongsTo(db.Division, { foreignKey: 'division_id', as: 'Division' });



db.Task_member.hasMany(db.Sub_task, { foreignKey: 'task_member_id', as: 'Sub_tasks' });
db.Sub_task.belongsTo(db.Task_member, { foreignKey: 'task_member_id', as: 'Task_member' });


db.Project.hasMany(db.Document, { foreignKey: "project_id", as: 'Document' });
db.Document.belongsTo(db.Project, { foreignKey: "project_id", as: 'Project' });



db.Team.hasMany(db.User, { foreignKey: "team_id", as: 'User' });
db.User.belongsTo(db.Team, { foreignKey: "team_id", as: 'Team' });


db.Document_type.hasMany(db.Document, { foreignKey: "document_type_id", as: 'Document' });
 db.Document.belongsTo(db.Document_type, { foreignKey: "document_type_id", as: 'Document_type' });










// Define many-to-many relationship between User and Roles
db.User.belongsToMany(db.Roles, {
  through: 'User_roles',
  foreignKey: 'user_id',
  otherKey: 'role_id',
  as: 'Roles' // Alias for the association
});

db.Roles.belongsToMany(db.User, {
  through: 'User_roles',
  foreignKey: 'role_id',
  otherKey: 'user_id',
  as: 'Users' // Alias for the association
});

db.Permission.belongsToMany(db.Roles, {
  through: 'Role_has_permissions',
  foreignKey: 'permission_id',
  otherKey: 'role_id',
  as: 'Roles' // Alias for the association
});

db.Roles.belongsToMany(db.Permission, {
  through: 'Role_has_permissions',
  foreignKey: 'role_id',
  otherKey: 'permission_id',
  as: 'Permissions' // Alias for the association
});



db.User.belongsToMany(db.Project, {
  through: 'Project_member',
  foreignKey: 'user_id',
  otherKey: 'project_id',
  as: 'Projects' // Alias for the association
});

db.Project.belongsToMany(db.User, {
  through: 'Project_member',
  foreignKey: 'project_id',
  otherKey: 'user_id',
  as: 'Users' // Alias for the association
});



//many to many relationship b/n Milestone and project_member
db.Milestone.belongsToMany(db.Project_member, {
  through: 'Milestone_member',
  foreignKey: 'milestone_id',
  otherKey: 'project_member_id',
  as: 'Project_members' // Alias for the association
});

db.Project_member.belongsToMany(db.Milestone, {
  through: 'Milestone_member',
  foreignKey: 'project_member_id',
  otherKey: 'milestone_id',
  as: 'Milestons' // Alias for the association
});



db.Milestone_members.belongsToMany(db.Task, {
  through: 'Task_member',
  foreignKey: 'milestone_member_id',
  otherKey: 'task_id',
  as: 'Tasks',
});

db.Task.belongsToMany(db.Milestone_members, {
  through: 'Task_member',
  foreignKey: 'task_id',
  otherKey: 'milestone_member_id',
  as: 'Milestone_members',
});

module.exports = db;
