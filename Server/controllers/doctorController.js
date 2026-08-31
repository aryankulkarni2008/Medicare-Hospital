const DoctorRequest = require('../models/DoctorRequest');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a doctor request
// @route   POST /api/doctors/register
// @access  Public
const registerDoctorRequest = async (req, res) => {
  try {
    const {
      fullName, age, gender, email, phoneNumber, address, specialization,
      yearsOfExperience, medicalDegree, medicalCollege, registrationLicenceNumber,
      department, previousHospital, preferredDoctorId, password, confirmPassword
    } = req.body;

    // Validate passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Check if preferredDoctorId, email, or licence number already exist in Doctor or DoctorRequest
    const existingDoctor = await Doctor.findOne({
      $or: [{ doctorId: preferredDoctorId }, { email }, { registrationLicenceNumber }]
    });

    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor ID, Email, or Licence Number is already in use by an approved doctor.' });
    }

    const existingRequest = await DoctorRequest.findOne({
      $or: [{ preferredDoctorId }, { email }, { registrationLicenceNumber }]
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'A pending request with this Doctor ID, Email, or Licence Number already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create doctor request
    const doctorRequest = await DoctorRequest.create({
      fullName,
      age,
      gender,
      email,
      phoneNumber,
      address,
      specialization,
      yearsOfExperience,
      medicalDegree,
      medicalCollege,
      registrationLicenceNumber,
      department,
      previousHospital,
      preferredDoctorId,
      password: hashedPassword, // Store hashed password
      status: 'pending'
    });

    if (doctorRequest) {
      res.status(201).json({ message: 'Doctor registration request sent successfully. Please wait for Admin approval.' });
    } else {
      res.status(400).json({ message: 'Invalid doctor data.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Authenticate a doctor
// @route   POST /api/doctors/login
// @access  Public
const loginDoctor = async (req, res) => {
  try {
    const { doctorId, password } = req.body;

    // Validate request
    if (!doctorId || !password) {
      return res.status(400).json({ message: 'Please provide Doctor ID and password.' });
    }

    // Check for doctor in the approved doctors collection
    const doctor = await Doctor.findOne({ doctorId });

    if (doctor && (await bcrypt.compare(password, doctor.password))) {
      res.json({
        _id: doctor.id,
        fullName: doctor.fullName,
        email: doctor.email,
        doctorId: doctor.doctorId,
        role: 'doctor',
        token: generateToken(doctor._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid Doctor ID or password. Doctor account not found or not approved.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Get all approved doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select('-password');
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Get a specific approved doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
  try {
    // Try to find by MongoDB ID first, then by custom doctorId
    let doctor = null;
    
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      doctor = await Doctor.findById(req.params.id).select('-password');
    }
    
    if (!doctor) {
      doctor = await Doctor.findOne({ doctorId: req.params.id }).select('-password');
    }

    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  registerDoctorRequest,
  loginDoctor,
  getDoctors,
  getDoctorById
};
