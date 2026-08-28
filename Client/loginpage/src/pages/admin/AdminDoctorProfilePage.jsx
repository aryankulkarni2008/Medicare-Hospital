import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  DollarSign, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  XOctagon
} from 'lucide-react';

export default function AdminDoctorProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors, appointments } = useAdmin();

  // Find doctor by route parameter ID
  const doctor = doctors.find(d => d.id === id);

  if (!doctor) {
    return (
      <div className="bg-white border border-med-border rounded-xl p-8 text-center space-y-4 max-w-md mx-auto mt-12">
        <h3 className="text-lg font-bold text-med-navy">Doctor Not Found</h3>
        <p className="text-xs text-med-gray font-medium">The doctor profile you are trying to view does not exist or has been removed.</p>
        <Link 
          to="/admin/doctors"
          className="inline-block py-2 px-4 text-xs font-semibold text-white bg-med-blue hover:bg-med-blue-hover rounded-lg transition-colors"
        >
          Back to Doctors List
        </Link>
      </div>
    );
  }

  // Calculate appointment metrics dynamically from appointments state
  const doctorAppts = appointments.filter(a => a.doctorId === doctor.id);
  const totalAppts = doctorAppts.length;
  const completedAppts = doctorAppts.filter(a => a.status === 'Completed').length;
  const upcomingAppts = doctorAppts.filter(a => a.status === 'Confirmed' || a.status === 'Pending').length;
  const cancelledAppts = doctorAppts.filter(a => a.status === 'Cancelled').length;

  return (
    <div className="space-y-6">
      
      {/* Back link & Navigation header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/doctors')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-med-blue hover:text-med-blue-hover"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Doctors</span>
        </button>
      </div>

      {/* Main Profile Header Banner */}
      <div className="bg-white border border-med-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
        <img 
          src={doctor.photo} 
          alt={doctor.name} 
          className="w-24 h-24 rounded-full object-cover border-4 border-med-light-blue shadow-sm flex-shrink-0"
        />
        
        <div className="space-y-2 min-w-0 flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
            <h1 className="text-2xl font-bold text-med-navy leading-tight">{doctor.name}</h1>
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold w-fit mx-auto md:mx-0 ${
              doctor.status === 'Active' 
                ? 'bg-status-success/15 text-status-success' 
                : 'bg-status-inactive/15 text-status-inactive'
            }`}>
              {doctor.status}
            </span>
          </div>
          
          <h3 className="text-sm font-semibold text-med-blue">{doctor.specialty}</h3>
          <p className="text-xs text-med-gray font-bold uppercase tracking-wider">{doctor.department}</p>
          
          <p className="text-xs text-med-gray leading-relaxed font-medium max-w-2xl pt-2">
            {doctor.about}
          </p>
        </div>
      </div>

      {/* Appointment Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Stat 1: Total Appointments */}
        <div className="bg-white border border-med-border rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-med-light-blue text-med-blue flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-med-gray font-bold uppercase block tracking-wider">Total</span>
            <h4 className="text-lg font-bold text-med-navy">{totalAppts}</h4>
          </div>
        </div>

        {/* Stat 2: Completed Appointments */}
        <div className="bg-white border border-med-border rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 text-status-success flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-med-gray font-bold uppercase block tracking-wider">Completed</span>
            <h4 className="text-lg font-bold text-med-navy">{completedAppts}</h4>
          </div>
        </div>

        {/* Stat 3: Upcoming Appointments */}
        <div className="bg-white border border-med-border rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-med-blue flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-med-gray font-bold uppercase block tracking-wider">Upcoming</span>
            <h4 className="text-lg font-bold text-med-navy">{upcomingAppts}</h4>
          </div>
        </div>

        {/* Stat 4: Cancelled Appointments */}
        <div className="bg-white border border-med-border rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-50 text-status-rejected flex items-center justify-center flex-shrink-0">
            <XOctagon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-med-gray font-bold uppercase block tracking-wider">Cancelled</span>
            <h4 className="text-lg font-bold text-med-navy">{cancelledAppts}</h4>
          </div>
        </div>

      </div>

      {/* Profile Details Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Personal and Professional Specs */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Card 1: Personal Profile details */}
          <div className="bg-white border border-med-border rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-med-navy uppercase tracking-wider pb-3 border-b border-med-border">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs font-semibold text-med-navy">
              <div>
                <span className="text-[10px] text-med-gray block font-bold mb-0.5">Full Name</span>
                <span>{doctor.name}</span>
              </div>
              <div>
                <span className="text-[10px] text-med-gray block font-bold mb-0.5">Gender / Age</span>
                <span>{doctor.gender} ({doctor.age} years)</span>
              </div>
              <div>
                <span className="text-[10px] text-med-gray block font-bold mb-0.5">Email Address</span>
                <span className="text-med-blue flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-med-gray" />
                  {doctor.email}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-med-gray block font-bold mb-0.5">Phone Number</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-med-gray" />
                  {doctor.phone}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[10px] text-med-gray block font-bold mb-0.5">Office / Clinic Address</span>
                <span className="flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-med-gray mt-0.5 flex-shrink-0" />
                  {doctor.address}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Professional and Credentials */}
          <div className="bg-white border border-med-border rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-med-navy uppercase tracking-wider pb-3 border-b border-med-border">
              Professional Qualifications & Credentials
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs font-semibold text-med-navy">
              <div>
                <span className="text-[10px] text-med-gray block font-bold mb-0.5">Specialization</span>
                <span className="text-med-blue">{doctor.specialty}</span>
              </div>
              <div>
                <span className="text-[10px] text-med-gray block font-bold mb-0.5">Department Assignment</span>
                <span>{doctor.department}</span>
              </div>
              <div>
                <span className="text-[10px] text-med-gray block font-bold mb-0.5">Years of Experience</span>
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-med-blue/60" />
                  {doctor.experience} Years Active
                </span>
              </div>
              <div>
                <span className="text-[10px] text-med-gray block font-bold mb-0.5">Consultation Fee</span>
                <span className="flex items-center gap-1 font-bold text-sm">
                  <DollarSign className="w-4 h-4 text-status-success" />
                  {doctor.fee} USD
                </span>
              </div>
              <div>
                <span className="text-[10px] text-med-gray block font-bold mb-0.5">Medical License / Registration</span>
                <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-med-blue bg-med-light-blue rounded border border-med-blue/10">
                  {doctor.licenseNumber}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-med-gray block font-bold mb-0.5">Degree / Fellowship</span>
                <span>{doctor.degree}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[10px] text-med-gray block font-bold mb-0.5">Medical College / University</span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-med-gray" />
                  {doctor.college}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Academics & Practice History */}
        <div className="space-y-6">
          
          {/* Card 3: Experience History */}
          <div className="bg-white border border-med-border rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-med-navy uppercase tracking-wider pb-3 border-b border-med-border">
              Work History
            </h3>
            
            <div className="space-y-3 font-semibold text-xs text-med-navy">
              <div className="flex gap-2 items-start">
                <Briefcase className="w-4 h-4 text-med-gray mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-med-gray block font-bold">Previous Affiliation</span>
                  <span>{doctor.previousClinic}</span>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <ShieldCheck className="w-4 h-4 text-status-success mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-med-gray block font-bold">Status Verification</span>
                  <span className="text-status-success">Fully Verified Practitioner</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Quick Notes / Reminders */}
          <div className="bg-med-light-blue/20 border border-med-blue/20 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-med-blue uppercase tracking-wider">Administrator Note</h4>
            <p className="text-[11px] text-med-gray leading-relaxed font-semibold">
              This doctor profile card holds verification parameters directly linked from medical associations. Any updates to consultation fees can be requested through setting parameters.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
