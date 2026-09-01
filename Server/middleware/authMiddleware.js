const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get patient from token, exclude password
      req.patient = await Patient.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const adminProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get admin from token, exclude password
      req.admin = await Admin.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const Doctor = require('../models/Doctor');

const doctorProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.doctor = await Doctor.findById(decoded.id).select('-password');

      if (req.doctor) {
        return next();
      }
    } catch (error) {
      console.warn('Doctor JWT verification failed, checking fallback doctor identifier:', error.message);
    }
  }

  // Fallback: Check doctorId from body or headers
  const doctorId = req.body?.doctorId || req.headers['x-doctor-id'];
  if (doctorId) {
    const doctor = await Doctor.findOne({
      $or: [
        { doctorId: doctorId },
        { _id: doctorId.match(/^[0-9a-fA-F]{24}$/) ? doctorId : null }
      ]
    }).select('-password');

    if (doctor) {
      req.doctor = doctor;
      return next();
    }
  }

  return res.status(401).json({
    success: false,
    message: 'Not authorized as a doctor. Please log in again.'
  });
};

module.exports = { protect, adminProtect, doctorProtect };

