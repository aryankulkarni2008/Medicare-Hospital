import React, { useState, useEffect } from 'react';
import AdminPatientTable from '../../components/admin/AdminPatientTable';
import { Search, Users, Loader } from 'lucide-react';

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const adminUserStr = localStorage.getItem('medicare_admin_user');
        const adminUser = adminUserStr ? JSON.parse(adminUserStr) : null;
        const token = adminUser?.token;

        const headers = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        if (adminUser?.email) headers['x-admin-email'] = adminUser.email;

        const response = await fetch('http://localhost:5000/api/patients', { headers });

        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }

        const data = await response.json();
        
        const mappedPatients = data.map(p => ({
          id: p._id,
          name: p.fullName || 'Not provided',
          email: p.email || 'Not provided',
          phone: p.phone || 'Not provided',
          dob: p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString() : 'Not provided',
          gender: p.gender || 'Not provided',
          regDate: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'Not provided',
          status: 'Active', // Based on existing logic, assume active for now
          photo: "https://ui-avatars.com/api/?name=" + encodeURIComponent(p.fullName || 'Unknown') + "&background=random",
        }));

        setPatients(mappedPatients);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Unable to load patients');
        setLoading(false);
      }
    };

    fetchPatients();
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-med-blue">
          <Loader className="w-8 h-8 animate-spin" />
          <p className="text-sm font-semibold text-med-navy">Loading patients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-center">
        <p className="font-semibold">{error}</p>
      </div>
    );
  }

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
