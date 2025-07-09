// const sequelize = require('../config/db.config');
// const Doctor = require('./doctor.model');
// const User = require('./user.model');
// const TimeSlot = require('./timeslot.model');
// const Reservation = require('./reservation.model');

// // Define relations
// Doctor.hasMany(TimeSlot, { foreignKey: 'doctor_id' });
// TimeSlot.belongsTo(Doctor, { foreignKey: 'doctor_id' });

// User.hasMany(Reservation, { foreignKey: 'user_id' });
// Reservation.belongsTo(User, { foreignKey: 'user_id' });

// TimeSlot.hasMany(Reservation, { foreignKey: 'timeslot_id' });
// Reservation.belongsTo(TimeSlot, { foreignKey: 'timeslot_id' });

// module.exports = { sequelize, Doctor, User, TimeSlot, Reservation };


const sequelize = require('../config/db.config');

// Load models
const User = require('./user.model');
const TimeSlot = require('./timeslot.model');
const Reservation = require('./reservation.model');

// Associations

// A doctor (user with role='doctor') has many time slots
User.hasMany(TimeSlot, { foreignKey: 'doctor_id', as: 'DoctorSlots' });
TimeSlot.belongsTo(User, { foreignKey: 'doctor_id', as: 'Doctor' });

// A patient (user with role='patient') has many reservations
User.hasMany(Reservation, { foreignKey: 'user_id', as: 'PatientReservations' });
Reservation.belongsTo(User, { foreignKey: 'user_id', as: 'Patient' });

// A time slot has many reservations
TimeSlot.hasMany(Reservation, { foreignKey: 'timeslot_id' });
Reservation.belongsTo(TimeSlot, { foreignKey: 'timeslot_id' });

module.exports = {
  sequelize,
  User,
  TimeSlot,
  Reservation
};
