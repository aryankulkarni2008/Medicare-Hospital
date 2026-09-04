import React, { useState } from 'react';
import PatientProfileSummary from '../../components/patient/PatientProfileSummary';
import PatientAppointmentDetailsModal from '../../components/patient/PatientAppointmentDetailsModal';
import { FileText, ShieldAlert, PhoneCall, Droplets, Calendar } from 'lucide-react';

export default function PatientMedicalHistoryPage({ patient, appointments }) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const pastAppointments = appointments.filter((a) => a.status === 'Completed');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#102A43]">Medical History</h1>
        <p className="text-xs text-[#64748B]">View your past appointments, consultations, and medical records.</p>
      </div>

      {/* Patient Profile Summary */}
      <PatientProfileSummary patient={patient} />

      {/* Grid for Medical Data & Past Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Past Consultations (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs">
            <h2 className="text-base font-bold text-[#102A43] mb-4 pb-2 border-b border-[#D9E6EC] flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-[#2490C9]" />
              <span>Past Consultations & Records</span>
            </h2>

            {pastAppointments.length > 0 ? (
              <div className="space-y-3">
                {pastAppointments.map((apt) => (
                  <div key={apt.id} className="p-4 rounded-xl border border-[#D9E6EC] bg-[#F4F9FC]/50 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-[#102A43]">{apt.doctorName}</h3>
                      <p className="text-xs font-semibold text-[#2490C9]">{apt.specialty}</p>
                      <p className="text-[11px] text-[#64748B]">{apt.date} • {apt.time}</p>
                    </div>

                    <button
                      onClick={() => setSelectedAppointment(apt)}
                      className="px-3 py-1.5 text-xs font-semibold text-[#2490C9] bg-white border border-[#D9E6EC] rounded-lg hover:bg-[#2490C9] hover:text-white transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#64748B] py-4 text-center">No completed consultations recorded.</p>
            )}
          </div>
        </div>

        {/* Side Medical Vitals */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#102A43] pb-2 border-b border-[#D9E6EC]">Medical Information</h2>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#E6F4FA] rounded-lg border border-[#2490C9]/30 flex items-center justify-between">
                <span className="font-semibold text-[#102A43] flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-[#2490C9]" />
                  <span>Blood Group</span>
                </span>
                <span className="font-bold text-[#2490C9]">{patient.bloodGroup}</span>
              </div>

              <div className="p-3 bg-red-50 rounded-lg border border-red-200 space-y-1">
                <span className="font-bold text-red-900 flex items-center space-x-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-600" />
                  <span>Known Allergies</span>
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {patient.allergies.map((allergy) => (
                    <span key={allergy} className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-semibold rounded">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-[#D9E6EC] space-y-1">
                <span className="font-bold text-[#102A43] flex items-center space-x-1.5">
                  <PhoneCall className="w-4 h-4 text-[#2490C9]" />
                  <span>Emergency Contact</span>
                </span>
                <p className="text-[#64748B]">{patient.emergencyContact}</p>
                <p className="font-bold text-[#102A43]">{patient.emergencyPhone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PatientAppointmentDetailsModal 
        appointment={selectedAppointment} 
        onClose={() => setSelectedAppointment(null)} 
      />
    </div>
  );
}