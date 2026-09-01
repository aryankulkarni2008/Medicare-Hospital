require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const patientRoutes = require('./routes/patientRoutes');
const adminRoutes = require('./routes/adminRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/patients', patientRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/availability', availabilityRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();