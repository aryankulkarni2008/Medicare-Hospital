import React from 'react';
import { Calendar, Clock, Clipboard, ArrowRight } from 'lucide-react';

export default function AdminAppointmentSummaryCard({ appointment, doctorName, specialty, department, patientName }) {
  // Determine color theme for status badges
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Confirmed':
      case 'Success':
        return 'bg-status-success/15 text-status-success border-status-success/35';
      case 'Completed':
        return 'bg-med-light-blue text-med-blue border-med-blue/35';
      case 'Pending':
        return 'bg-status-pending text-yellow-800 border-yellow-200';
      case 'Cancelled':
      case 'Inactive':
        return 'bg-status-inactive/15 text-status-inactive border-status-inactive/35';
      case 'Rejected':
        return 'bg-status-rejected/15 text-status-rejected border-status-rejected/35';
      default:
        return 'bg-med-bg text-med-navy border-med-border';
    }
  };

  return (
    <div className="bg-white border border-med-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-med-blue/20 transition-all duration-200">
      
      {/* Top Header - Appointment status */}
      <div className="flex items-center justify-between pb-3 border-b border-med-border mb-4 text-xs font-semibold">
        <span className="text-[10px] text-med-gray tracking-wider uppercase font-bold">
          ID: {appointment.id}
        </span>
        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${getStatusStyle(appointment.status)}`}>
          {appointment.status}
        </span>
      </div>

      {/* Main Relationship display: Patient to Doctor */}
      <div className="space-y-3 mb-4">
        {patientName && (
          <div className="text-xs">
            <span className="text-med-gray block">Patient</span>
            <span className="font-bold text-med-navy text-sm">{patientName}</span>
          </div>
        )}
        
        <div className="flex items-center text-med-gray/50 gap-2">
          <ArrowRight className="w-4 h-4 text-med-blue/50" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-med-gray/30">Consulting</span>
        </div>

        <div className="text-xs">
          <span className="text-med-gray block">Doctor</span>
          <span className="font-bold text-med-navy text-sm">{doctorName || "Unknown Doctor"}</span>
          <span className="text-med-blue font-semibold block text-[11px] mt-0.5">
            {specialty} {department ? `(${department})` : ''}
          </span>
        </div>
      </div>

      {/* Appointment Date and Time details */}
      <div className="grid grid-cols-2 gap-3 bg-med-bg/40 p-3 rounded-lg border border-med-border text-xs mb-4">
        <div className="flex items-center gap-2 text-med-navy font-semibold">
          <Calendar className="w-4 h-4 text-med-blue flex-shrink-0" />
          <span>{appointment.date}</span>
        </div>
        <div className="flex items-center gap-2 text-med-navy font-semibold">
          <Clock className="w-4 h-4 text-med-blue flex-shrink-0" />
          <span>{appointment.time}</span>
        </div>
      </div>

      {/* Reason */}
      <div className="flex items-start gap-2 text-xs">
        <Clipboard className="w-4 h-4 text-med-gray flex-shrink-0 mt-0.5" />
        <div className="min-w-0">
          <span className="text-[10px] text-med-gray block font-bold">Reason for Visit</span>
          <p className="text-med-navy leading-relaxed font-medium line-clamp-2">{appointment.reason}</p>
        </div>
      </div>

    </div>
  );
}
