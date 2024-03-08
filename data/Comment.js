module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      comment_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      task_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
  
    });
  
    Comment.sync({ alter: false })
      .then(() => {
        // console.log('Roles table created or already exists');
        //return Roles.create({ name: 'user' });
      })
      .catch((error) => {
        console.error('Error creating Comment table:', error);
      });
  
    return Comment;
  };