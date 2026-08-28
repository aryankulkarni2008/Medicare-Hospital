import React from 'react';
import { Calendar, Clock, MapPin, FileText } from 'lucide-react';

export default function PatientAppointmentCard({ appointment, onViewDetails, onCancelClick }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#2490C9] text-white">Confirmed</span>;
      case 'Pending':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#FFF4C2] text-amber-800">Pending</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#22A06B] text-white">Completed</span>;
      case 'Rejected':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#D64545] text-white">Rejected</span>;
      case 'Cancelled':
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#64748B] text-white">Cancelled</span>;
    }
  };

  const isCancelable = appointment.status === 'Pending' || appointment.status === 'Confirmed';

  return (
    <div className="bg-white rounded-xl border border-[#D9E6EC] p-5 shadow-xs hover:border-[#2490C9]/40 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex items-center space-x-3">
            <img 
              src={appointment.doctorPhoto} 
              alt={appointment.doctorName} 
              className="w-12 h-12 rounded-full object-cover border border-[#D9E6EC]"
            />
            <div>
              <h3 className="font-bold text-[#102A43] leading-snug">{appointment.doctorName}</h3>
              <p className="text-xs font-medium text-[#2490C9]">{appointment.specialty}</p>
              <p className="text-[11px] text-[#64748B]">{appointment.department}</p>
            </div>
          </div>
          {getStatusBadge(appointment.status)}
        </div>

        <div className="space-y-2 py-3 border-y border-[#D9E6EC]/60 text-xs text-[#64748B] mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-[#2490C9]" />
            <span className="font-medium text-[#102A43]">{appointment.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#2490C9]" />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-[#2490C9]" />
            <span className="truncate">{appointment.hospital}</span>
          </div>
          <div className="flex items-start space-x-2 pt-1">
            <FileText className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
            <span className="line-clamp-1 italic">{appointment.reason}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-2">
        <button
          onClick={() => onViewDetails(appointment)}
          className="flex-1 px-3 py-2 text-xs font-semibold text-[#2490C9] bg-[#E6F4FA] rounded-lg hover:bg-[#2490C9] hover:text-white transition-colors text-center"
        >
          View Details
        </button>
        {isCancelable && (
          <button
            onClick={() => onCancelClick(appointment)}
            className="px-3 py-2 text-xs font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}