const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new patient
// @route   POST /api/patients/register
// @access  Public
const registerPatient = async (req, res) => {
  try {
    const { fullName, email, phone, dateOfBirth, gender, address, password, confirmPassword } = req.body;

    // Validate request
    if (!fullName || !email || !phone || !dateOfBirth || !gender || !address || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Check if patient exists
    const patientExists = await Patient.findOne({ email });

    if (patientExists) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create patient
    const patient = await Patient.create({
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      password: hashedPassword,
    });

    if (patient) {
      res.status(201).json({
        _id: patient.id,
        fullName: patient.fullName,
        email: patient.email,
        token: generateToken(patient._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid patient data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Authenticate a patient
// @route   POST /api/patients/login
// @access  Public
const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for patient email
    const patient = await Patient.findOne({ email });

    if (patient && (await bcrypt.compare(password, patient.password))) {
      res.json({
        _id: patient.id,
        fullName: patient.fullName,
        email: patient.email,
        role: 'patient',
        token: generateToken(patient._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get patient profile
// @route   GET /api/patients/profile
// @access  Private
const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.patient.id).select('-password');
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all patients
// @route   GET /api/patients
// @access  Public (should be protected for admin in production)
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({}).select('-password').sort({ createdAt: -1 });
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single patient by ID
// @route   GET /api/patients/:id
// @access  Public (should be protected for admin in production)
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).select('-password');
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerPatient,
  loginPatient,
  getPatientProfile,
  getAllPatients,
  getPatientById,
};
