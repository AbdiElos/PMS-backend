  // const duplicateFullName = await User.findOne({ 
  //   where: { user_id: "9737cc04-e2c7-481b-b925-0dd5cfcc482f" },
  //   include: [{
  //     model: Roles, 
  //     as: 'Roles', 
      
  //   }]
  // });
  // console.log("hello !!!!!")
  // console.log("user info ==", duplicateFullName.toJSON());


// //code to chack association b/n permission and roles
//   const permissionWithRoles = await Permission.findOne({ 
//     where: { permission_id: 'f7db6156-8937-41d0-8f62-1c516ea6252b' },
//     include: [{
//       model: Roles, // Assuming Roles is the model for roles
//       as: 'Roles', // 
//       //attributes: ['role_id', 'name'] 
//     }]


//   });
//   if (!permissionWithRoles) {
    
//     console.log("Permission of id 'f7db6156-8937-41d0-8f62-1c516ea6252b' not found.");
//     return res.status(404).json({ "message": "Permission 'view_project_2' not found." });
//   }
//   console.log("Permission with associated roles:", permissionWithRoles.toJSON());