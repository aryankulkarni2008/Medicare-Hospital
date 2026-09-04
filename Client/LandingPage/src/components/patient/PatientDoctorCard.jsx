import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Clock, MapPin, Calendar } from 'lucide-react';
import DoctorAvatar from '../common/DoctorAvatar';

export default function PatientDoctorCard({ doctor }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-[#D9E6EC] p-5 shadow-xs hover:shadow-md hover:border-[#2490C9]/50 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start space-x-4 mb-4">
          <DoctorAvatar 
            name={doctor.name}
            photo={doctor.photo} 
            className="w-16 h-16 rounded-xl object-cover border border-[#D9E6EC] shrink-0"
          />
          <div className="flex-1 min-w-0">
            <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-[#E6F4FA] text-[#2490C9] rounded-md mb-1">
              {doctor.availability}
            </span>
            <h3 className="font-bold text-[#102A43] text-base truncate">{doctor.name}</h3>
            <p className="text-xs font-semibold text-[#2490C9]">{doctor.specialty}</p>
            <p className="text-xs text-[#64748B] truncate">{doctor.department}</p>
          </div>
        </div>

        <div className="space-y-2 py-3 border-t border-[#D9E6EC]/60 text-xs text-[#64748B] mb-4">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-[#2490C9]" />
            <span>{doctor.experience} Experience</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#2490C9]" />
            <span className="truncate">{doctor.workingHours}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-[#2490C9]" />
            <span className="truncate">{doctor.location}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => navigate(`/patient/doctor/${doctor.id}`)}
          className="flex-1 px-4 py-2.5 text-xs font-semibold text-[#2490C9] bg-[#E6F4FA] rounded-lg hover:bg-[#2490C9] hover:text-white transition-colors"
        >
          View Profile
        </button>
        <button
          onClick={() => navigate(`/patient/book-appointment/${doctor.id}`)}
          className="flex-1 px-4 py-2.5 text-xs font-semibold text-white bg-[#2490C9] rounded-lg hover:bg-[#126B9E] transition-colors flex items-center justify-center space-x-1"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Now</span>
        </button>
      </div>
    </div>
  );
}