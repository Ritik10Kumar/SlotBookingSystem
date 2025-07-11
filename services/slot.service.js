const { TimeSlot, User } = require('../models'); // <-- Add User
const { Op } = require('sequelize');

exports.createTimeSlot = async (doctorId, bodydata) => {
  // ✅ 1. Validate doctorId exists and is a doctor
  const doctor = await User.findByPk(doctorId);
  if (!doctor || doctor.role !== 'doctor') {
    throw new Error('Invalid doctor ID');
  }

  // ✅ 2. Time range check
  for (const slot of bodydata) {
    if (new Date(slot.start_time) >= new Date(slot.end_time)) {
      throw new Error('Start time must be before end time.');
    }
  }
  // ✅ 3. Prevent overlapping time slots

  for (const slot of bodydata) {
    const overlapping = await TimeSlot.findOne({
      where: {
        doctor_id: doctorId,
        [Op.or]: [
          {
            start_time: { [Op.lt]: new Date(slot.end_time) },
            end_time: { [Op.gt]: new Date(slot.start_time) }
          }
        ]
      }
    });
    if (overlapping) {
      throw new Error('Overlapping time slot exists for this doctor.');
    }
  }



  // ✅ 4. Create time slot
  const createdSlots = [];
  for (const slot of bodydata) {
    const newSlot = await TimeSlot.create({
      doctor_id: doctorId,
      start_time: slot.start_time,
      end_time: slot.end_time,
      capacity: slot.capacity
    });
    createdSlots.push(newSlot);
  }

  return createdSlots;

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


exports.updateTimeSlot = async ({ doctorId, slotId, start_time, end_time, capacity }) => {
  const slot = await TimeSlot.findOne({ where: { id: slotId, doctor_id: doctorId } });
  if (!slot) throw new Error('Slot not found or does not belong to the doctor');

  if (start_time && end_time && new Date(start_time) >= new Date(end_time)) {
    throw new Error('Start time must be before end time');
  }

  // Optional: prevent overlapping time with other slots
  const overlapping = await TimeSlot.findOne({
    where: {
      doctor_id: doctorId,
      id: { [Op.ne]: slotId }, // exclude self
      start_time: { [Op.lt]: new Date(end_time || slot.end_time) },
      end_time: { [Op.gt]: new Date(start_time || slot.start_time) }
    }
  });
  if (overlapping) {
    throw new Error('Overlapping time slot exists');
  }

  slot.start_time = start_time || slot.start_time;
  slot.end_time = end_time || slot.end_time;
  slot.capacity = capacity || slot.capacity;

  await slot.save();
  return slot;
};

exports.deleteTimeSlot = async ({ doctorId, slotId }) => {
  const deleted = await TimeSlot.destroy({
    where: { id: slotId, doctor_id: doctorId }
  });
  if (!deleted) throw new Error('Slot not found or not owned by this doctor');
};
