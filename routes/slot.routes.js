const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slot.controller');
const { requireDoctorRole } = require('../middlewares/role.middleware');
const verifyToken = require('../middlewares/verifyToken');
const validate = require('../middlewares/validate');
const { createSlotSchema } = require('../validators/slot.validator');
router.use(verifyToken); // Protect all slot routes

// Create time slot (doctorId from param)
// router.post('/:doctorId', requireDoctorRole,slotController.createTimeSlot);
router.post('/:doctorId', verifyToken, requireDoctorRole, validate(createSlotSchema), slotController.createTimeSlot);
// List all time slots for a doctor (optionally by date range)
router.get('/:doctorId', slotController.listTimeSlots);

//Update Slot
router.patch('/:doctorId/:slotId', requireDoctorRole, slotController.updateTimeSlot);

//Delete Slot
router.delete('/:doctorId/:slotId', requireDoctorRole, slotController.deleteTimeSlot);


module.exports = router;
