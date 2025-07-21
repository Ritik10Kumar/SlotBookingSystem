const Joi = require('joi');

exports.createSlotSchema = Joi.object({
  timeslots: Joi.array().items(
    Joi.object({
      start_time: Joi.date().iso().required(),
      end_time: Joi.date().iso().required(),
      capacity: Joi.number().integer().min(1).required()
    })
  ).min(1).required()
});
