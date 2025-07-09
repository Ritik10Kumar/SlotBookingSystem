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
