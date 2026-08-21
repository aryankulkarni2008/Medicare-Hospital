import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HospitalLogin from './pages/auth/HospitalLogin';
import PatientRegister from './pages/auth/PatientRegister';
import DoctorRegister from './pages/auth/DoctorRegister';
import AdminRegister from './pages/auth/AdminRegister';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F4F9FC] text-[#102A43]">
      <Routes>
        <Route path="/" element={<HospitalLogin />} />
        <Route path="/register/patient" element={<PatientRegister />} />
        <Route path="/register/doctor" element={<DoctorRegister />} />
        <Route path="/register/admin" element={<AdminRegister />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}