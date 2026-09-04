import React from 'react';
import { Mail, Phone, MapPin, Award, GraduationCap, Building, Clipboard, Check, X } from 'lucide-react';
import DoctorAvatar from '../common/DoctorAvatar';

export default function AdminDoctorRequestCard({ request, onAccept, onReject }) {
  // If the status is already approved or rejected, display its final badge
  const isPending = request.status === 'Pending';

  return (
    <div className="bg-white border border-med-border rounded-xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      
      {/* Top Banner indicating Status */}
      <div className={`px-6 py-3 flex items-center justify-between text-xs font-bold ${
        request.status === 'Pending' ? 'bg-status-pending/20 text-yellow-800' :
        request.status === 'Approved' ? 'bg-status-success/20 text-status-success' :
        'bg-status-rejected/20 text-status-rejected'
      }`}>
        <span className="uppercase tracking-wider">Registration Request</span>
        <span className={`px-2 py-0.5 rounded ${
          request.status === 'Pending' ? 'bg-yellow-200' :
          request.status === 'Approved' ? 'bg-green-200' :
          'bg-red-200'
        }`}>
          {request.status}
        </span>
      </div>

      <div className="p-6 flex-1 space-y-6">
        
        {/* Section 1: Personal Details */}
        <div className="flex flex-col sm:flex-row gap-4 items-start pb-5 border-b border-med-border">
          <DoctorAvatar 
            name={request.name}
            photo={request.photo || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300"} 
            className="w-16 h-16 rounded-lg object-cover border border-med-border flex-shrink-0"
          />
          <div className="space-y-1 min-w-0">
            <h3 className="text-lg font-bold text-med-navy leading-tight">{request.name}</h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-med-gray font-medium">
              <span>Age: {request.age}</span>
              <span>•</span>
              <span>Gender: {request.gender}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 pt-2 text-xs text-med-navy">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-med-gray" />
                <span className="truncate">{request.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-med-gray" />
                <span>{request.phone}</span>
              </div>
              <div className="flex items-start gap-1.5 md:col-span-2">
                <MapPin className="w-3.5 h-3.5 text-med-gray flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{request.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Professional Information */}
        <div className="space-y-3 pb-5 border-b border-med-border">
          <h4 className="text-xs font-bold text-med-navy uppercase tracking-widest text-med-gray/80">
            Professional Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
            <div className="flex items-start gap-2.5">
              <Award className="w-4 h-4 text-med-blue mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-med-gray block">Specialty / Experience</span>
                <span className="text-sm font-bold text-med-navy">{request.specialty} ({request.experience} Years)</span>
              </div>
            </div>
            
            <div className="flex items-start gap-2.5">
              <GraduationCap className="w-4 h-4 text-med-blue mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-med-gray block">License / Degree</span>
                <span className="text-sm font-bold text-med-navy">{request.degree}</span>
                <span className="block text-[10px] text-med-gray">Reg Number: {request.licenseNumber}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 md:col-span-2">
              <Building className="w-4 h-4 text-med-blue mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-med-gray block">University / Medical College</span>
                <span className="text-sm font-bold text-med-navy">{request.college}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Hospital details & preferences */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-med-navy uppercase tracking-widest text-med-gray/80">
            Hospital Settings & Preferences
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium bg-med-bg/40 p-3 rounded-lg border border-med-border">
            <div>
              <span className="text-[10px] text-med-gray block">Preferred Department</span>
              <span className="text-sm font-bold text-med-navy">{request.preferredDepartment || "General Medicine"}</span>
            </div>
            <div>
              <span className="text-[10px] text-med-gray block">Previous Hospital / Clinic</span>
              <span className="text-sm font-bold text-med-navy">{request.previousClinic || "None"}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Approve & Reject Actions */}
      {isPending && (
        <div className="px-6 py-4 bg-med-bg/30 border-t border-med-border flex items-center justify-end gap-3">
          <button
            onClick={() => onReject(request.id)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-status-rejected border border-status-rejected/20 rounded-lg bg-red-50 hover:bg-status-rejected hover:text-white transition-all duration-200"
          >
            <X className="w-4 h-4" />
            <span>Reject Request</span>
          </button>
          
          <button
            onClick={() => onAccept(request.id)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-status-success hover:bg-green-700 rounded-lg shadow-sm hover:shadow transition-all duration-200"
          >
            <Check className="w-4 h-4" />
            <span>Accept Request</span>
          </button>
        </div>
      )}
    </div>
  );
}
