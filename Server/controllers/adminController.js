const Admin = require('../models/Admin');
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

// @desc    Register a new admin/staff
// @route   POST /api/admin/register
// @access  Public
const registerAdmin = async (req, res) => {
  try {
    const { fullName, employeeId, department, jobRole, email, phone, password, confirmPassword } = req.body;

    // Validate request
    if (!fullName || !employeeId || !department || !jobRole || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Check if employeeId exists
    const employeeExists = await Admin.findOne({ employeeId });
    if (employeeExists) {
      return res.status(400).json({ message: 'An account with this Employee ID already exists.' });
    }

    // Check if email exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const admin = await Admin.create({
      fullName,
      employeeId,
      department,
      jobRole,
      email,
      phone,
      password: hashedPassword,
    });

    if (admin) {
      res.status(201).json({
        _id: admin.id,
        fullName: admin.fullName,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Authenticate an admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for admin email
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.json({
        _id: admin.id,
        fullName: admin.fullName,
        email: admin.email,
        role: 'admin',
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get pending doctor requests
// @route   GET /api/admin/requests/doctors
// @access  Public (should be private in a real app, keeping public based on existing structure)
const getDoctorRequests = async (req, res) => {
  try {
    const requests = await DoctorRequest.find({ status: 'pending' });
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Accept a doctor request
// @route   POST /api/admin/requests/doctors/:id/accept
// @access  Public
const acceptDoctorRequest = async (req, res) => {
  try {
    const request = await DoctorRequest.findById(req.params.id);
    if (!request || request.status !== 'pending') {
      return res.status(404).json({ message: 'Pending request not found.' });
    }

    // Double check if already used
    const existingDoctor = await Doctor.findOne({
      $or: [
        { doctorId: request.preferredDoctorId },
        { email: request.email },
        { registrationLicenceNumber: request.registrationLicenceNumber }
      ]
    });

    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor ID, Email, or Licence Number is already in use by an approved doctor.' });
    }

    // Create doctor
    const doctor = await Doctor.create({
      fullName: request.fullName,
      age: request.age,
      gender: request.gender,
      email: request.email,
      phoneNumber: request.phoneNumber,
      address: request.address,
      specialization: request.specialization,
      yearsOfExperience: request.yearsOfExperience,
      medicalDegree: request.medicalDegree,
      medicalCollege: request.medicalCollege,
      registrationLicenceNumber: request.registrationLicenceNumber,
      department: request.department,
      previousHospital: request.previousHospital,
      doctorId: request.preferredDoctorId,
      password: request.password // Copy already hashed password
    });

    if (doctor) {
      // Delete request
      await DoctorRequest.findByIdAndDelete(req.params.id);
      res.json({ message: 'Doctor registration approved successfully.' });
    } else {
      res.status(400).json({ message: 'Failed to create doctor.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Reject a doctor request
// @route   POST /api/admin/requests/doctors/:id/reject
// @access  Public
const rejectDoctorRequest = async (req, res) => {
  try {
    const request = await DoctorRequest.findById(req.params.id);
    if (!request || request.status !== 'pending') {
      return res.status(404).json({ message: 'Pending request not found.' });
    }

    await DoctorRequest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doctor request rejected successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  getDoctorRequests,
  acceptDoctorRequest,
  rejectDoctorRequest
};
