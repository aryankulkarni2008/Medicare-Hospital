import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  Clock,
  MapPin,
  Building,
  Calendar,
  CheckCircle,
  IndianRupee,
  RefreshCw,
} from 'lucide-react';
import { authService } from '../../services/authService';
import DoctorAvatar from '../../components/common/DoctorAvatar';

export default function PatientDoctorProfilePage({ doctors }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(
    doctors?.find((d) => d.id === id || d.doctorId === id) || null
  );
  const [availability, setAvailability] = useState(null);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(true);

  // Fetch Doctor details if not found in props
  useEffect(() => {
    const docId = id;
    if (!doctor) {
      authService.getDoctorById(docId).then((data) => {
        if (data) {
          setDoctor({
            id: data.doctorId || data._id,
            doctorId: data.doctorId,
            name: data.fullName,
            specialty: data.specialization,
            department: data.department,
            photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
            experience: `${data.yearsOfExperience} Years`,
            hospital: data.previousHospital || 'Medicare Hospital',
            location: data.address,
            qualifications: data.medicalDegree,
            languages: ['English', 'Hindi'],
            about: `Dr. ${data.fullName} is a distinguished specialist in ${data.department} with ${data.yearsOfExperience} years of clinical experience.`,
            consultationFee: '₹500',
          });
        }
      });
    }
  }, [id, doctor]);

  // Fetch Dynamic Doctor Availability from MongoDB
  useEffect(() => {
    const docId = doctor?.doctorId || doctor?.id || id;
    if (docId) {
      setIsLoadingAvailability(true);
      authService
        .getDoctorAvailability(docId)
        .then((data) => {
          setIsLoadingAvailability(false);
          setAvailability(data);
        })
        .catch((err) => {
          console.error('Error fetching doctor availability:', err);
          setIsLoadingAvailability(false);
        });
    }
  }, [doctor, id]);

  const currentDoctor = doctor || {
    id: id,
    doctorId: id,
    name: 'Doctor Profile',
    specialty: 'Specialist',
    department: 'General',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    experience: '10 Years',
    hospital: 'Medicare Hospital',
    location: 'Medicare Medical Wing',
    qualifications: 'MBBS, MD',
    languages: ['English', 'Hindi'],
    about: 'Senior hospital medical specialist.',
    consultationFee: '₹500',
  };

  // Derive available days dynamically from MongoDB schedule
  const availableDaysList =
    availability && availability.weeklySchedule
      ? availability.weeklySchedule
          .filter((d) => d.available && d.slots && d.slots.length > 0)
          .map((d) => d.day)
      : [];

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <button
        onClick={() => navigate('/patient/find-doctor')}
        className="flex items-center space-x-2 text-xs font-semibold text-[#2490C9] hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Find Doctors</span>
      </button>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <DoctorAvatar
          name={currentDoctor.name}
          photo={currentDoctor.photo}
          className="w-28 h-28 rounded-xl object-cover border border-[#D9E6EC] shrink-0"
        />
        <div className="flex-1">
          <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-[#E6F4FA] text-[#2490C9] rounded-md mb-2">
            {availableDaysList.length > 0
              ? `Available: ${availableDaysList.slice(0, 3).join(', ')}${availableDaysList.length > 3 ? '...' : ''}`
              : 'Consultation Available'}
          </span>
          <h1 className="text-2xl font-bold text-[#102A43]">{currentDoctor.name}</h1>
          <p className="text-sm font-semibold text-[#2490C9]">{currentDoctor.specialty}</p>
          <p className="text-xs text-[#64748B] mt-0.5">{currentDoctor.department}</p>

          <div className="flex flex-wrap gap-4 mt-3 text-xs text-[#64748B]">
            <span className="flex items-center space-x-1">
              <Award className="w-4 h-4 text-[#2490C9]" />
              <span>{currentDoctor.experience || '8+ Years'} Experience</span>
            </span>
            <span className="flex items-center space-x-1">
              <Building className="w-4 h-4 text-[#2490C9]" />
              <span>{currentDoctor.hospital}</span>
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/patient/book-appointment/${currentDoctor.doctorId || currentDoctor.id}`)}
          className="w-full md:w-auto px-6 py-3 text-sm font-bold text-white bg-[#2490C9] rounded-xl hover:bg-[#126B9E] transition-colors flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
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
            <h2 className="text-base font-bold text-[#102A43] mb-3 pb-2 border-b border-[#D9E6EC]">
              About Doctor
            </h2>
            <p className="text-xs text-[#64748B] leading-relaxed">{currentDoctor.about}</p>
          </div>

          {/* Qualifications & Languages */}
          <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#102A43] mb-2">
                Qualifications
              </h3>
              <p className="text-xs text-[#64748B] bg-[#F4F9FC] p-3 rounded-lg border border-[#D9E6EC]">
                {currentDoctor.qualifications || 'MBBS, MD'}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#102A43] mb-2">
                Languages Spoken
              </h3>
              <div className="flex flex-wrap gap-2">
                {(currentDoctor.languages || ['English', 'Hindi']).map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 bg-[#E6F4FA] text-[#2490C9] text-xs font-semibold rounded-md"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Dynamic Clinic Information Box */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#D9E6EC] p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#102A43] pb-2 border-b border-[#D9E6EC]">
              Clinic Information
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <p className="font-semibold text-[#102A43]">Department</p>
                <p className="text-[#64748B]">{currentDoctor.department}</p>
              </div>

              <div>
                <p className="font-semibold text-[#102A43]">Consultation Fee</p>
                <p className="text-[#10B981] font-bold">{currentDoctor.consultationFee || '₹500'}</p>
              </div>

              <div className="flex items-start space-x-3 pt-1">
                <MapPin className="w-4 h-4 text-[#2490C9] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#102A43]">Location</p>
                  <p className="text-[#64748B]">{currentDoctor.location}</p>
                </div>
              </div>
            </div>

            {/* Dynamic Available Days section */}
            <div className="pt-3 border-t border-[#D9E6EC]">
              <p className="text-xs font-bold text-[#102A43] mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#2490C9]" />
                <span>Available Days</span>
              </p>

              {isLoadingAvailability ? (
                <div className="flex items-center gap-2 text-xs text-[#64748B] py-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#2490C9]" />
                  <span>Loading availability...</span>
                </div>
              ) : availableDaysList.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {availableDaysList.map((day) => (
                    <span
                      key={day}
                      className="px-2.5 py-1 bg-[#E6F4FA] text-[#0369A1] text-[11px] font-semibold rounded-md border border-[#BAE6FD]"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#94A3B8] italic">Availability not set yet.</p>
              )}
            </div>

            <button
              onClick={() => navigate(`/patient/book-appointment/${currentDoctor.doctorId || currentDoctor.id}`)}
              className="w-full mt-2 py-2.5 text-xs font-bold text-white bg-[#2490C9] rounded-lg hover:bg-[#126B9E] transition-colors shadow-xs cursor-pointer"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}