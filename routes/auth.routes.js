const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const authController = require('../controllers/auth.controller');
const { signupSchema, loginSchema } = require('../validators/auth.validator');

router.post('/signup', validate(signupSchema), authController.signup);
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;
