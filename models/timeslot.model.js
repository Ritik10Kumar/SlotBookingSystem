const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const TimeSlot = sequelize.define('TimeSlot', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // references the 'users' table
      key: 'id'
    },
    onDelete: 'CASCADE'
  },

  start_time: { type: DataTypes.DATE, allowNull: false },
  end_time: { type: DataTypes.DATE, allowNull: false },

  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
}, {
  tableName: 'timeslots',
  timestamps: false
});

module.exports = TimeSlot;
