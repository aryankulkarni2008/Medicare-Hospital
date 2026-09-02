export const initialAdminProfile = {
  name: "Dr. Alexander Pierce",
  email: "alex.pierce@medicare.com",
  role: "Hospital Administrator",
  employeeId: "ADM-2026-089",
  photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
};

export const initialHospitalInfo = {
  name: "MediCare Hospital",
  email: "contact@medicarehospital.com",
  phone: "+1 (555) 900-1200",
  address: "742 Evergreen Terrace, Medical District, Springfield",
  workingHours: "24/7 (Emergency) | Outpatient: 8:00 AM - 8:00 PM",
  emergencyContact: "+1 (555) 911-9999"
};

export const initialDoctors = [
  {
    id: "doc1",
    name: "Dr. Sarah Connor",
    email: "sarah.connor@medicare.com",
    phone: "+1 (555) 123-4567",
    age: 42,
    gender: "Female",
    address: "123 Medical Plaza, Suite 400, Boston, MA",
    specialty: "Cardiology",
    department: "Cardiovascular Medicine",
    experience: 14,
    fee: 150,
    degree: "MD, DM in Cardiology",
    college: "Johns Hopkins School of Medicine",
    licenseNumber: "LIC-98231-US",
    previousClinic: "Boston General Hospital",
    about: "Dr. Sarah Connor is a senior specialist in non-invasive cardiology and interventional cardiology with over 14 years of clinical experience.",
    status: "Active",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "doc2",
    name: "Dr. Robert Chen",
    email: "robert.chen@medicare.com",
    phone: "+1 (555) 234-5678",
    age: 39,
    gender: "Male",
    address: "456 Oak Avenue, San Francisco, CA",
    specialty: "Neurology",
    department: "Neurological Sciences",
    experience: 11,
    fee: 180,
    degree: "MD, Ph.D. in Neuroscience",
    college: "Harvard Medical School",
    licenseNumber: "LIC-12093-US",
    previousClinic: "Stanford Health Care",
    about: "Dr. Robert Chen specializes in neuro-oncology, electroencephalography, and treatments for stroke and epilepsy.",
    status: "Active",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "doc3",
    name: "Dr. Emily Blunt",
    email: "emily.blunt@medicare.com",
    phone: "+1 (555) 345-6789",
    age: 36,
    gender: "Female",
    address: "789 Pine Road, Seattle, WA",
    specialty: "Pediatrics",
    department: "Pediatric Medicine",
    experience: 8,
    fee: 120,
    degree: "MD, DCH (Pediatrics)",
    college: "Yale School of Medicine",
    licenseNumber: "LIC-74839-US",
    previousClinic: "Seattle Children's Hospital",
    about: "Dr. Emily Blunt is dedicated to child healthcare, offering specialized treatment in developmental disorders and general pediatric health.",
    status: "Active",
    photo: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "doc4",
    name: "Dr. Gregory House",
    email: "greg.house@medicare.com",
    phone: "+1 (555) 456-7890",
    age: 55,
    gender: "Male",
    address: "Baker Street Apt, Princeton, NJ",
    specialty: "Orthopedics",
    department: "Orthopedic Surgery",
    experience: 25,
    fee: 250,
    degree: "MD in Orthopedics & Diagnostic Medicine",
    college: "University of Michigan Medical School",
    licenseNumber: "LIC-00747-US",
    previousClinic: "Princeton-Plainsboro Teaching Hospital",
    about: "Dr. Gregory House is a world-renowned diagnostician and orthopedic specialist dealing with complex bone pathology and reconstructive surgeries.",
    status: "Inactive",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300"
  }
];

