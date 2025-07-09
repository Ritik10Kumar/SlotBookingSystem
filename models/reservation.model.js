const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Reservation = sequelize.define('Reservation', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  timeslot_id: { type: DataTypes.INTEGER, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'reservations',
  timestamps: false
});

module.exports = Reservation;
