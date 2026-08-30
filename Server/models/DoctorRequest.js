const mongoose = require('mongoose');

const doctorRequestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  specialization: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  medicalDegree: { type: String, required: true },
  medicalCollege: { type: String, required: true },
  registrationLicenceNumber: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  previousHospital: { type: String },
  preferredDoctorId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('DoctorRequest', doctorRequestSchema);
