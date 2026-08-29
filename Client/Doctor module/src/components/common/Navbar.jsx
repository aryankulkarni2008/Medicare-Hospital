import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, User, ChevronDown, CheckCircle } from 'lucide-react';
import { useDoctor } from '../../context/DoctorContext';

export const Navbar = ({ toggleMobileSidebar }) => {
  const { doctorProfile, unreadNotificationCount } = useDoctor();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/doctor/appointments?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="h-[64px] bg-white border-b border-[#D9E6EC] flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left section: Hamburger for Mobile + Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden bg-transparent border-0 cursor-pointer p-1.5 text-[#102A43] flex items-center"
        >
          <Menu size={22} />
        </button>

        <form onSubmit={handleSearchSubmit} className="max-w-[380px] w-full">
          <div className="relative flex items-center">
            <Search
              size={16}
              className="absolute left-3 text-[#64748B] pointer-events-none"
            />
            <input
              type="text"
              className="w-full pl-[2.3rem] pr-3.5 h-[38px] text-[0.85rem] rounded-full border border-[#D9E6EC] bg-[#F4F9FC] text-[#102A43] outline-none focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/20 transition-colors"
              placeholder="Search patient, appointment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Right Section: Status, Notifications & Profile */}
      <div className="flex items-center gap-[1.25rem]">
        {/* Status Indicator */}
        <div className="flex items-center gap-[0.4rem] text-[0.8125rem] font-medium color-[#047857] text-[#047857] bg-[#D1FAE5] px-3 py-[0.3rem] rounded-full border border-[#A7F3D0]">
          <CheckCircle size={14} />
          <span className="inline">In Clinic & Available</span>
        </div>

        {/* Notification Bell */}
        <Link
          to="/doctor/notifications"
          className="relative text-[#102A43] flex items-center justify-center w-[38px] h-[38px] rounded-full bg-[#F4F9FC] border border-[#D9E6EC] hover:bg-[#E6F4FA] transition-colors"
        >
          <Bell size={19} color="#102A43" />
          {unreadNotificationCount > 0 && (
            <span className="absolute -top-[2px] -right-[2px] bg-[#EF4444] text-white text-[0.65rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white">
              {unreadNotificationCount}
            </span>
          )}
        </Link>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-[0.6rem] bg-transparent border-0 cursor-pointer p-[0.2rem]"
          >
            <img
              src={doctorProfile.avatar}
              alt={doctorProfile.name}
              className="w-[36px] h-[36px] rounded-full object-cover border-2 border-[#2490C9]"
            />
            <div className="text-left hidden sm:block">
              <div className="text-[0.85rem] font-semibold text-[#102A43]">{doctorProfile.name}</div>
              <div className="text-[0.7rem] text-[#64748B]">{doctorProfile.title}</div>
            </div>
            <ChevronDown size={16} className="text-[#64748B]" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-[120%] w-[200px] bg-white border border-[#D9E6EC] rounded-lg shadow-[0_10px_25px_-5px_rgba(16,42,67,0.1)] py-2 z-50">
              <div className="px-4 py-2 border-b border-[#D9E6EC]">
                <div className="text-[0.875rem] font-semibold text-[#102A43]">{doctorProfile.name}</div>
                <div className="text-[0.75rem] text-[#64748B]">{doctorProfile.email}</div>
              </div>
              <Link
                to="/doctor/profile"
                onClick={() => setShowDropdown(false)}
                className="flex items-center gap-2 px-4 py-[0.6rem] text-[0.85rem] text-[#102A43] hover:bg-[#F4F9FC] transition-colors"
              >
                <User size={16} color="#2490C9" />
                View Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
