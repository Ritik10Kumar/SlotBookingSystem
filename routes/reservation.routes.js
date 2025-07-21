const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const verifyToken = require('../middlewares/verifyToken');
const validate = require('../middlewares/validate');
const { requirePatientRole } = require('../middlewares/role.middleware');
const { bookReservationSchema, updateReservationStatusSchema } = require('../validators/reservation.validator');
// Book a slot
// router.post('/', reservationController.bookSlot);
router.post('/', verifyToken, requirePatientRole, validate(bookReservationSchema), reservationController.bookSlot);
// Get all reservations for a user
router.get('/user/:userId', reservationController.getUserReservations);

// (Optional) Cancel reservation
router.delete('/:id', reservationController.cancelReservation);

// router.patch('/:id/status', verifyToken, reservationController.updateStatus);
router.patch('/:id/status', verifyToken, validate(updateReservationStatusSchema), reservationController.updateStatus);

module.exports = router;
