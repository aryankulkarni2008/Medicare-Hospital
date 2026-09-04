import React from 'react';
import { X, Calendar, Clock, MapPin, Building, FileText, User } from 'lucide-react';
import DoctorAvatar from '../common/DoctorAvatar';

export default function PatientAppointmentDetailsModal({ appointment, onClose }) {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl border border-[#D9E6EC] shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#D9E6EC] flex items-center justify-between bg-[#F4F9FC]">
          <div>
            <h3 className="text-base font-bold text-[#102A43]">Appointment Details</h3>
            <p className="text-xs text-[#64748B]">ID: {appointment.id}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-[#64748B] hover:bg-[#D9E6EC] hover:text-[#102A43]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Status Banner */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#E6F4FA]">
            <span className="text-xs font-semibold text-[#102A43]">Current Status</span>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
              appointment.status === 'Confirmed' ? 'bg-[#2490C9] text-white' :
              appointment.status === 'Pending' ? 'bg-[#FFF4C2] text-amber-800' :
              appointment.status === 'Completed' ? 'bg-[#22A06B] text-white' :
              appointment.status === 'Rejected' ? 'bg-[#D64545] text-white' : 'bg-[#64748B] text-white'
            }`}>
              {appointment.status}
            </span>
          </div>

          {/* Doctor Info */}
          <div className="flex items-center space-x-4 p-3 border border-[#D9E6EC] rounded-lg">
            <DoctorAvatar 
              name={appointment.doctorName}
              photo={appointment.doctorPhoto} 
              className="w-14 h-14 rounded-full object-cover border border-[#D9E6EC]"
            />
            <div>
              <h4 className="font-bold text-[#102A43] text-sm">{appointment.doctorName}</h4>
              <p className="text-xs font-semibold text-[#2490C9]">{appointment.specialty}</p>
              <p className="text-xs text-[#64748B]">{appointment.department}</p>
            </div>
          </div>

          {/* Schedule Info */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#F4F9FC] rounded-lg border border-[#D9E6EC]/60 space-y-1">
              <div className="flex items-center space-x-1.5 text-[#2490C9] font-medium">
                <Calendar className="w-4 h-4" />
                <span>Date</span>
              </div>
              <p className="font-bold text-[#102A43]">{appointment.date}</p>
            </div>

            <div className="p-3 bg-[#F4F9FC] rounded-lg border border-[#D9E6EC]/60 space-y-1">
              <div className="flex items-center space-x-1.5 text-[#2490C9] font-medium">
                <Clock className="w-4 h-4" />
                <span>Time Slot</span>
              </div>
              <p className="font-bold text-[#102A43]">{appointment.time}</p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-3 text-xs">
            <div className="flex items-start space-x-2">
              <Building className="w-4 h-4 text-[#2490C9] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#102A43]">Hospital Location:</span>
                <p className="text-[#64748B]">{appointment.hospital}</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <FileText className="w-4 h-4 text-[#2490C9] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#102A43]">Reason for Visit:</span>
                <p className="text-[#64748B]">{appointment.reason}</p>
              </div>
            </div>

            {appointment.notes && (
              <div className="p-3 bg-[#FFF4C2]/40 rounded-lg border border-[#FFF4C2] space-y-1">
                <span className="font-bold text-amber-900">Doctor / Clinic Notes:</span>
                <p className="text-amber-800">{appointment.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#D9E6EC] bg-[#F4F9FC] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#102A43] bg-white border border-[#D9E6EC] rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}