const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');

// Book a slot
router.post('/', reservationController.bookSlot);

// Get all reservations for a user
router.get('/user/:userId', reservationController.getUserReservations);

// (Optional) Cancel reservation
router.delete('/:id', reservationController.cancelReservation);

module.exports = router;
