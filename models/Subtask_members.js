'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subtask_members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Subtask_members.init({
    subtask_member_id: {
      type: DataTypes.UUID,
      //defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey: true,
    },
    sub_task_id: {
      type: DataTypes.UUID,
      allowNull:true,
      references: {
        model: 'Sub_tasks',
        key: 'sub_task_id'
      }},
      project_member_id: {
        type: DataTypes.UUID,
        
        allowNull: false,
        references: {
          model: 'Project_members', // The name of the referenced model
          key: 'project_member_id'
        }
      },
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    is_deleted:DataTypes.BOOLEAN,
    deletionAt:DataTypes.DATE,
    deletedBy:DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Subtask_members',
  });
  return Subtask_members;
};