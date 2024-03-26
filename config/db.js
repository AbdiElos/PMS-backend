require('dotenv').config();
const Sequelize = require('sequelize');
const milestone_members = require('../models/milestone_members');
const task = require('../models/task');

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
// db.Role_has_permission = require('../data/role_has_permission')(sequelize, Sequelize);

// db.Team= require('../data/Team')(sequelize, Sequelize);
// db.Sector= require('../data/Sector')(sequelize, Sequelize);


// db.Subtask= require('../data/Subtask')(sequelize, Sequelize);
// db.Comment= require('../data/Comment')(sequelize, Sequelize);
// db.Task_member= require('../data/Task_member')(sequelize, Sequelize);
// db.Document= require('../data/Document')(sequelize, Sequelize);
// db.Document_type= require('../data/Document_type')(sequelize, Sequelize);
// db.Milestone_members= require('../data/Milestone_members')(sequelize, Sequelize);



// Define associations if any

//many to one association
db.Division.hasMany(db.User, { foreignKey: 'division_id', as: 'Users' });
db.User.belongsTo(db.Division, { foreignKey: 'division_id', as: 'Division' });



// Project.hasMany(Milestone, {
//   foreignKey: 'project_id',
//   as: 'Milestones',
// });

// Milestone.belongsTo(Project, {
//   foreignKey: 'project_id',
//   as: 'Project',
// });


// Milestone.hasMany(Task, {foreignKey: 'milestone_id',as: 'Task',});
// Task.belongsTo(Milestone, {foreignKey: 'milestone_id',as: 'Milestone',});


//  db.Roles.hasMany(db.User, { foreignKey: "role_id", as: 'User' });
//  db.User.belongsTo(db.Roles, { foreignKey: "role_id", as: 'Roles' });


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



// // Define many-to-One relationship between Sector and Division
// db.Sector.hasMany(db.Division, { foreignKey: "sector_id", as: 'Division' });
// db.Division.belongsTo(db.Sector, { foreignKey: "sector_id", as: 'Sector' });


// // Define many-to-One relationship between Team and User
// db.Team.hasMany(db.User, { foreignKey: "team_id", as: 'User' });
// db.User.belongsTo(db.Team, { foreignKey: "team_id", as: 'Team' });

// // Define many-to-One relationship between Division and User
// db.Division.hasMany(db.User, { foreignKey: "division_id", as: 'User' });
// db.User.belongsTo(db.Division, { foreignKey: "division_id", as: 'Division' });


// // Define many-to-One relationship between Project and Document
// db.Project.hasMany(db.Document, { foreignKey: "project_id", as: 'Document' });
// db.Document.belongsTo(db.Project, { foreignKey: "project_id", as: 'Project' });

// // Define many-to-One relationship between Document_type  and Document
// db.Document_type.hasMany(db.Document, { foreignKey: "document_type_id", as: 'Document' });
// db.Document.belongsTo(db.Document_type, { foreignKey: "document_type_id", as: 'Document_type' });


// // Define many-to-One relationship between Milestone  and Task
// db.Milestone.hasMany(db.Task, { foreignKey: "milestone_id", as: 'Task' });
// db.Task.belongsTo(db.Milestone, { foreignKey: "milestone_id", as: 'Milestone' });
// // Define many-to many relationship between 





// // Define many-to-many relationship between User and Project
// db.User.belongsToMany(db.Project, {
//   through: 'Project_member',
//   foreignKey: 'user_id',
//    otherKey: 'project_id',
//    as: 'Project',
//  });

//  db.Project.belongsToMany(db.User, {
//   through: 'Project_member',
//  foreignKey: 'Project_id',
//   otherKey: 'user_id',
//   as: 'User',
//  });



// // Define many-to-many relationship between Roles and Permissions
//  db.Roles.belongsToMany(db.Permission, {
//   through: 'Role_has_permission',
//   foreignKey: 'role_id',
//    otherKey: 'permission_id',
//    as: 'Permissions',
//  });

//  db.Permission.belongsToMany(db.Roles, {
//   through: 'Role_has_permission',
//  foreignKey: 'permission_id',
//   otherKey: 'role_id',
//   as: 'Roles',
//  });
module.exports = db;
