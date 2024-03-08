module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  Activity.sync({ alter: false })
    .then(() => {
      //console.log('Activity table created or already exists');
    })
    .catch((error) => {
      console.error('Error creating Activity table:', error); // Log any errors that occur during sync
    });

  return Activity;
};
