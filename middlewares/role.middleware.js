const { User } = require('../models');

exports.requireDoctorRole = async (req, res, next) => {
  const { doctorId } = req.params;

  if (!doctorId) {
    return res.status(400).json({ error: 'Doctor ID is required' });
  }

  const user = await User.findByPk(doctorId);

  if (!user || user.role !== 'doctor') {
    return res.status(403).json({ error: 'Only doctors are allowed to perform this action' });
  }

  next();
};


exports.requirePatientRole = (req, res, next) => {
  if (req.user.role !== 'patient') {
    return res.status(403).json({ error: 'Only patients can perform this action' });
  }
  next();
};