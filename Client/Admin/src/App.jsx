import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';

// Components
import AdminPortalSidebar from './components/admin/AdminPortalSidebar';
import AdminPortalHeader from './components/admin/AdminPortalHeader';
import AdminLogoutModal from './components/admin/AdminLogoutModal';

// Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminDoctorsPage from './pages/admin/AdminDoctorsPage';
import AdminDoctorProfilePage from './pages/admin/AdminDoctorProfilePage';
import AdminDoctorRequestsPage from './pages/admin/AdminDoctorRequestsPage';
import AdminPatientsPage from './pages/admin/AdminPatientsPage';
import AdminPatientDetailsPage from './pages/admin/AdminPatientDetailsPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Simple Logged Out Page
function LoggedOutPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-med-bg flex items-center justify-center p-4">
      <div className="bg-white border border-med-border rounded-xl p-8 max-w-sm w-full text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-med-blue flex items-center justify-center mx-auto border border-med-border">
          🏥
        </div>
        <h2 className="text-lg font-bold text-med-navy">Logged Out Successfully</h2>
        <p className="text-xs text-med-gray font-medium leading-relaxed">
          You have been signed out of the MediCare Hospital Administration console.
        </p>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="w-full py-2 px-4 text-xs font-semibold text-white bg-med-blue hover:bg-med-blue-hover rounded-lg transition-colors"
        >
          Return to Admin Login
        </button>
      </div>
    </div>
  );
}

// Layout wrapper component
function AdminLayout({ onLogoutClick }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-med-bg text-med-navy flex">
      {/* Left Sidebar */}
      <AdminPortalSidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onLogoutClick={onLogoutClick} 
      />

      {/* Right Column (Header + Main Area) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Header */}
        <AdminPortalHeader toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    navigate('/logged-out');
  };

  return (
    <AdminProvider>
      <Routes>
        {/* Admin Dashboard Pathways */}
        <Route element={<AdminLayout onLogoutClick={() => setLogoutModalOpen(true)} />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/doctors" element={<AdminDoctorsPage />} />
          <Route path="/admin/doctor/:id" element={<AdminDoctorProfilePage />} />
          <Route path="/admin/doctor-requests" element={<AdminDoctorRequestsPage />} />
          <Route path="/admin/patients" element={<AdminPatientsPage />} />
          <Route path="/admin/patient/:id" element={<AdminPatientDetailsPage />} />
          <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage onLogoutClick={() => setLogoutModalOpen(true)} />} />
        </Route>

        {/* Auth / Logged Out View */}
        <Route path="/logged-out" element={<LoggedOutPage />} />

        {/* Default Redirections */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center bg-med-bg text-xs font-semibold text-med-gray">404 - Page Not Found</div>} />
      </Routes>

      {/* Logout Confirmation Modal Overlay */}
      <AdminLogoutModal 
        isOpen={logoutModalOpen} 
        onClose={() => setLogoutModalOpen(false)} 
        onConfirm={handleLogoutConfirm} 
      />
    </AdminProvider>
  );
}
