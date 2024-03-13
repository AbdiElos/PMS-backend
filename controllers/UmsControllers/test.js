const User = require('../../models/user');
const Roles = require('../models/roles');

// // Assuming you have retrieved a user with id 1
// User.findOne(where:{user}, { include: Roles }).then(user => {
//   console.log(user.roles); // This should log an array of roles associated with the user
// });

// // Assuming you have retrieved a role with id 1
// Roles.findByPk(1, { include: User }).then(role => {
//   console.log(role.users); // This should log an array of users associated with the role
// });
