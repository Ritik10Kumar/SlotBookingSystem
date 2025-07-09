const { User } = require('../models');

exports.createUser = async (name, role) => {
//   if (!name) throw new Error('Name is required');
//   return await User.create({ name });
if (!name || !role) throw new Error('Name and role are required');
  if (!['doctor', 'patient'].includes(role)) throw new Error('Invalid role');
  return await User.create({ name, role });

};

exports.getAllUsers = async (role) => {
//   return await User.findAll({ order: [['id', 'ASC']] });
 const where = role ? { role } : {};
  return await User.findAll({ where, order: [['id', 'ASC']] });
};
