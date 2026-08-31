require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Doctor = require('./models/Doctor');
const connectDB = require('./database');

const seedDoctors = async () => {
  try {
    await connectDB();

    const doctorsData = [
      {
        fullName: 'Dr. Rahul Sharma',
        age: 45,
        gender: 'male',
        email: 'rahul.sharma@medicare.com',
        phoneNumber: '+919876543210',
        address: 'Mumbai, India',
        specialization: 'Cardiology',
        yearsOfExperience: 15,
        medicalDegree: 'MBBS, MD',
        medicalCollege: 'AIIMS Delhi',
        registrationLicenceNumber: 'MED-LIC-1001',
        department: 'Cardiology',
        previousHospital: 'City Hospital',
        doctorId: 'DOC001',
        password: 'password123'
      },
      {
        fullName: 'Dr. Priya Patel',
        age: 38,
        gender: 'female',
        email: 'priya.patel@medicare.com',
        phoneNumber: '+919876543211',
        address: 'Pune, India',
        specialization: 'Neurology',
        yearsOfExperience: 10,
        medicalDegree: 'MBBS, MD (Neurology)',
        medicalCollege: 'KEM Hospital Mumbai',
        registrationLicenceNumber: 'MED-LIC-1002',
        department: 'Neurology',
        previousHospital: 'Ruby Hall Clinic',
        doctorId: 'DOC002',
        password: 'password123'
      },
      {
        fullName: 'Dr. Amit Singh',
        age: 50,
        gender: 'male',
        email: 'amit.singh@medicare.com',
        phoneNumber: '+919876543212',
        address: 'Delhi, India',
        specialization: 'Orthopedics',
        yearsOfExperience: 20,
        medicalDegree: 'MBBS, MS (Ortho)',
        medicalCollege: 'CMC Vellore',
        registrationLicenceNumber: 'MED-LIC-1003',
        department: 'Orthopedics',
        previousHospital: 'Fortis Escorts',
        doctorId: 'DOC003',
        password: 'password123'
      },
      {
        fullName: 'Dr. Neha Gupta',
        age: 40,
        gender: 'female',
        email: 'neha.gupta@medicare.com',
        phoneNumber: '+919876543213',
        address: 'Bangalore, India',
        specialization: 'Pediatrics',
        yearsOfExperience: 12,
        medicalDegree: 'MBBS, MD (Pediatrics)',
        medicalCollege: 'St. John\'s Medical College',
        registrationLicenceNumber: 'MED-LIC-1004',
        department: 'Pediatrics',
        previousHospital: 'Manipal Hospital',
        doctorId: 'DOC004',
        password: 'password123'
      },
      {
        fullName: 'Dr. Vikram Desai',
        age: 42,
        gender: 'male',
        email: 'vikram.desai@medicare.com',
        phoneNumber: '+919876543214',
        address: 'Ahmedabad, India',
        specialization: 'Dermatology',
        yearsOfExperience: 14,
        medicalDegree: 'MBBS, DDVL',
        medicalCollege: 'BJ Medical College',
        registrationLicenceNumber: 'MED-LIC-1005',
        department: 'Dermatology',
        previousHospital: 'Apollo Hospital',
        doctorId: 'DOC005',
        password: 'password123'
      },
      {
        fullName: 'Dr. Anjali Verma',
        age: 35,
        gender: 'female',
        email: 'anjali.verma@medicare.com',
        phoneNumber: '+919876543215',
        address: 'Lucknow, India',
        specialization: 'Gynecology',
        yearsOfExperience: 8,
        medicalDegree: 'MBBS, MS (OBG)',
        medicalCollege: 'KGMU',
        registrationLicenceNumber: 'MED-LIC-1006',
        department: 'Gynecology',
        previousHospital: 'Sahara Hospital',
        doctorId: 'DOC006',
        password: 'password123'
      },
      {
        fullName: 'Dr. Rajesh Kumar',
        age: 55,
        gender: 'male',
        email: 'rajesh.kumar@medicare.com',
        phoneNumber: '+919876543216',
        address: 'Chennai, India',
        specialization: 'General Medicine',
        yearsOfExperience: 25,
        medicalDegree: 'MBBS, MD (Internal Medicine)',
        medicalCollege: 'Madras Medical College',
        registrationLicenceNumber: 'MED-LIC-1007',
        department: 'General Medicine',
        previousHospital: 'Global Hospital',
        doctorId: 'DOC007',
        password: 'password123'
      },
      {
        fullName: 'Dr. Suresh Reddy',
        age: 48,
        gender: 'male',
        email: 'suresh.reddy@medicare.com',
        phoneNumber: '+919876543217',
        address: 'Hyderabad, India',
        specialization: 'ENT',
        yearsOfExperience: 18,
        medicalDegree: 'MBBS, MS (ENT)',
        medicalCollege: 'Osmania Medical College',
        registrationLicenceNumber: 'MED-LIC-1008',
        department: 'ENT',
        previousHospital: 'Yashoda Hospital',
        doctorId: 'DOC008',
        password: 'password123'
      },
      {
        fullName: 'Dr. Meena Iyer',
        age: 39,
        gender: 'female',
        email: 'meena.iyer@medicare.com',
        phoneNumber: '+919876543218',
        address: 'Kochi, India',
        specialization: 'Ophthalmology',
        yearsOfExperience: 11,
        medicalDegree: 'MBBS, MS (Ophthalmology)',
        medicalCollege: 'Amrita Institute',
        registrationLicenceNumber: 'MED-LIC-1009',
        department: 'Ophthalmology',
        previousHospital: 'Aravind Eye Care',
        doctorId: 'DOC009',
        password: 'password123'
      },
      {
        fullName: 'Dr. Karan Kapoor',
        age: 36,
        gender: 'male',
        email: 'karan.kapoor@medicare.com',
        phoneNumber: '+919876543219',
        address: 'Chandigarh, India',
        specialization: 'Psychiatry',
        yearsOfExperience: 9,
        medicalDegree: 'MBBS, MD (Psychiatry)',
        medicalCollege: 'PGIMER',
        registrationLicenceNumber: 'MED-LIC-1010',
        department: 'Psychiatry',
        previousHospital: 'Max Hospital',
        doctorId: 'DOC010',
        password: 'password123'
      }
    ];

    const salt = await bcrypt.genSalt(10);
    
    for (const doc of doctorsData) {
      const existingDoctor = await Doctor.findOne({ doctorId: doc.doctorId });
      if (!existingDoctor) {
        doc.password = await bcrypt.hash(doc.password, salt);
        await Doctor.create(doc);
        console.log(`Created doctor ${doc.doctorId}`);
      } else {
        console.log(`Doctor ${doc.doctorId} already exists. Skipping.`);
      }
    }

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDoctors();
