const Joi = require('joi');

exports.signupSchema = Joi.object({
  name: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('doctor', 'patient').required()
});

exports.loginSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required()
});
