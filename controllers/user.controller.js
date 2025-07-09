const userService = require('../services/user.service');

exports.createUser = async (req, res) => {
  try {
    const { name,role } = req.body;
    const user = await userService.createUser(name,role);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
