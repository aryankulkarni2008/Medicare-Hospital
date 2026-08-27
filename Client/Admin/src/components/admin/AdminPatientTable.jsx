import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

export default function AdminPatientTable({ patients = [] }) {
  return (
    <div className="w-full overflow-x-auto bg-white border border-med-border rounded-xl shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-med-bg border-b border-med-border text-xs font-bold text-med-navy uppercase tracking-wider">
            <th className="py-4 px-6">Patient</th>
            <th className="py-4 px-6">Contact Info</th>
            <th className="py-4 px-6">Date of Birth</th>
            <th className="py-4 px-6">Gender</th>
            <th className="py-4 px-6">Registration Date</th>
            <th className="py-4 px-6">Status</th>
            <th className="py-4 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-med-border text-sm text-med-navy">
          {patients.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-8 text-center text-med-gray font-medium">
                No patients found matching the search criteria.
              </td>
            </tr>
          ) : (
            patients.map((patient) => {
              return (
                <tr key={patient.id} className="hover:bg-med-bg/40 transition-colors">
                  {/* Photo & Name */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={patient.photo}
                        alt={patient.name}
                        className="w-10 h-10 rounded-full object-cover border border-med-border flex-shrink-0"
                      />
                      <span className="font-semibold text-med-navy block leading-tight">{patient.name}</span>
                    </div>
                  </td>
                  {/* Contact details */}
                  <td className="py-4 px-6">
                    <div className="text-xs">
                      <span className="block text-med-navy font-medium">{patient.email}</span>
                      <span className="block text-med-gray">{patient.phone}</span>
                    </div>
                  </td>
                  {/* DOB */}
                  <td className="py-4 px-6 text-med-gray text-xs">{patient.dob}</td>
                  {/* Gender */}
                  <td className="py-4 px-6 text-xs font-semibold text-med-navy">{patient.gender}</td>
                  {/* Registration Date */}
                  <td className="py-4 px-6 text-med-gray text-xs">{patient.regDate}</td>
                  {/* Status */}
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      patient.status === 'Active' 
                        ? 'bg-status-success/15 text-status-success' 
                        : 'bg-status-inactive/15 text-status-inactive'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="py-4 px-6 text-center">
                    <Link
                      to={`/admin/patient/${patient.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-med-blue border border-med-blue rounded-lg bg-white hover:bg-med-light-blue transition-all duration-200"
                    >
                      <span>View Details</span>
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
