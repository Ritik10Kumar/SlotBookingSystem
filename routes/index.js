const express = require('express');
const router = express.Router();

router.use('/slots', require('./slot.routes'));
router.use('/reservations', require('./reservation.routes'));
router.use('/users', require('./user.routes'));

module.exports = router;
