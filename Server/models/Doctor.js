const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
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
  doctorId: { type: String, required: true, unique: true }, // Using doctorId instead of preferredDoctorId for clarity in approved doctors
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
