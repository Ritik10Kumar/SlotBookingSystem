const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slot.controller');
const { requireDoctorRole } = require('../middlewares/role.middleware');
// Create time slot (doctorId from param)
router.post('/:doctorId', requireDoctorRole,slotController.createTimeSlot);

// List all time slots for a doctor (optionally by date range)
router.get('/:doctorId', slotController.listTimeSlots);

//Update Slot
router.patch('/:doctorId/:slotId', requireDoctorRole, slotController.updateTimeSlot);

//Delete Slot
router.delete('/:doctorId/:slotId', requireDoctorRole, slotController.deleteTimeSlot);


module.exports = router;
