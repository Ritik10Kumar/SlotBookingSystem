const slotService = require('../services/slot.service');

exports.createTimeSlot = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { start_time, end_time, capacity } = req.body;
    const bodydata = req.body.timeslots;

    const timeslot = await slotService.createTimeSlot(doctorId, bodydata);
    // const timeslot = await slotService.createTimeSlot({ doctorId, start_time, end_time, capacity });
    res.status(201).json(timeslot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listTimeSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { start_date, end_date } = req.query;

    const slots = await slotService.listTimeSlots({ doctorId, start_date, end_date });
    res.status(200).json(slots);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTimeSlot = async (req, res) => {
  try {
    const { doctorId, slotId } = req.params;
    const { start_time, end_time, capacity } = req.body;

    const updated = await slotService.updateTimeSlot({
      doctorId,
      slotId,
      start_time,
      end_time,
      capacity
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTimeSlot = async (req, res) => {
  try {
    const { doctorId, slotId } = req.params;

    await slotService.deleteTimeSlot({ doctorId, slotId });
    res.status(200).json({ message: 'Slot deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
