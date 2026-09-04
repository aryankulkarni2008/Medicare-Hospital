import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AdminProvider } from '../../context/AdminContext';
import { authService } from '../../services/authService';

// Admin Layout Components
import AdminPortalSidebar from './AdminPortalSidebar';
import AdminPortalHeader from './AdminPortalHeader';
import AdminLogoutModal from './AdminLogoutModal';

// Admin Pages
import AdminDashboardPage from '../../pages/admin/AdminDashboardPage';
import AdminDoctorsPage from '../../pages/admin/AdminDoctorsPage';
import AdminDoctorProfilePage from '../../pages/admin/AdminDoctorProfilePage';
import AdminDoctorRequestsPage from '../../pages/admin/AdminDoctorRequestsPage';
import AdminPatientsPage from '../../pages/admin/AdminPatientsPage';
import AdminPatientDetailsPage from '../../pages/admin/AdminPatientDetailsPage';
import AdminNotificationsPage from '../../pages/admin/AdminNotificationsPage';
import AdminSettingsPage from '../../pages/admin/AdminSettingsPage';

// ─── Admin Layout with sidebar + header ──────────────────────
function AdminLayout({ onLogoutClick }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-med-bg text-med-navy flex">
      <AdminPortalSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onLogoutClick={onLogoutClick}
      />
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <AdminPortalHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ─── AdminPortal — Auth-guarded entry point ───────────────────
// Mirrors PatientPortal.jsx structure.
// Protected: redirects to "/" if not admin-authenticated.
export default function AdminPortal() {
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // Auth guard — redirect to login if not authenticated as admin
  if (!authService.isAdminLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    authService.logoutAdmin();
    navigate('/login');
  };

  return (
    <AdminProvider>
      <Routes>
        {/* Admin module routes under /admin/* */}
        <Route element={<AdminLayout onLogoutClick={() => setLogoutModalOpen(true)} />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/doctors" element={<AdminDoctorsPage />} />
          <Route path="/admin/doctor/:id" element={<AdminDoctorProfilePage />} />
          <Route path="/admin/doctor-requests" element={<AdminDoctorRequestsPage />} />
          <Route path="/admin/patients" element={<AdminPatientsPage />} />
          <Route path="/admin/patient/:id" element={<AdminPatientDetailsPage />} />
          <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
          <Route
            path="/admin/settings"
            element={<AdminSettingsPage onLogoutClick={() => setLogoutModalOpen(true)} />}
          />
        </Route>

        {/* Redirect bare /admin to dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Catch-all within admin space → dashboard */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>

      {/* Logout Confirmation Modal */}
      <AdminLogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </AdminProvider>
  );
}
