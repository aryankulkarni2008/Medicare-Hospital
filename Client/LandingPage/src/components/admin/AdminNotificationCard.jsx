import React from 'react';
import { UserPlus, UserCheck, Calendar, Bell, Info } from 'lucide-react';

export default function AdminNotificationCard({ notification, onClick }) {
  const isUnread = !notification.isRead;

  // Decide icon based on type
  const getIcon = () => {
    switch (notification.type) {
      case 'doctor_request':
        return { icon: UserPlus, bg: 'bg-yellow-100 text-yellow-600' };
      case 'doctor_approved':
      case 'patient_registration':
        return { icon: UserCheck, bg: 'bg-green-100 text-green-600' };
      case 'appointment_update':
        return { icon: Calendar, bg: 'bg-blue-100 text-med-blue' };
      default:
        return { icon: Info, bg: 'bg-slate-100 text-slate-600' };
    }
  };

  const { icon: NotificationIcon, bg: iconStyle } = getIcon();

  return (
    <div 
      onClick={() => isUnread && onClick && onClick(notification.id)}
      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex gap-4 ${
        isUnread 
          ? 'bg-med-light-blue/40 border-med-blue/30 shadow-sm' 
          : 'bg-white border-med-border hover:bg-med-bg/40'
      }`}
    >
      {/* Icon Indicator */}
      <div className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${iconStyle}`}>
        <NotificationIcon className="w-5 h-5" />
      </div>

      {/* Main text and info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className={`text-sm text-med-navy truncate ${isUnread ? 'font-bold' : 'font-medium'}`}>
            {notification.title}
          </h4>
          {isUnread && (
            <span className="w-2.5 h-2.5 rounded-full bg-med-blue flex-shrink-0 animate-ping"></span>
          )}
        </div>
        <p className="text-xs text-med-gray leading-relaxed mb-1 font-medium">{notification.message}</p>
        <span className="text-[10px] text-med-gray/70 font-semibold">{notification.timestamp}</span>
      </div>
    </div>
  );
}
