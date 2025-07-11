const { TimeSlot, User } = require('../models'); // <-- Add User
const { Op } = require('sequelize');

exports.createTimeSlot = async (doctorId, bodydata) => {
  // exports.createTimeSlot = async ({ doctorId, start_time, end_time, capacity }) => {

  // ✅ 1. Validate doctorId exists and is a doctor
  console.log("doctorId-- ",doctorId)
  const doctor = await User.findByPk(doctorId);
  if (!doctor || doctor.role !== 'doctor') {
    throw new Error('Invalid doctor ID');
  }
  console.log("doctor = ",doctor)

  // ✅ 2. Time range check
  for (let i = 0; i < bodydata.length; i++) {
    if (new Date(bodydata[i].start_time) >= new Date(bodydata[i].end_time)) {
      throw new Error('Start time must be before end time.');
    }
  }
  // if (new Date(start_time) >= new Date(end_time)) {
  //   throw new Error('Start time must be before end time.');
  // }

  // ✅ 3. Prevent overlapping time slots

  for (let i = 0; i < bodydata.length; i++) {
    const overlapping = await TimeSlot.findOne({
      where: {
        doctor_id: doctorId,
        [Op.or]: [
          {
            start_time: { [Op.lt]: new Date(bodydata[i].end_time) },
            end_time: { [Op.gt]: new Date(bodydata[i].start_time) }
          }
        ]
      }
    });
    if (overlapping) {
      throw new Error('Overlapping time slot exists for this doctor.');
    }
  }



  // ✅ 4. Create time slot

  // need tp provide slot data in array 
  // return await TimeSlot.create({
  //   doctor_id: doctorId,
  //   start_time,
  //   end_time,
  //   capacity
  // });
  for (let i = 0; i < bodydata.length; i++) {
    let start_time = bodydata[i].start_time
    let end_time = bodydata[i].end_time
    let capacity = bodydata[i].capacity
    await TimeSlot.create({
      doctor_id: doctorId,
      start_time,
      end_time,
      capacity
    });
  }

  return ""

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
