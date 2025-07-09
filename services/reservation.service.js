const { Reservation, TimeSlot, User, sequelize } = require('../models');
const { Op } = require('sequelize');

exports.bookSlot = async ({ user_id, timeslot_id }) => {
  return await sequelize.transaction(async (t) => {
    // ✅ 1. Validate user is a patient
    const patient = await User.findByPk(user_id, { transaction: t });
    if (!patient || patient.role !== 'patient') {
      throw new Error('Invalid patient ID');
    }

    // ✅ 2. Validate timeslot exists
    const timeslot = await TimeSlot.findByPk(timeslot_id, { transaction: t });
    if (!timeslot) throw new Error('Time slot not found');

    // ✅ 3. Check slot capacity
    const existing = await Reservation.count({
      where: { timeslot_id },
      transaction: t
    });

    if (existing >= timeslot.capacity) throw new Error('Slot fully booked');

    // ✅ 4. Prevent same user booking same slot
    const alreadyBooked = await Reservation.findOne({
      where: { user_id, timeslot_id },
      transaction: t
    });
    if (alreadyBooked) throw new Error('User already booked this time slot');

    // ✅ 5. Prevent same-day booking with same doctor
    const doctorSlot = await TimeSlot.findOne({ where: { id: timeslot_id }, transaction: t });
    const dayStart = new Date(new Date(doctorSlot.start_time).setHours(0, 0, 0, 0));
    const dayEnd   = new Date(new Date(doctorSlot.start_time).setHours(23, 59, 59, 999));
    const sameDayBooking = await Reservation.findOne({
      where: {
        user_id,
        '$TimeSlot.doctor_id$': doctorSlot.doctor_id,
        '$TimeSlot.start_time$': {
         [Op.gte]: dayStart,
         [Op.lt]: dayEnd
        }
      },
      include: [{ model: TimeSlot }],
      transaction: t
    });

    if (sameDayBooking) throw new Error('User already booked another slot for this doctor on the same day');

    // ✅ 6. Create the reservation
    return await Reservation.create({ user_id, timeslot_id }, { transaction: t });
  });
};

exports.getUserReservations = async (user_id) => {
  return await Reservation.findAll({
    where: { user_id },
    include: ['TimeSlot'],
    order: [['created_at', 'DESC']]
  });
};

exports.cancelReservation = async (id) => {
  const deleted = await Reservation.destroy({ where: { id } });
  if (!deleted) throw new Error('Reservation not found');
};
