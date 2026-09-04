import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HospitalLogin from './pages/auth/HospitalLogin';
import PatientRegister from './pages/auth/PatientRegister';
import DoctorRegister from './pages/auth/DoctorRegister';

import PatientPortal from './components/patient/PatientPortal';
import AdminPortal from './components/admin/AdminPortal';
import DoctorPortal from '../../Doctor module/src/App';
import { authService } from './services/authService';

export default function App() {
  const location = useLocation();

  // ─── Patient Module ────────────────────────────────────────
  // PatientPortal handles its own auth guard internally.
  if (location.pathname.startsWith('/patient')) {
    return <PatientPortal />;
  }

  // ─── Admin Module ──────────────────────────────────────────
  // AdminPortal handles its own auth guard internally.
  if (location.pathname.startsWith('/admin')) {
    return <AdminPortal />;
  }

  // ─── Doctor Module ─────────────────────────────────────────
  if (location.pathname.startsWith('/doctor')) {
    if (!authService.isDoctorLoggedIn()) {
      return <Navigate to="/login" replace />;
    }
    return <DoctorPortal />;
  }

  // ─── Login / Register pages ────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F4F9FC] text-[#102A43]">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<HospitalLogin />} />
        <Route path="/register/patient" element={<PatientRegister />} />
        <Route path="/register/doctor" element={<DoctorRegister />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}