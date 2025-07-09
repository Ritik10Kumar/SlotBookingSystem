const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Create a new user
router.post('/', userController.createUser);

// List all users (optional, useful for testing)
router.get('/', userController.getAllUsers);

module.exports = router;
