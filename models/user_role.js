User_role.init({
  user_id: {
    type: DataTypes.UUID,
     // Ensures the user_id cannot be null
    references: {
      model: 'User', // The name of the referenced model
      key: 'user_id' // The name of the referenced column in the User table
    }
  },
  role_id: {
    type: DataTypes.UUID,
    
    references: {
      model: 'Roles', // The name of the referenced model
      key: 'role_id' // The name of the referenced column in the Roles table
    }
  }
}, {
  sequelize,
  modelName: 'User_role',
});
