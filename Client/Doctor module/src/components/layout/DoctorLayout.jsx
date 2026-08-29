import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Navbar from '../common/Navbar';
import ToastContainer from '../common/Toast';

export const DoctorLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F4F9FC]">
      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileSidebarOpen} closeMobileSidebar={closeMobileSidebar} />

      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-[#102A43]/40 z-[35]"
        />
      )}

      {/* Main Content Area */}
      <div className="ml-0 lg:ml-[250px] flex-1 flex flex-col min-w-0">
        <Navbar toggleMobileSidebar={toggleMobileSidebar} />
        <main className="p-4 sm:p-7 flex-1 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default DoctorLayout;
