import React from 'react';
import { useDoctor } from '../context/DoctorContext';
import { Bell, Check, CheckCheck, Trash2, Calendar, Clock, AlertTriangle } from 'lucide-react';

export const DoctorNotifications = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications
  } = useDoctor();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'request':
        return <Calendar size={20} color="#2490C9" />;
      case 'cancelled':
        return <AlertTriangle size={20} color="#EF4444" />;
      case 'upcoming':
        return <Clock size={20} color="#10B981" />;
      default:
        return <Bell size={20} color="#64748B" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-[900px]">
      {/* Header */}
      <div className="bg-white rounded-xl p-[1.5rem_1.75rem] border border-[#D9E6EC] flex justify-between items-center flex-wrap gap-4 shadow-[0_1px_3px_rgba(16,42,67,0.05)]">
        <div>
          <h1 className="text-[1.4rem] font-bold text-[#102A43] mb-1">
            Notifications
          </h1>
          <p className="text-[#64748B] text-sm m-0">
            Stay updated with real-time appointment requests, cancellations, and clinic alerts.
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="flex gap-2.5">
            <button
              className="inline-flex items-center justify-center gap-1.5 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#102A43] hover:bg-[#F4F9FC]"
              onClick={markAllNotificationsAsRead}
            >
              <CheckCheck size={15} color="#2490C9" />
              <span>Mark All Read</span>
            </button>
            <button
              className="inline-flex items-center justify-center gap-1.5 px-3 py-[0.35rem] text-[0.8125rem] font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#EF4444] hover:bg-[#F4F9FC]"
              onClick={clearNotifications}
            >
              <Trash2 size={15} />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-[1.25rem] shadow-[0_1px_3px_rgba(16,42,67,0.06)]">
        {notifications.length === 0 ? (
          <div className="text-center py-12 px-4 text-[#64748B]">
            <Bell size={42} color="#CBD5E1" className="mx-auto mb-3" />
            <h3 className="text-[1.1rem] text-[#102A43] mb-1 font-semibold">You're all caught up!</h3>
            <span className="text-sm">No new notifications at this time.</span>
          </div>
        ) : (
          <div className="flex flex-col gap-[0.85rem]">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-4 p-[1.1rem] rounded-lg border transition-all duration-150 ease-in-out ${
                  n.read ? 'bg-white border-[#D9E6EC]' : 'bg-[#E6F4FA] border-[#BEE3F8]'
                }`}
              >
                <div className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center shadow-[0_2px_4px_rgba(16,42,67,0.06)] shrink-0">
                  {getNotificationIcon(n.type)}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-[0.95rem] font-semibold text-[#102A43] m-0">
                      {n.title}
                      {!n.read && (
                        <span className="ml-2 inline-block w-1.75 h-1.75 rounded-full bg-[#2490C9]" />
                      )}
                    </h3>
                    <span className="text-xs text-[#64748B] font-medium">{n.time}</span>
                  </div>
                  <p className="text-sm text-[#64748B] leading-snug m-0">
                    {n.description}
                  </p>
                </div>

                {!n.read && (
                  <button
                    onClick={() => markNotificationAsRead(n.id)}
                    className="inline-flex items-center justify-center p-[0.4rem] rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#102A43] hover:bg-[#F4F9FC]"
                    title="Mark as read"
                  >
                    <Check size={15} color="#2490C9" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorNotifications;
