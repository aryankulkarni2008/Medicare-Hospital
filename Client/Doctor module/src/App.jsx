import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DoctorProvider } from './context/DoctorContext';
import DoctorLayout from './components/layout/DoctorLayout';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorProfile from './pages/DoctorProfile';
import DoctorAvailability from './pages/DoctorAvailability';
import DoctorAppointments from './pages/DoctorAppointments';
import AppointmentDetail from './pages/AppointmentDetail';
import DoctorPatients from './pages/DoctorPatients';
import PatientDetail from './pages/PatientDetail';
import DoctorNotifications from './pages/DoctorNotifications';

export function App() {
  return (
    <DoctorProvider>
      <Routes>
          {/* Main Root Redirect */}
          <Route path="/" element={<Navigate to="/doctor/dashboard" replace />} />
          <Route path="/doctor" element={<Navigate to="/doctor/dashboard" replace />} />

          {/* Doctor Module Routes */}
          <Route element={<DoctorLayout />}>
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/profile" element={<DoctorProfile />} />
            <Route path="/doctor/availability" element={<DoctorAvailability />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
            <Route path="/doctor/appointments/:id" element={<AppointmentDetail />} />
            <Route path="/doctor/patients" element={<DoctorPatients />} />
            <Route path="/doctor/patients/:id" element={<PatientDetail />} />
            <Route path="/doctor/notifications" element={<DoctorNotifications />} />
          </Route>

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/doctor/dashboard" replace />} />
        </Routes>
    </DoctorProvider>
  );
}

export default App;
