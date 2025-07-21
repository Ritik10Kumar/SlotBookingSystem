const Joi = require('joi');

exports.bookReservationSchema = Joi.object({
  timeslot_id: Joi.number().integer().required()
});

exports.updateReservationStatusSchema = Joi.object({
  status: Joi.string().valid('confirmed', 'cancelled', 'completed').required()
});
