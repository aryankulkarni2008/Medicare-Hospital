import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { authService } from '../../services/authService';
import AdminAppointmentSummaryCard from '../../components/admin/AdminAppointmentSummaryCard';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  MapPin, 
  ClipboardCheck,
  CheckCircle,
  Clock,
  XCircle,
  HeartPulse
} from 'lucide-react';

export default function AdminPatientDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients, appointments, doctors } = useAdmin();

  const [directPatient, setDirectPatient] = React.useState(null);
  const [directAppts, setDirectAppts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // Find patient by route ID from context if available
  const contextPatient = patients.find(p => p.id === id);

  React.useEffect(() => {
    const loadDetails = async () => {
      if (!contextPatient) {
        setLoading(true);
        const p = await authService.getPatientById(id);
        if (p) {
          setDirectPatient({
            id: p._id,
            name: p.fullName || 'Not provided',
            email: p.email || 'Not provided',
            phone: p.phone || 'Not provided',
            dob: p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString() : 'Not provided',
            gender: p.gender ? (p.gender.charAt(0).toUpperCase() + p.gender.slice(1)) : 'Not provided',
            address: p.address || 'Not provided',
            regDate: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'Not provided',
            status: 'Active',
            photo: "https://ui-avatars.com/api/?name=" + encodeURIComponent(p.fullName || 'Patient') + "&background=random",
          });
        }
        setLoading(false);
      }

      // Also fetch patient-specific appointments from API
      const appts = await authService.getPatientAppointments(id);
      if (Array.isArray(appts) && appts.length > 0) {
        setDirectAppts(appts.map(a => ({
          id: a.appointmentId || a._id,
          patientId: String(a.patientId),
          doctorId: a.doctorId,
          doctorName: a.doctorName,
          specialty: a.specialty,
          department: a.department,
          date: a.date,
          time: a.time,
          status: a.status,
          hospital: a.hospital,
          reason: a.reason
        })));
      }
    };

    loadDetails();
  }, [id, contextPatient]);

  const patient = contextPatient || directPatient;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-med-blue">
          <div className="w-8 h-8 border-4 border-med-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-med-navy">Loading patient details...</p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="bg-white border border-med-border rounded-xl p-8 text-center space-y-4 max-w-md mx-auto mt-12">
        <h3 className="text-lg font-bold text-med-navy">Patient Not Found</h3>
        <p className="text-xs text-med-gray font-medium">The patient details you are trying to view do not exist or have been removed.</p>
        <Link 
          to="/admin/patients"
          className="inline-block py-2 px-4 text-xs font-semibold text-white bg-med-blue hover:bg-med-blue-hover rounded-lg transition-colors"
        >
          Back to Patients List
        </Link>
      </div>
    );
  }

  // Combine appointments from context and direct API fetch
  const contextAppts = appointments.filter(a => String(a.patientId) === String(patient.id) || a.patientId === patient.id);
  const patientAppts = directAppts.length > 0 ? directAppts : contextAppts;

  // Calculate metrics
  const totalCount = patientAppts.length;
  const completedCount = patientAppts.filter(a => a.status === 'Completed').length;
  const upcomingCount = patientAppts.filter(a => a.status === 'Confirmed' || a.status === 'Pending').length;
  const cancelledCount = patientAppts.filter(a => a.status === 'Cancelled' || a.status === 'Rejected').length;

  return (
    <div className="space-y-6">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/admin/patients')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-med-blue hover:text-med-blue-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Patients</span>
        </button>
      </div>

      {/* Patient Profile Header Banner */}
      <div className="bg-white border border-med-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
        <img 
          src={patient.photo} 
          alt={patient.name} 
          className="w-20 h-20 rounded-full object-cover border-2 border-med-light-blue shadow-sm flex-shrink-0"
        />
        
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
            <h1 className="text-2xl font-bold text-med-navy leading-tight">{patient.name}</h1>
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit mx-auto md:mx-0 ${
              patient.status === 'Active' 
                ? 'bg-status-success/15 text-status-success' 
                : 'bg-status-inactive/15 text-status-inactive'
            }`}>
              {patient.status}
            </span>
          </div>
          <p className="text-xs text-med-gray font-semibold">Patient ID: <strong className="text-med-navy">{patient.id}</strong></p>
          <p className="text-xs text-med-gray font-medium">Registered: {patient.regDate}</p>
        </div>
      </div>

      {/* Split layout: Personal details vs visit history */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Demographic and contact Info */}
        <div className="bg-white border border-med-border rounded-xl p-6 shadow-sm space-y-5 h-fit">
          <h3 className="text-sm font-bold text-med-navy uppercase tracking-wider pb-3 border-b border-med-border">
            Patient Personal Information
          </h3>

          <div className="space-y-4 text-xs font-semibold text-med-navy">
            <div>
              <span className="text-[10px] text-med-gray block font-bold mb-0.5">Date of Birth</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-med-blue" />
                {patient.dob}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-med-gray block font-bold mb-0.5">Gender</span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-med-blue" />
                {patient.gender}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-med-gray block font-bold mb-0.5">Email Address</span>
              <span className="flex items-center gap-1.5 text-med-blue">
                <Mail className="w-4 h-4 text-med-gray" />
                {patient.email}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-med-gray block font-bold mb-0.5">Phone Number</span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-med-gray" />
                {patient.phone}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-med-gray block font-bold mb-0.5">Address</span>
              <span className="flex items-start gap-1.5 leading-relaxed">
                <MapPin className="w-4 h-4 text-med-gray mt-0.5 flex-shrink-0" />
                {patient.address}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Appointment stats & full list */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* Metric 1 */}
            <div className="bg-white border border-med-border rounded-xl p-4 shadow-sm text-center sm:text-left flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-med-light-blue text-med-blue flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] text-med-gray font-bold uppercase tracking-wider block">Total</span>
                <h4 className="text-lg font-bold text-med-navy">{totalCount}</h4>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white border border-med-border rounded-xl p-4 shadow-sm text-center sm:text-left flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-green-50 text-status-success flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] text-med-gray font-bold uppercase tracking-wider block">Completed</span>
                <h4 className="text-lg font-bold text-med-navy">{completedCount}</h4>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white border border-med-border rounded-xl p-4 shadow-sm text-center sm:text-left flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-med-blue flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] text-med-gray font-bold uppercase tracking-wider block">Upcoming</span>
                <h4 className="text-lg font-bold text-med-navy">{upcomingCount}</h4>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-white border border-med-border rounded-xl p-4 shadow-sm text-center sm:text-left flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-status-rejected flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] text-med-gray font-bold uppercase tracking-wider block">Cancelled</span>
                <h4 className="text-lg font-bold text-med-navy">{cancelledCount}</h4>
              </div>
            </div>

          </div>

          {/* Visits Timeline / Appointments List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-med-navy flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-med-blue" />
              <span>Hospital Visit & Consultation History</span>
            </h3>

            {patientAppts.length === 0 ? (
              <div className="bg-white border border-med-border rounded-xl p-8 text-center text-med-gray font-medium text-xs">
                No appointment history records found for this patient.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patientAppts.map((appt) => {
                  // Find doctor details dynamically using doctorId from existing Doctor collection/model
                  const doc = doctors.find(d => d.id === appt.doctorId || d.doctorId === appt.doctorId);
                  return (
                    <AdminAppointmentSummaryCard
                      key={appt.id}
                      appointment={appt}
                      doctorName={doc ? doc.name : (appt.doctorName || 'Doctor')}
                      specialty={doc ? doc.specialty : (appt.specialty || 'Consultation')}
                      department={doc ? doc.department : (appt.department || '')}
                    />
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
