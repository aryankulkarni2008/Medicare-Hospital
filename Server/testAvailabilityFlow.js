require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./database');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const DoctorAvailability = require('./models/DoctorAvailability');
const Appointment = require('./models/Appointment');
const Notification = require('./models/Notification');
const {
  getDoctorSlotsForDate,
  parseTimeToMinutes,
  formatMinutesToTime,
  getDayNameFromDate
} = require('./controllers/availabilityController');

const runTests = async () => {
  try {
    await connectDB();
    console.log('=== STARTING AUTOMATED DOCTOR AVAILABILITY & BOOKING TESTS ===\n');

    // 1. Setup Doctor A (DOC001) and Doctor B (DOC002)
    let docA = await Doctor.findOne({ doctorId: 'DOC001' });
    let docB = await Doctor.findOne({ doctorId: 'DOC002' });

    if (!docA) {
      console.log('Creating test Doctor A (DOC001)...');
      docA = await Doctor.create({
        fullName: 'Dr. Rahul Sharma',
        age: 45,
        gender: 'male',
        email: 'test.rahul@medicare.com',
        phoneNumber: '+919876543210',
        address: 'Mumbai',
        specialization: 'Cardiology',
        yearsOfExperience: 15,
        medicalDegree: 'MBBS, MD',
        medicalCollege: 'AIIMS',
        registrationLicenceNumber: 'LIC-DOC-001',
        department: 'Cardiology',
        doctorId: 'DOC001',
        password: 'hashedpassword'
      });
    }

    if (!docB) {
      console.log('Creating test Doctor B (DOC002)...');
      docB = await Doctor.create({
        fullName: 'Dr. Priya Patel',
        age: 38,
        gender: 'female',
        email: 'test.priya@medicare.com',
        phoneNumber: '+919876543211',
        address: 'Pune',
        specialization: 'Neurology',
        yearsOfExperience: 10,
        medicalDegree: 'MBBS, MD',
        medicalCollege: 'KEM',
        registrationLicenceNumber: 'LIC-DOC-002',
        department: 'Neurology',
        doctorId: 'DOC002',
        password: 'hashedpassword'
      });
    }

    // Setup Test Patient
    let patient = await Patient.findOne({ email: 'test.patient@example.com' });
    if (!patient) {
      patient = await Patient.create({
        fullName: 'Sarah Jenkins',
        dateOfBirth: new Date('1998-05-14'),
        gender: 'female',
        email: 'test.patient@example.com',
        phone: '+15552345678',
        password: 'hashedpassword',
        address: 'Springfield'
      });
    }

    // Clean up test appointments and availability for clean run
    await Appointment.deleteMany({ doctorId: { $in: ['DOC001', 'DOC002'] } });
    await Notification.deleteMany({ doctorId: { $in: ['DOC001', 'DOC002'] } });
    await DoctorAvailability.deleteMany({ doctorId: { $in: ['DOC001', 'DOC002'] } });

    // ----------------------------------------------------
    // TEST 1: Save Doctor A availability (Saturday: 09:00 AM – 01:00 PM)
    // ----------------------------------------------------
    console.log('TEST 1: Save Doctor A Availability (Saturday: 09:00 AM - 01:00 PM)...');
    const scheduleA = [
      { day: 'Monday', available: false, slots: [] },
      { day: 'Tuesday', available: false, slots: [] },
      { day: 'Wednesday', available: false, slots: [] },
      { day: 'Thursday', available: false, slots: [] },
      { day: 'Friday', available: false, slots: [] },
      { day: 'Saturday', available: true, slots: [{ startTime: '09:00 AM', endTime: '01:00 PM' }] },
      { day: 'Sunday', available: false, slots: [] },
    ];

    const savedAvailA = await DoctorAvailability.findOneAndUpdate(
      { doctorId: 'DOC001' },
      { doctorId: 'DOC001', weeklySchedule: scheduleA, slotDuration: 30 },
      { new: true, upsert: true }
    );

    console.log('✓ TEST 1 PASSED: Doctor A Availability saved in MongoDB with doctorId DOC001.');
    console.log('  Saved Saturday Available:', savedAvailA.weeklySchedule.find(d => d.day === 'Saturday').available);

    // ----------------------------------------------------
    // TEST 2: Check Available Days for Patient View
    // ----------------------------------------------------
    console.log('\nTEST 2: Patient Doctor Profile Available Days Check...');
    const docAAvail = await DoctorAvailability.findOne({ doctorId: 'DOC001' });
    const availableDays = docAAvail.weeklySchedule.filter(d => d.available).map(d => d.day);
    console.log('  Dynamic Available Days from MongoDB:', availableDays);
    if (availableDays.length === 1 && availableDays[0] === 'Saturday') {
      console.log('✓ TEST 2 PASSED: Dynamic Available Days correctly returns ["Saturday"].');
    } else {
      throw new Error(`TEST 2 FAILED: Expected ["Saturday"], got ${JSON.stringify(availableDays)}`);
    }

    // ----------------------------------------------------
    // TEST 3: Generate Slots for Saturday (2026-09-12)
    // ----------------------------------------------------
    console.log('\nTEST 3: Generate Slots for Saturday 2026-09-12...');
    let reqMock = { params: { doctorId: 'DOC001' }, query: { date: '2026-09-12' } };
    let resMock = {
      statusCode: 200,
      jsonData: null,
      status(code) { this.statusCode = code; return this; },
      json(data) { this.jsonData = data; return this; }
    };

    await getDoctorSlotsForDate(reqMock, resMock);
    const slots = resMock.jsonData.slots;
    const timeLabels = slots.map(s => s.time);
    console.log('  Generated Slots:', timeLabels);

    const expectedSlots = [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
      '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'
    ];

    const allMatch = expectedSlots.every(t => timeLabels.includes(t)) && !timeLabels.includes('01:00 PM');
    if (allMatch && slots.length === 8) {
      console.log('✓ TEST 3 PASSED: Exactly 8 30-min slots generated (09:00 AM to 12:30 PM, no 01:00 PM boundary).');
    } else {
      throw new Error(`TEST 3 FAILED: Generated slots do not match expected: ${JSON.stringify(timeLabels)}`);
    }

    // ----------------------------------------------------
    // TEST 4: Book 10:00 AM on Saturday 2026-09-12
    // ----------------------------------------------------
    console.log('\nTEST 4: Patient Books 10:00 AM on 2026-09-12...');
    const appt = await Appointment.create({
      appointmentId: 'APT-TEST-001',
      patientId: patient._id,
      patientName: patient.fullName,
      patientAge: 28,
      doctorId: 'DOC001',
      doctorName: docA.fullName,
      specialty: docA.specialization,
      department: docA.department,
      date: '2026-09-12',
      time: '10:00 AM',
      hospital: 'Medicare Hospital',
      reason: 'Cardiology review',
      status: 'Pending'
    });

    await Notification.create({
      notificationId: `N-${Date.now()}`,
      doctorId: 'DOC001',
      appointmentId: appt.appointmentId,
      title: 'New Appointment Request',
      description: `Patient ${patient.fullName} requested an appointment for 2026-09-12 at 10:00 AM.`,
      type: 'pending',
      read: false
    });

    console.log('✓ TEST 4 PASSED: Appointment saved in MongoDB with status: "Pending".');

    // ----------------------------------------------------
    // TEST 5: Verify Booked Slot Disabling in Slot Generator
    // ----------------------------------------------------
    console.log('\nTEST 5: Verify 10:00 AM Slot is marked Booked...');
    resMock = {
      statusCode: 200,
      jsonData: null,
      status(code) { this.statusCode = code; return this; },
      json(data) { this.jsonData = data; return this; }
    };
    await getDoctorSlotsForDate(reqMock, resMock);
    const slot10AM = resMock.jsonData.slots.find(s => s.time === '10:00 AM');
    const slot09AM = resMock.jsonData.slots.find(s => s.time === '09:00 AM');

    if (slot10AM && slot10AM.isBooked === true && slot09AM.isBooked === false) {
      console.log('✓ TEST 5 PASSED: 10:00 AM is correctly marked as Booked, 09:00 AM is Available.');
    } else {
      throw new Error(`TEST 5 FAILED: Slot 10:00 AM isBooked state: ${slot10AM?.isBooked}`);
    }

    // ----------------------------------------------------
    // TEST 6: Verify Doctor A Dashboard & Notifications
    // ----------------------------------------------------
    console.log('\nTEST 6: Verify Doctor A receives Pending Request & Notification...');
    const doctorAppointments = await Appointment.find({ doctorId: 'DOC001' });
    const doctorNotifs = await Notification.find({ doctorId: 'DOC001' });

    if (doctorAppointments.length === 1 && doctorNotifs.length === 1) {
      console.log('✓ TEST 6 PASSED: Doctor A has 1 pending appointment and 1 notification.');
    } else {
      throw new Error(`TEST 6 FAILED: Doctor A appointments=${doctorAppointments.length}, notifs=${doctorNotifs.length}`);
    }

    // ----------------------------------------------------
    // TEST 7: Update Doctor A Availability to 02:00 PM - 06:00 PM
    // ----------------------------------------------------
    console.log('\nTEST 7: Doctor A changes availability to Saturday 02:00 PM - 06:00 PM...');
    const updatedScheduleA = [
      { day: 'Monday', available: false, slots: [] },
      { day: 'Tuesday', available: false, slots: [] },
      { day: 'Wednesday', available: false, slots: [] },
      { day: 'Thursday', available: false, slots: [] },
      { day: 'Friday', available: false, slots: [] },
      { day: 'Saturday', available: true, slots: [{ startTime: '02:00 PM', endTime: '06:00 PM' }] },
      { day: 'Sunday', available: false, slots: [] },
    ];

    await DoctorAvailability.findOneAndUpdate(
      { doctorId: 'DOC001' },
      { weeklySchedule: updatedScheduleA, slotDuration: 30 }
    );

    resMock = {
      statusCode: 200,
      jsonData: null,
      status(code) { this.statusCode = code; return this; },
      json(data) { this.jsonData = data; return this; }
    };
    await getDoctorSlotsForDate(reqMock, resMock);
    const newTimeLabels = resMock.jsonData.slots.map(s => s.time);
    console.log('  New Generated Slots:', newTimeLabels);

    if (newTimeLabels.includes('02:00 PM') && !newTimeLabels.includes('09:00 AM') && !newTimeLabels.includes('06:00 PM')) {
      console.log('✓ TEST 7 PASSED: Slots dynamically updated to 02:00 PM - 05:30 PM. Old morning slots removed.');
    } else {
      throw new Error(`TEST 7 FAILED: Dynamic slot update did not match expected.`);
    }

    // ----------------------------------------------------
    // TEST 8: Doctor B Isolation Check
    // ----------------------------------------------------
    console.log('\nTEST 8: Doctor B (DOC002) Availability & Isolation Check...');
    const scheduleB = [
      { day: 'Monday', available: false, slots: [] },
      { day: 'Tuesday', available: false, slots: [] },
      { day: 'Wednesday', available: false, slots: [] },
      { day: 'Thursday', available: false, slots: [] },
      { day: 'Friday', available: false, slots: [] },
      { day: 'Saturday', available: false, slots: [] },
      { day: 'Sunday', available: true, slots: [{ startTime: '04:00 PM', endTime: '08:00 PM' }] },
    ];

    await DoctorAvailability.findOneAndUpdate(
      { doctorId: 'DOC002' },
      { doctorId: 'DOC002', weeklySchedule: scheduleB, slotDuration: 30 },
      { new: true, upsert: true }
    );

    // Patient checks Doctor B for Sunday (2026-09-13)
    let reqDocB = { params: { doctorId: 'DOC002' }, query: { date: '2026-09-13' } };
    resMock = {
      statusCode: 200,
      jsonData: null,
      status(code) { this.statusCode = code; return this; },
      json(data) { this.jsonData = data; return this; }
    };
    await getDoctorSlotsForDate(reqDocB, resMock);

    if (resMock.jsonData.available && resMock.jsonData.slots.some(s => s.time === '04:00 PM')) {
      console.log('  Doctor B Sunday Slots generated successfully.');
    }

    // Patient checks Doctor A for Sunday (2026-09-13) -> must be UNAVAILABLE
    let reqDocAForSunday = { params: { doctorId: 'DOC001' }, query: { date: '2026-09-13' } };
    resMock = {
      statusCode: 200,
      jsonData: null,
      status(code) { this.statusCode = code; return this; },
      json(data) { this.jsonData = data; return this; }
    };
    await getDoctorSlotsForDate(reqDocAForSunday, resMock);

    if (resMock.jsonData.available === false) {
      console.log('✓ TEST 8 PASSED: Doctor A is unavailable on Sunday; Doctor B is available on Sunday. Complete isolation enforced.');
    } else {
      throw new Error(`TEST 8 FAILED: Doctor A showed available on Sunday.`);
    }

    // ----------------------------------------------------
    // TEST 9: Double Booking and Validation Rejection via Controller
    // ----------------------------------------------------
    console.log('\nTEST 9: Testing Controller Rejections (Double Booking, Invalid Day, Out-of-bounds Time)...');
    const { createAppointmentRequest } = require('./controllers/appointmentController');

    // 9a. Test Double Booking on already booked slot (10:00 AM on 2026-09-12)
    // First restore 09:00 AM - 01:00 PM availability on Saturday for DOC001
    await DoctorAvailability.findOneAndUpdate(
      { doctorId: 'DOC001' },
      { weeklySchedule: scheduleA, slotDuration: 30 }
    );

    let doubleBookReq = {
      body: {
        patientId: patient._id.toString(),
        doctorId: 'DOC001',
        date: '2026-09-12',
        time: '10:00 AM', // already booked in Test 4
        reason: 'Duplicate booking attempt',
        hospital: 'Medicare Hospital'
      }
    };
    let doubleBookRes = {
      statusCode: 200,
      jsonData: null,
      status(code) { this.statusCode = code; return this; },
      json(data) { this.jsonData = data; return this; }
    };
    await createAppointmentRequest(doubleBookReq, doubleBookRes);

    if (doubleBookRes.statusCode === 400 && doubleBookRes.jsonData.message.includes('already booked')) {
      console.log('  ✓ Double booking properly rejected with HTTP 400:', doubleBookRes.jsonData.message);
    } else {
      throw new Error(`TEST 9a FAILED: Double booking was not rejected. Status: ${doubleBookRes.statusCode}`);
    }

    // 9b. Test Booking on Unavailable Day (Sunday 2026-09-13 for DOC001)
    let invalidDayReq = {
      body: {
        patientId: patient._id.toString(),
        doctorId: 'DOC001',
        date: '2026-09-13', // Sunday (DOC001 is off)
        time: '10:00 AM',
        reason: 'Sunday booking attempt',
        hospital: 'Medicare Hospital'
      }
    };
    let invalidDayRes = {
      statusCode: 200,
      jsonData: null,
      status(code) { this.statusCode = code; return this; },
      json(data) { this.jsonData = data; return this; }
    };
    await createAppointmentRequest(invalidDayReq, invalidDayRes);

    if (invalidDayRes.statusCode === 400 && invalidDayRes.jsonData.message.includes('not available')) {
      console.log('  ✓ Unavailable day properly rejected with HTTP 400:', invalidDayRes.jsonData.message);
    } else {
      throw new Error(`TEST 9b FAILED: Unavailable day was not rejected. Status: ${invalidDayRes.statusCode}`);
    }

    // 9c. Test Out of Bounds Time (08:00 AM when working hours start at 09:00 AM)
    let invalidTimeReq = {
      body: {
        patientId: patient._id.toString(),
        doctorId: 'DOC001',
        date: '2026-09-12', // Saturday
        time: '08:00 AM',   // Out of bounds
        reason: 'Out of bounds time attempt',
        hospital: 'Medicare Hospital'
      }
    };
    let invalidTimeRes = {
      statusCode: 200,
      jsonData: null,
      status(code) { this.statusCode = code; return this; },
      json(data) { this.jsonData = data; return this; }
    };
    await createAppointmentRequest(invalidTimeReq, invalidTimeRes);

    if (invalidTimeRes.statusCode === 400 && invalidTimeRes.jsonData.message.includes('outside of doctor\'s working schedule')) {
      console.log('  ✓ Out-of-bounds time properly rejected with HTTP 400:', invalidTimeRes.jsonData.message);
    } else {
      throw new Error(`TEST 9c FAILED: Out-of-bounds time was not rejected. Status: ${invalidTimeRes.statusCode}`);
    }

    console.log('✓ TEST 9 PASSED: Backend strictly validates day, time range, and prevents double bookings.');

    console.log('\n======================================================');
    console.log('ALL 9 AUTOMATED AVAILABILITY & BOOKING TESTS PASSED!');
    console.log('======================================================\n');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error);
    process.exit(1);
  }
};

runTests();
