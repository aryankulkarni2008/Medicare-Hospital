import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';

export default function PatientPortalHeader({ title, patient, unreadCount, onMobileMenuToggle }) {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-[#D9E6EC] px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center space-x-3">
        <button 
          onClick={onMobileMenuToggle}
          className="p-2 rounded-lg text-[#64748B] hover:bg-[#E6F4FA] hover:text-[#102A43] lg:hidden"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-[#102A43]">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button 
          onClick={() => navigate('/patient/notifications')}
          className="relative p-2 rounded-full text-[#64748B] hover:bg-[#E6F4FA] hover:text-[#2490C9] transition-colors"
          title="View Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="h-6 w-px bg-[#D9E6EC] hidden sm:block" />

        {/* User Mini Profile */}
        <div 
          onClick={() => navigate('/patient/settings')}
          className="flex items-center space-x-3 cursor-pointer p-1 rounded-lg hover:bg-[#E6F4FA] transition-colors"
        >
          <img 
            src={patient.photo} 
            alt={patient.name} 
            className="w-9 h-9 rounded-full object-cover border border-[#D9E6EC]"
          />
          <span className="text-sm font-semibold text-[#102A43] hidden sm:inline-block">
            {patient.name}
          </span>
        </div>
      </div>
    </header>
  );
}