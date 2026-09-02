const Appointment = require('../models/Appointment');
const Notification = require('../models/Notification');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const DoctorAvailability = require('../models/DoctorAvailability');
const {
  parseTimeToMinutes,
  formatMinutesToTime,
  getDayNameFromDate,
} = require('./availabilityController');

// @desc    Create a new appointment request
// @route   POST /api/appointments
// @access  Public
const createAppointmentRequest = async (req, res) => {
  try {
    const {
      patientId, // ObjectId or string
      doctorId,  // e.g. DOC001
      date,
      time,
      reason,
      hospital,
    } = req.body;

    if (!doctorId || !date || !time || !reason) {
      return res.status(400).json({ message: 'Doctor ID, date, time, and reason are required.' });
    }

    // 1. Validate doctor exists
    const doctor = await Doctor.findOne({ doctorId });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }

    // 2. Validate patient exists
    let patient = null;
    if (patientId && patientId.match(/^[0-9a-fA-F]{24}$/)) {
      patient = await Patient.findById(patientId);
    }
    if (!patient) {
      patient = await Patient.findOne({ email: req.body.patientEmail });
    }
    if (!patient) {
      // If patientId is string or test ID, ensure we handle gracefully
      return res.status(404).json({ message: 'Patient not found. Please log in again.' });
    }

    // 3. Validate doctor availability in database
    const availability = await DoctorAvailability.findOne({ doctorId: doctor.doctorId });
    if (!availability) {
      return res.status(400).json({ message: 'Doctor has not configured availability yet.' });
    }

    // 4. Validate selected date & day of week
    const dayName = getDayNameFromDate(date);
    if (!dayName) {
      return res.status(400).json({ message: 'Invalid appointment date format.' });
    }

    const dayConfig = availability.weeklySchedule.find((d) => d.day === dayName);
    if (!dayConfig || !dayConfig.available || !dayConfig.slots || dayConfig.slots.length === 0) {
      return res.status(400).json({ message: `Doctor is not available on ${dayName}s.` });
    }

    // 5. Validate selected time falls within configured slots
    const normalizedTime = formatMinutesToTime(parseTimeToMinutes(time));
    const requestedMins = parseTimeToMinutes(time);
    const duration = availability.slotDuration || 30;

    let isValidSlot = false;
    for (const range of dayConfig.slots) {
      const startMins = parseTimeToMinutes(range.startTime);
      const endMins = parseTimeToMinutes(range.endTime);

      if (
        requestedMins >= startMins &&
        requestedMins + duration <= endMins &&
        (requestedMins - startMins) % duration === 0
      ) {
        isValidSlot = true;
        break;
      }
    }

    if (!isValidSlot) {
      return res.status(400).json({
        message: `Selected time (${normalizedTime}) falls outside of doctor's working schedule for ${dayName}.`,
      });
    }

    // 6. Validate slot is not already booked (prevent double booking)
    const existingAppointment = await Appointment.findOne({
      doctorId: doctor.doctorId,
      date,
      time: normalizedTime,
      status: { $nin: ['Cancelled', 'Rejected'] },
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: `The time slot ${normalizedTime} on ${date} is already booked. Please choose another time.`,
      });
    }

    // 7. Create appointment
    const appointmentId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;

    const newAppointment = await Appointment.create({
      appointmentId,
      patientId: patient._id,
      patientName: patient.fullName,
      patientAge: patient.age || 30,
      doctorId: doctor.doctorId,
      doctorName: doctor.fullName,
      specialty: doctor.specialization,
      department: doctor.department,
      date,
      time: normalizedTime,
      hospital: hospital || doctor.previousHospital || 'Medicare Hospital',
      reason,
      status: 'Pending',
    });

    // 8. Create Notification for the specific doctor
    const notificationId = `N-${Date.now()}`;
    await Notification.create({
      notificationId,
      doctorId: doctor.doctorId,
      appointmentId: newAppointment.appointmentId,
      title: 'New Appointment Request',
      description: `Patient ${patient.fullName} requested an appointment for ${date} at ${normalizedTime}.`,
      type: 'pending',
      read: false,
    });

    return res.status(201).json({
      message: 'Appointment request sent successfully.',
      appointment: newAppointment,
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return res.status(500).json({ message: 'Server error creating appointment.' });
  }
};

// @desc    Get all appointments (for Admin dashboard and views)
// @route   GET /api/appointments
// @access  Public
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching all appointments:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Get all appointments for a specific doctor
// @route   GET /api/appointments/doctor/:doctorId
// @access  Public
const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId }).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Get all appointments for a specific patient
// @route   GET /api/appointments/patient/:patientId
// @access  Public
const getPatientAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId }).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Update appointment status (Accept/Reject/Complete)
// @route   PUT /api/appointments/:id/status
// @access  Public
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params; // this is the custom appointmentId (e.g. APT-1234)
    const { status, reason } = req.body;

    const appointment = await Appointment.findOne({ appointmentId: id });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    appointment.status = status;
    if (reason) {
      appointment.rejectReason = reason;
    }
    await appointment.save();

    // Create a notification for the doctor logging this action
    let notifTitle = '';
    let notifType = 'info';
    if (status === 'Confirmed') {
      notifTitle = 'Appointment Confirmed';
      notifType = 'confirmed';
    } else if (status === 'Rejected') {
      notifTitle = 'Appointment Rejected';
      notifType = 'cancelled';
    } else if (status === 'Completed') {
      notifTitle = 'Appointment Completed';
      notifType = 'confirmed';
    } else if (status === 'Cancelled') {
      notifTitle = 'Appointment Cancelled';
      notifType = 'cancelled';
    }

    if (notifTitle) {
      const notificationId = `N-${Date.now()}`;
      await Notification.create({
        notificationId,
        doctorId: appointment.doctorId,
        appointmentId: appointment.appointmentId,
        title: notifTitle,
        description: `You marked appointment ${id} for ${appointment.patientName} as ${status}.`,
        type: notifType,
        read: false,
      });
    }

    res.json({ message: `Appointment status updated to ${status}`, appointment });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  createAppointmentRequest,
  getAllAppointments,
  getDoctorAppointments,
  getPatientAppointments,
  updateAppointmentStatus
};
