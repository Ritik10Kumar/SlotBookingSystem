const reservationService = require('../services/reservation.service');

exports.bookSlot = async (req, res) => {
  try {
    const { user_id, timeslot_id } = req.body;
    const reservation = await reservationService.bookSlot({ user_id, timeslot_id });
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserReservations = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await reservationService.getUserReservations(userId);
    res.status(200).json(reservations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;
    await reservationService.cancelReservation(id);
    res.status(200).json({ message: 'Reservation cancelled' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updated = await reservationService.updateStatus(id, status);
    res.status(200).json({ message: 'Reservation status updated', data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
