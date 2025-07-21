const express = require('express');
const router = express.Router();

// const authRoutes = require('./auth.routes');
// router.use('/auth', authRoutes);

router.use('/slots', require('./slot.routes'));
router.use('/reservations', require('./reservation.routes'));
router.use('/users', require('./user.routes'));
router.use('/auth', require('./auth.routes'));

module.exports = router;
