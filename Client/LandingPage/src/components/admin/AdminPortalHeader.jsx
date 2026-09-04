import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';

export default function AdminPortalHeader({ toggleSidebar }) {
  const { notifications, adminProfile } = useAdmin();
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-med-border">
      {/* Left side: Hamburger (mobile) and Search bar */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-lg text-med-gray hover:bg-med-bg lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="relative max-w-md w-full hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-med-gray/60">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search doctors, patients, appointments..."
            className="w-full py-2 pl-10 pr-4 text-sm text-med-navy placeholder-med-gray/60 bg-med-bg border border-med-border rounded-lg outline-none focus:border-med-blue focus:bg-white transition-all duration-200"
          />
        </div>
      </div>

      {/* Right side: Notifications bell & Admin Profile summary */}
      <div className="flex items-center gap-6">
        
        {/* Notification Bell */}
        <button 
          onClick={() => navigate('/admin/notifications')}
          className="relative p-2 rounded-lg text-med-gray hover:bg-med-light-blue hover:text-med-blue transition-all duration-200"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-bold text-white bg-med-blue rounded-full border-2 border-white animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="w-[1px] h-8 bg-med-border hidden sm:block"></div>

        {/* Profile Dropdown Indicator */}
        <button 
          onClick={() => navigate('/admin/settings')}
          className="flex items-center gap-3 p-1 rounded-lg hover:bg-med-bg transition-all duration-200 text-left"
        >
          <img 
            src={adminProfile.photo} 
            alt={adminProfile.name}
            className="w-9 h-9 rounded-full object-cover border border-med-border"
          />
          <div className="hidden sm:block">
            <h5 className="text-sm font-semibold text-med-navy leading-tight">{adminProfile.name}</h5>
            <p className="text-[10px] text-med-gray leading-none">Admin</p>
          </div>
          <ChevronDown className="w-4 h-4 text-med-gray hidden sm:block" />
        </button>

      </div>
    </header>
  );
}
