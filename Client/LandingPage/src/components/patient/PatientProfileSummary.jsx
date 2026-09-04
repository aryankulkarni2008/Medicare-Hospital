import React from 'react';
import { User, Mail, Phone, Calendar, Droplet, MapPin } from 'lucide-react';

export default function PatientProfileSummary({ patient }) {
  return (
    <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs mb-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <img 
          src={patient.photo} 
          alt={patient.name} 
          className="w-20 h-20 rounded-full object-cover border-2 border-[#2490C9]"
        />
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-[#102A43]">{patient.name}</h2>
              <p className="text-xs font-semibold text-[#2490C9]">Patient ID: {patient.id}</p>
            </div>
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-[#E6F4FA] text-[#2490C9] self-center sm:self-auto">
              Blood Group: {patient.bloodGroup}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#D9E6EC] text-xs text-[#64748B]">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <Mail className="w-4 h-4 text-[#2490C9]" />
              <span className="truncate">{patient.email}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <Phone className="w-4 h-4 text-[#2490C9]" />
              <span>{patient.phone}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <Calendar className="w-4 h-4 text-[#2490C9]" />
              <span>DOB: {patient.dob}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <User className="w-4 h-4 text-[#2490C9]" />
              <span>Gender: {patient.gender}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start space-x-2 md:col-span-2">
              <MapPin className="w-4 h-4 text-[#2490C9]" />
              <span className="truncate">{patient.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}