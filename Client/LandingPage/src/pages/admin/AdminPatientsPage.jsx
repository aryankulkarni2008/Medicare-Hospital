import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import AdminPatientTable from '../../components/admin/AdminPatientTable';
import { Search, Users } from 'lucide-react';

export default function AdminPatientsPage() {
  const { patients, refreshPatients } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');

  React.useEffect(() => {
    if (refreshPatients) {
      refreshPatients();
    }
  }, []);

  // Filtering patients by Name, Email, Phone or ID
  const filteredPatients = patients.filter(patient => {
    const term = searchTerm.toLowerCase();
    return (
      patient.name.toLowerCase().includes(term) ||
      patient.email.toLowerCase().includes(term) ||
      patient.phone.includes(term) ||
      patient.id.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-med-navy flex items-center gap-2">
          <Users className="w-6 h-6 text-med-blue" />
          <span>Manage Patients</span>
        </h1>
        <p className="text-xs text-med-gray font-medium mt-1">
          View and manage all patients registered and receiving services at MediCare Hospital.
        </p>
      </div>

      {/* Search Input bar */}
      <div className="bg-white border border-med-border rounded-xl p-5 shadow-sm">
        <div className="relative max-w-md w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-med-gray/60">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search by name, email, phone or patient ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-9 pr-4 text-xs text-med-navy placeholder-med-gray/60 bg-med-bg border border-med-border rounded-lg outline-none focus:border-med-blue focus:bg-white transition-all duration-200"
          />
        </div>
      </div>

      {/* Patients Table */}
      <AdminPatientTable patients={filteredPatients} />

    </div>
  );
}
