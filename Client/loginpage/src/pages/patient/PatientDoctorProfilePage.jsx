import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Award, 
  Clock, 
  MapPin, 
  Building, 
  Globe, 
  CheckCircle, 
  Calendar 
} from 'lucide-react';

export default function PatientDoctorProfilePage({ doctors }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = doctors.find((d) => d.id === id) || doctors[0];

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <button 
        onClick={() => navigate('/patient/find-doctor')}
        className="flex items-center space-x-2 text-xs font-semibold text-[#2490C9] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Find Doctors</span>
      </button>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <img 
          src={doctor.photo} 
          alt={doctor.name} 
          className="w-28 h-28 rounded-xl object-cover border border-[#D9E6EC] shrink-0"
        />
        <div className="flex-1">
          <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-[#E6F4FA] text-[#2490C9] rounded-md mb-2">
            {doctor.availability}
          </span>
          <h1 className="text-2xl font-bold text-[#102A43]">{doctor.name}</h1>
          <p className="text-sm font-semibold text-[#2490C9]">{doctor.specialty}</p>
          <p className="text-xs text-[#64748B] mt-0.5">{doctor.department}</p>
          
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-[#64748B]">
            <span className="flex items-center space-x-1">
              <Award className="w-4 h-4 text-[#2490C9]" />
              <span>{doctor.experience} Experience</span>
            </span>
            <span className="flex items-center space-x-1">
              <Building className="w-4 h-4 text-[#2490C9]" />
              <span>{doctor.hospital}</span>
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/patient/book-appointment/${doctor.id}`)}
          className="w-full md:w-auto px-6 py-3 text-sm font-bold text-white bg-[#2490C9] rounded-xl hover:bg-[#126B9E] transition-colors flex items-center justify-center space-x-2 shadow-xs"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Detailed Info Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs">
            <h2 className="text-base font-bold text-[#102A43] mb-3 pb-2 border-b border-[#D9E6EC]">About Doctor</h2>
            <p className="text-xs text-[#64748B] leading-relaxed">{doctor.about}</p>
          </div>

          {/* Qualifications & Languages */}
          <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#102A43] mb-2">Qualifications</h3>
              <p className="text-xs text-[#64748B] bg-[#F4F9FC] p-3 rounded-lg border border-[#D9E6EC]">
                {doctor.qualifications}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#102A43] mb-2">Languages Spoken</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((lang) => (
                  <span key={lang} className="px-3 py-1 bg-[#E6F4FA] text-[#2490C9] text-xs font-semibold rounded-md">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Location & Hours */}
          <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#102A43] pb-2 border-b border-[#D9E6EC]">Clinic Information</h2>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#2490C9] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#102A43]">Location</p>
                  <p className="text-[#64748B]">{doctor.location}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-[#2490C9] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#102A43]">Working Hours</p>
                  <p className="text-[#64748B]">{doctor.workingHours}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs font-bold text-[#102A43] mb-2">Available Days</p>
              <div className="flex flex-wrap gap-1.5">
                {doctor.availableDays.map((day) => (
                  <span key={day} className="px-2 py-1 bg-slate-100 text-[#102A43] text-[11px] font-medium rounded-md">
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}