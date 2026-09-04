import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import DoctorAvatar from '../common/DoctorAvatar';

export default function AdminDoctorTable({ doctors = [], getDoctorAppointmentsCount }) {
  return (
    <div className="w-full overflow-x-auto bg-white border border-med-border rounded-xl shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-med-bg border-b border-med-border text-xs font-bold text-med-navy uppercase tracking-wider">
            <th className="py-4 px-6">Doctor</th>
            <th className="py-4 px-6">Specialty</th>
            <th className="py-4 px-6">Department</th>
            <th className="py-4 px-6">Experience</th>
            <th className="py-4 px-6">Consultation Fee</th>
            <th className="py-4 px-6">Appointments</th>
            <th className="py-4 px-6">Status</th>
            <th className="py-4 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-med-border text-sm text-med-navy">
          {doctors.length === 0 ? (
            <tr>
              <td colSpan="8" className="py-8 text-center text-med-gray font-medium">
                No doctors found matching filters.
              </td>
            </tr>
          ) : (
            doctors.map((doctor) => {
              const apptCount = getDoctorAppointmentsCount ? getDoctorAppointmentsCount(doctor.id) : { total: 0 };
              return (
                <tr key={doctor.id} className="hover:bg-med-bg/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <DoctorAvatar
                        name={doctor.name}
                        photo={doctor.photo}
                        className="w-10 h-10 rounded-full object-cover border border-med-border flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="font-semibold text-med-navy block leading-tight">{doctor.name}</span>
                        <span className="text-xs text-med-gray block">{doctor.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-med-blue">{doctor.specialty}</td>
                  <td className="py-4 px-6 text-med-gray text-xs">{doctor.department}</td>
                  <td className="py-4 px-6 text-med-navy">{doctor.experience} Years</td>
                  <td className="py-4 px-6 font-semibold">${doctor.fee}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-med-light-blue text-med-blue font-bold text-xs">
                      {apptCount.total}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      doctor.status === 'Active' 
                        ? 'bg-status-success/15 text-status-success' 
                        : 'bg-status-inactive/15 text-status-inactive'
                    }`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Link
                      to={`/admin/doctor/${doctor.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-med-blue border border-med-blue rounded-lg bg-white hover:bg-med-light-blue transition-all duration-200"
                    >
                      <span>View Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
