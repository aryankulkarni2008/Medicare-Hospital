import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import AdminDoctorTable from '../../components/admin/AdminDoctorTable';
import AdminDoctorCard from '../../components/admin/AdminDoctorCard';
import { Search, Filter, Stethoscope } from 'lucide-react';

export default function AdminDoctorsPage() {
  const { doctors, appointments } = useAdmin();
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Derive unique Departments & Specialties for dropdowns
  const uniqueDepts = ['All', ...new Set(doctors.map(d => d.department))];
  const uniqueSpecialties = ['All', ...new Set(doctors.map(d => d.specialty))];

  // Helper to fetch appointment summary stats for each doctor
  const getDoctorAppointmentsCount = (doctorId) => {
    const docAppts = appointments.filter(a => a.doctorId === doctorId);
    return {
      total: docAppts.length,
      completed: docAppts.filter(a => a.status === 'Completed').length,
      upcoming: docAppts.filter(a => a.status === 'Confirmed' || a.status === 'Pending').length
    };
  };

  // Filter Logic
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === 'All' || doctor.department === selectedDept;
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    const matchesStatus = selectedStatus === 'All' || doctor.status === selectedStatus;

    return matchesSearch && matchesDept && matchesSpecialty && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-med-navy flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-med-blue" />
            <span>Manage Doctors</span>
          </h1>
          <p className="text-xs text-med-gray font-medium mt-1">
            View and manage all doctors currently associated with MediCare Hospital.
          </p>
        </div>
      </div>

      {/* Search and Filters panel */}
      <div className="bg-white border border-med-border rounded-xl p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Search bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-med-gray/60">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search by doctor name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-9 pr-4 text-xs text-med-navy placeholder-med-gray/60 bg-med-bg border border-med-border rounded-lg outline-none focus:border-med-blue focus:bg-white transition-all duration-200"
            />
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-med-gray flex-shrink-0" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full py-2 px-3 text-xs text-med-navy bg-med-bg border border-med-border rounded-lg outline-none focus:border-med-blue focus:bg-white transition-all duration-200 cursor-pointer"
            >
              <option value="All">All Departments</option>
              {uniqueDepts.filter(d => d !== 'All').map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Specialty Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-med-gray flex-shrink-0" />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full py-2 px-3 text-xs text-med-navy bg-med-bg border border-med-border rounded-lg outline-none focus:border-med-blue focus:bg-white transition-all duration-200 cursor-pointer"
            >
              <option value="All">All Specialties</option>
              {uniqueSpecialties.filter(s => s !== 'All').map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-med-gray flex-shrink-0" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-3 text-xs text-med-navy bg-med-bg border border-med-border rounded-lg outline-none focus:border-med-blue focus:bg-white transition-all duration-200 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

        </div>
      </div>

      {/* Render Desktop table view (hidden on mobile/tablet) */}
      <div className="hidden lg:block">
        <AdminDoctorTable 
          doctors={filteredDoctors} 
          getDoctorAppointmentsCount={getDoctorAppointmentsCount} 
        />
      </div>

      {/* Render Cards Grid view on mobile/tablet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-5">
        {filteredDoctors.length === 0 ? (
          <div className="col-span-full py-8 text-center text-med-gray font-medium">
            No doctors found matching filters.
          </div>
        ) : (
          filteredDoctors.map(doctor => (
            <AdminDoctorCard 
              key={doctor.id} 
              doctor={doctor} 
              appointmentsCount={getDoctorAppointmentsCount(doctor.id)}
            />
          ))
        )}
      </div>

    </div>
  );
}
