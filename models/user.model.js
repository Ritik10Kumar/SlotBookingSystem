// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db.config');

// const User = sequelize.define('User', {
//   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//   name: { type: DataTypes.STRING, allowNull: false },
// }, {
//   tableName: 'users',
//   timestamps: false
// });

// module.exports = User;


//updating user and doctor model in one

// models/user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.ENUM('doctor', 'patient'),
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User;
