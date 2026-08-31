const Appointment = require('../models/Appointment');
const Notification = require('../models/Notification');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

// @desc    Create a new appointment request
// @route   POST /api/appointments
// @access  Public (should be protected in prod)
const createAppointmentRequest = async (req, res) => {
  try {
    const {
      patientId, // ObjectId
      doctorId,  // e.g. DOC001
      date,
      time,
      reason,
      hospital,
    } = req.body;

    // Validate doctor exists
    const doctor = await Doctor.findOne({ doctorId });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }

    // Validate patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }

    const appointmentId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;

    const newAppointment = await Appointment.create({
      appointmentId,
      patientId,
      patientName: patient.fullName,
      patientAge: patient.age || 30, // Using default if not provided
      doctorId: doctor.doctorId,
      doctorName: doctor.fullName,
      specialty: doctor.specialization,
      department: doctor.department,
      date,
      time,
      hospital: hospital || doctor.previousHospital || 'Medicare Hospital',
      reason,
      status: 'Pending',
    });

    // Create Notification for the specific doctor
    const notificationId = `N-${Date.now()}`;
    await Notification.create({
      notificationId,
      doctorId: doctor.doctorId,
      appointmentId: newAppointment.appointmentId,
      title: 'New Appointment Request',
      description: `Patient ${patient.fullName} requested an appointment.`,
      type: 'pending',
      read: false,
    });

    res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
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
  getDoctorAppointments,
  getPatientAppointments,
  updateAppointmentStatus
};
