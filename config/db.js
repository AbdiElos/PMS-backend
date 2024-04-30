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

db.Roles = require('../models/Roles')(sequelize, Sequelize);
db.User = require('../models/user')(sequelize, Sequelize);
db.Permission = require('../models/permission')(sequelize, Sequelize);
db.Project= require('../models/project')(sequelize, Sequelize);
db.Sector = require('../models/sector')(sequelize, Sequelize);
db.Division= require('../models/division')(sequelize, Sequelize);
db.user_role=require('../models/user_role')(sequelize, Sequelize)
db.role_permission=require('../models/role_has_permission')(sequelize,Sequelize)
db.sector=require('../models/sector')(sequelize,Sequelize)
db.division=require('../models/division')(sequelize,Sequelize)
db.Project_member= require('../models/project_member')(sequelize, Sequelize);
db.Milestone= require('../models/Milestone')(sequelize, Sequelize);
db.Task= require('../models/task')(sequelize, Sequelize);
db.Sub_task= require('../models/sub_task')(sequelize, Sequelize);
db.Document= require('../models/document')(sequelize, Sequelize);
db.Document_type= require('../models/document_type')(sequelize, Sequelize);
db.Comment= require('../models/comment')(sequelize, Sequelize);
db.Team= require('../models/team')(sequelize, Sequelize);
db.Milestone_members = require('../models/milestone_members')(sequelize, Sequelize);
db.Sub_task_member = require('../models/subtask_members')(sequelize, Sequelize);
db.Major_task = require('../models/major_task')(sequelize, Sequelize);
db.Major_task_member = require('../models/major_task_member')(sequelize, Sequelize);
db.Organization=require('../models/organization')(sequelize,Sequelize)
db.OrganizationMedia=require('../models/organization_media')(sequelize,Sequelize)
db.SocialMedia=require('../models/SocialMedia')(sequelize,Sequelize)




// Define associations if any

//many to one association
db.SocialMedia.hasMany(db.OrganizationMedia, { foreignKey: 'media_id', as: 'OrganizationMedias' });
db.OrganizationMedia.belongsTo(db.SocialMedia, { foreignKey: 'media_id', as: 'SocialMedias' });

db.Sector.hasMany(db.Division, { foreignKey: 'sector_id', as: 'Divisions' });
db.Division.belongsTo(db.Sector, { foreignKey: 'sector_id', as: 'Sector' });

db.Division.hasMany(db.User, { foreignKey: 'division_id', as: 'Users' });
db.User.belongsTo(db.Division, { foreignKey: 'division_id', as: 'Division' });

db.Project.hasMany(db.Document, { foreignKey: "project_id", as: 'Document' });
db.Document.belongsTo(db.Project, { foreignKey: "project_id", as: 'Project' });

db.Team.hasMany(db.User, { foreignKey: "team_id", as: 'teamMembers' });
db.User.belongsTo(db.Team, { foreignKey: "team_id", as: 'Team' });

db.User.hasMany(db.Team, { foreignKey: "team_manager_id", as: 'Manages' });
db.Team.belongsTo(db.User, { foreignKey: "team_manager_id", as: 'ManagedBy' });

db.User.hasMany(db.Project_member, { foreignKey: "user_id", as: 'projectMembers' });
db.Project_member.belongsTo(db.User, { foreignKey: "user_id", as: 'UserInfo' });

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

// relationship between role and project through user role
db.Roles.belongsToMany(db.Project, {
  through: 'User_roles',
  foreignKey: 'role_id',
  otherKey: 'project_id',
  as: 'Projects' // Alias for the association
});

db.Project.belongsToMany(db.Roles, {
  through: 'User_roles',
  foreignKey: 'project_id',
  otherKey: 'role_id',
  as: 'ProjectRoles' // Alias for the association
});

//many to many relationship b/n Milestone and project_member
// db.Milestone.belongsToMany(db.Project_member, {
//   through: 'Milestone_member',
//   foreignKey: 'milestone_id',
//   otherKey: 'project_member_id',
//   as: 'Project_members' // Alias for the association
// });

// db.Project_member.belongsToMany(db.Milestone, {
//   through: 'Milestone_member',
//   foreignKey: 'project_member_id',
//   otherKey: 'milestone_id',
//   as: 'Milestons' // Alias for the association
// });
db.Project_member.belongsToMany(db.Milestone, {
  through: 'Milestone_members',
  foreignKey: 'project_member_id',
  otherKey: 'milestone_id',
  as: 'Milestone' // Alias for the association
});




//many to many relationship b/n Major task and project_member
db.Major_task.belongsToMany(db.Project_member, {
  through: 'Major_task_member',
  foreignKey: 'Major_task_id',
  otherKey: 'project_member_id',
  as: 'members' // Alias for the association
});

db.Project_member.belongsToMany(db.Major_task, {
  through: 'Major_task_member',
  foreignKey: 'project_member_id',
  otherKey: 'Major_task_id',
  as: 'Major_task' // Alias for the association
});

//many to many relationship b/n Task and project_member
db.Task.belongsToMany(db.Project_member, {
  through: 'Task_member',
  foreignKey: 'task_id',
  otherKey: 'project_member_id',
  as: 'members' // Alias for the association
});

db.Project_member.belongsToMany(db.Task, {
  through: 'Task_member',
  foreignKey: 'project_member_id',
  otherKey: 'task_id',
  as: 'Task' // Alias for the association
});


//many to many relationship b/n Sub_task and project_member
db.Sub_task.belongsToMany(db.Project_member, {
  through: 'Subtask_members',
  foreignKey: 'sub_task_id',
  otherKey: 'project_member_id',
  as: 'members' // Alias for the association
});

db.Project_member.belongsToMany(db.Sub_task, {
  through: 'Subtask_members',
  foreignKey: 'project_member_id',
  otherKey: 'sub_task_id',
  as: 'Sub_task' // Alias for the association
});

db.Task.belongsToMany(db.Milestone_members, {
  through: 'Task_member',
  foreignKey: 'task_id',
  otherKey: 'milestone_member_id',
  as: 'Task_members',
});



// trash for deleted by relationship
db.User.hasMany(db.Project, { foreignKey: "deletedBy", as: 'DeletedProjects' });
db.Project.belongsTo(db.User, { foreignKey: "deletedBy", as: 'DeletedByProjects' });

db.User.hasMany(db.Document, { foreignKey: "deletedBy", as: 'DeletedDocuments' });
db.Document.belongsTo(db.User, { foreignKey: "deletedBy", as: 'DeletedByDocuments' });

db.User.hasMany(db.Roles, { foreignKey: "deletedBy", as: 'DeletedRoles' });
db.Roles.belongsTo(db.User, { foreignKey: "deletedBy", as: 'RoleDeletedBy' });

db.User.hasMany(db.Team, { foreignKey: "deletedBy", as: 'DeletedTeams' });
db.Team.belongsTo(db.User, { foreignKey: "deletedBy", as: 'TeamDeletedBy' });

db.User.hasMany(db.User, { foreignKey: "deletedBy", as: 'DeletedUsers' });
db.User.belongsTo(db.User, { foreignKey: "deletedBy", as: 'UserDeletedBy' });

db.User.hasMany(db.Sector, { foreignKey: "deletedBy", as: 'DeletedSectors' });
db.Sector.belongsTo(db.User, { foreignKey: "deletedBy", as: 'SectorDeletedBy' });

db.User.hasMany(db.Division, { foreignKey: "deletedBy", as: 'DeletedDivisions' });
db.Division.belongsTo(db.User, { foreignKey: "deletedBy", as: 'DivisionDeletedBy' });

module.exports = db;
