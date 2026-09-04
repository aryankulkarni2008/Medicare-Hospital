import React, { useState } from 'react';
import PatientDoctorFilter from '../../components/patient/PatientDoctorFilter';
import PatientDoctorCard from '../../components/patient/PatientDoctorCard';
import { UserCheck } from 'lucide-react';

export default function PatientFindDoctorPage({ doctors }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');

  // Generate specialties dynamically from doctors data
  const uniqueSpecialties = Array.from(
    new Set(doctors.filter(d => d.specialty).map(d => d.specialty))
  ).sort();
  
  const specialties = ['All Specialties', ...uniqueSpecialties];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || doc.specialty === selectedSpecialty;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      doc.name.toLowerCase().includes(query) ||
      doc.specialty.toLowerCase().includes(query) ||
      doc.department.toLowerCase().includes(query);

    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#102A43]">Find Your Doctor</h1>
        <p className="text-xs text-[#64748B]">Search and book appointments with our top hospital specialists.</p>
      </div>

      {/* Filter Bar */}
      <PatientDoctorFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSpecialty={selectedSpecialty}
        setSelectedSpecialty={setSelectedSpecialty}
        specialties={specialties}
      />

      {/* Doctors Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDoctors.map((doc) => (
            <PatientDoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#D9E6EC] p-12 text-center text-[#64748B]">
          <UserCheck className="w-12 h-12 text-[#2490C9]/40 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#102A43]">No Doctors Found</h3>
          <p className="text-xs mt-1">Try searching for a different name or selecting another specialty.</p>
        </div>
      )}
    </div>
  );
}