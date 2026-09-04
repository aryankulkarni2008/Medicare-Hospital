import React from 'react';
import { X, Award, DollarSign, BookOpen, GraduationCap, MapPin, Mail, Phone } from 'lucide-react';
import DoctorAvatar from '../common/DoctorAvatar';

export default function AdminDoctorProfileModal({ doctor, onClose }) {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
      <div className="bg-white border border-med-border rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative animate-scale-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-med-gray hover:bg-med-light-blue hover:text-med-blue transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="p-6">
          {/* Header summary */}
          <div className="flex items-center gap-4 pb-5 border-b border-med-border">
            <DoctorAvatar 
              name={doctor.name}
              photo={doctor.photo} 
              className="w-16 h-16 rounded-full object-cover border-2 border-med-light-blue flex-shrink-0"
            />
            <div className="min-w-0">
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-1 ${doctor.status === 'Active' ? 'bg-status-success/15 text-status-success' : 'bg-status-inactive/15 text-status-inactive'}`}>
                {doctor.status}
              </span>
              <h3 className="text-xl font-bold text-med-navy truncate">{doctor.name}</h3>
              <p className="text-sm font-semibold text-med-blue truncate">{doctor.specialty}</p>
              <span className="text-xs text-med-gray block truncate">{doctor.department}</span>
            </div>
          </div>

          {/* About Doctor */}
          <div className="py-4 border-b border-med-border">
            <h4 className="text-xs font-bold text-med-navy uppercase tracking-wider mb-2">About Doctor</h4>
            <p className="text-xs text-med-gray leading-relaxed font-medium">
              {doctor.about || "No professional biography provided."}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4 py-4 border-b border-med-border">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-med-light-blue text-med-blue flex-shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-med-gray block">Experience</span>
                <span className="text-sm font-bold text-med-navy">{doctor.experience} Years</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-med-light-blue text-med-blue flex-shrink-0">
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-med-gray block">Consultation Fee</span>
                <span className="text-sm font-bold text-med-navy">${doctor.fee}</span>
              </div>
            </div>
          </div>

          {/* Academic Info */}
          <div className="py-4 border-b border-med-border space-y-3">
            <h4 className="text-xs font-bold text-med-navy uppercase tracking-wider">Education & Credentials</h4>
            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-med-blue/80 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-med-gray block">Degree</span>
                <span className="text-sm font-semibold text-med-navy">{doctor.degree}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-med-blue/80 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-med-gray block">Medical College / University</span>
                <span className="text-sm font-semibold text-med-navy">{doctor.college}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-med-blue bg-med-light-blue rounded">
                License: {doctor.licenseNumber}
              </span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="py-4 space-y-3">
            <h4 className="text-xs font-bold text-med-navy uppercase tracking-wider">Contact Information</h4>
            <div className="flex items-center gap-3 text-xs text-med-navy">
              <Mail className="w-4 h-4 text-med-gray" />
              <span>{doctor.email}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-med-navy">
              <Phone className="w-4 h-4 text-med-gray" />
              <span>{doctor.phone}</span>
            </div>
            <div className="flex items-start gap-3 text-xs text-med-navy">
              <MapPin className="w-4 h-4 text-med-gray mt-0.5 flex-shrink-0" />
              <span>{doctor.address}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full text-center py-2 px-4 text-sm font-semibold text-white bg-med-blue hover:bg-med-blue-hover rounded-lg transition-all duration-200"
            >
              Close Preview
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
