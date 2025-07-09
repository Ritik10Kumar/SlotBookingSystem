const { TimeSlot, User } = require('../models'); // <-- Add User
const { Op } = require('sequelize');

exports.createTimeSlot = async ({ doctorId, start_time, end_time, capacity }) => {
  // ✅ 1. Validate doctorId exists and is a doctor
  const doctor = await User.findByPk(doctorId);
  if (!doctor || doctor.role !== 'doctor') {
    throw new Error('Invalid doctor ID');
  }

  // ✅ 2. Time range check
  if (new Date(start_time) >= new Date(end_time)) {
    throw new Error('Start time must be before end time.');
  }

  // ✅ 3. Prevent overlapping time slots
  const overlapping = await TimeSlot.findOne({
    where: {
      doctor_id: doctorId,
      [Op.or]: [
        {
          start_time: { [Op.lt]: new Date(end_time) },
          end_time: { [Op.gt]: new Date(start_time) }
        }
      ]
    }
  });

  if (overlapping) {
    throw new Error('Overlapping time slot exists for this doctor.');
  }

  // ✅ 4. Create time slot
  return await TimeSlot.create({
    doctor_id: doctorId,
    start_time,
    end_time,
    capacity
  });
};

exports.listTimeSlots = async ({ doctorId, start_date, end_date }) => {
  const where = { doctor_id: doctorId };

  if (start_date && end_date) {
    where.start_time = {
      [Op.between]: [new Date(start_date), new Date(end_date)]
    };
  }

  return await TimeSlot.findAll({ where, order: [['start_time', 'ASC']] });
};