export const initialDoctorRequests = [
  {
    id: "req1",
    name: "Dr. John Watson",
    email: "john.watson@gmail.com",
    phone: "+1 (555) 987-6543",
    age: 38,
    gender: "Male",
    address: "221B Baker St, London, UK",
    specialty: "Neurology",
    experience: 9,
    degree: "MBBS, MD in Neurology",
    college: "University of Oxford Medical School",
    licenseNumber: "LIC-77341-UK",
    preferredDepartment: "Neurological Sciences",
    previousClinic: "St. Bart's Hospital",
    status: "Pending",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "req2",
    name: "Dr. Lisa Cuddy",
    email: "lisa.cuddy@gmail.com",
    phone: "+1 (555) 876-5432",
    age: 44,
    gender: "Female",
    address: "10 Main Street, Princeton, NJ",
    specialty: "Cardiology",
    experience: 15,
    degree: "MD, Fellow of the College of Physicians",
    college: "Columbia University Medical Center",
    licenseNumber: "LIC-55442-US",
    preferredDepartment: "Cardiovascular Medicine",
    previousClinic: "Princeton Medical Center",
    status: "Pending",
    photo: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=300"
  }
];



export const initialAppointments = [
  {
    id: "apt1",
    doctorId: "doc1",
    patientId: "pat1",
    date: "2026-08-25",
    time: "09:30 AM",
    reason: "Hypertension check-up and prescription refill",
    status: "Completed"
  },
  {
    id: "apt2",
    doctorId: "doc1",
    patientId: "pat2",
    date: "2026-08-25",
    time: "11:00 AM",
    reason: "Atypical chest discomfort diagnostics",
    status: "Confirmed"
  },
  {
    id: "apt3",
    doctorId: "doc2",
    patientId: "pat3",
    date: "2026-08-25",
    time: "02:00 PM",
    reason: "Neurological follow-up regarding chronic migraines",
    status: "Confirmed"
  },
  {
    id: "apt4",
    doctorId: "doc3",
    patientId: "pat2",
    date: "2026-08-24",
    time: "10:00 AM",
    reason: "General child physical checkup",
    status: "Completed"
  },
  {
    id: "apt5",
    doctorId: "doc4",
    patientId: "pat1",
    date: "2026-08-26",
    time: "04:30 PM",
    reason: "Orthopedic review of knee meniscus tear",
    status: "Confirmed"
  },
  {
    id: "apt6",
    doctorId: "doc3",
    patientId: "pat4",
    date: "2026-08-20",
    time: "01:00 PM",
    reason: "Minor pediatric consultation",
    status: "Cancelled"
  }
];

export const initialNotifications = [
  {
    id: "notif1",
    type: "doctor_request",
    title: "New Registration Request",
    message: "Dr. John Watson submitted a registration request for Neurology specialty.",
    timestamp: "10 mins ago",
    isRead: false,
    relatedDoctorId: "req1"
  },
  {
    id: "notif2",
    type: "doctor_request",
    title: "New Registration Request",
    message: "Dr. Lisa Cuddy submitted a registration request for Cardiology specialty.",
    timestamp: "1 hour ago",
    isRead: false,
    relatedDoctorId: "req2"
  },
  {
    id: "notif3",
    type: "appointment_update",
    title: "Appointment Cancelled",
    message: "Patient generic cancelled appointment with Dr. Emily Blunt.",
    timestamp: "Yesterday",
    isRead: true,
    relatedAppointmentId: "apt6"
  },
  {
    id: "notif4",
    type: "patient_registration",
    title: "New Patient Registered",
    message: "Patient generic successfully registered at MediCare.",
    timestamp: "3 days ago",
    isRead: true,
    relatedPatientId: "pat4"
  }
];

export const initialActivities = [
  {
    id: "act1",
    type: "doctor_request",
    title: "New Request Received",
    message: "Dr. John Watson requested to join as a Neurologist.",
    timestamp: "10 mins ago"
  },
  {
    id: "act2",
    type: "doctor_request",
    title: "New Request Received",
    message: "Dr. Lisa Cuddy requested to join as a Cardiologist.",
    timestamp: "1 hour ago"
  },
  {
    id: "act3",
    type: "appointment_completed",
    title: "Appointment Completed",
    message: "Dr. Sarah Connor completed appointment.",
    timestamp: "Today, 10:15 AM"
  },
  {
    id: "act4",
    type: "patient_registered",
    title: "Patient Registered",
    message: "New patient registered.",
    timestamp: "May 10, 2025"
  }
];
