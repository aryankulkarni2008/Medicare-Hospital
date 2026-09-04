import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, XCircle, User, Bell } from 'lucide-react';

export default function PatientNotificationCard({ notification, onMarkAsRead }) {
  const navigate = useNavigate();

  const getIcon = (type) => {
    switch (type) {
      case 'Appointment Confirmed':
      case 'Appointment Completed':
        return <CheckCircle className="w-5 h-5 text-[#22A06B]" />;
      case 'Appointment Rejected':
      case 'Appointment Cancelled':
        return <XCircle className="w-5 h-5 text-[#D64545]" />;
      case 'Appointment Reminder':
      case 'Appointment Pending':
        return <Clock className="w-5 h-5 text-[#2490C9]" />;
      case 'Profile Updated':
      default:
        return <User className="w-5 h-5 text-[#64748B]" />;
    }
  };

  return (
    <div 
      onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-4 ${
        notification.isRead 
          ? 'bg-white border-[#D9E6EC]' 
          : 'bg-[#E6F4FA]/60 border-[#2490C9]/40 shadow-xs'
      }`}
    >
      <div className="p-2.5 rounded-lg bg-white border border-[#D9E6EC] shrink-0 shadow-xs">
        {getIcon(notification.type)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className={`text-sm ${notification.isRead ? 'font-semibold text-[#102A43]' : 'font-bold text-[#102A43]'}`}>
            {notification.title}
          </h4>
          <span className="text-[11px] text-[#64748B] shrink-0">{notification.timestamp}</span>
        </div>

        <p className="text-xs text-[#64748B] leading-relaxed mb-2">{notification.message}</p>

        <div className="flex items-center justify-between">
          {!notification.isRead && (
            <span className="inline-flex items-center text-[10px] font-bold text-[#2490C9]">
              • Unread
            </span>
          )}
          {notification.appointmentId && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate('/patient/appointments');
              }}
              className="text-xs font-semibold text-[#2490C9] hover:underline ml-auto"
            >
              View Appointment →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}