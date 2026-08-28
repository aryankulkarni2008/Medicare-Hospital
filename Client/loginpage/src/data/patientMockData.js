export const initialPatient = {
  id: "P-10942",
  name: "Sarah Jenkins",
  email: "sarah.jenkins@example.com",
  phone: "+1 (555) 234-5678",
  dob: "1992-05-14",
  gender: "Female",
  bloodGroup: "O+",
  address: "742 Evergreen Terrace, Springfield",
  allergies: ["Penicillin", "Peanuts"],
  emergencyContact: "Mark Jenkins (Spouse)",
  emergencyPhone: "+1 (555) 876-5432",
  photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80"
};

export const initialDoctors = [
  {
    id: "DOC-101",
    name: "Dr. Rahul Sharma",
    specialty: "Cardiology",
    department: "Cardiovascular Sciences",
    experience: "12 Years",
    availability: "Available Today",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",
    about: "Dr. Rahul Sharma is a senior consultant cardiologist specializing in preventive cardiology, coronary artery disease management, and advanced cardiac failure therapy.",
    qualifications: "MD, DM (Cardiology), FACC",
    languages: ["English", "Hindi"],
    hospital: "MediCare Super Specialty Hospital",
    location: "Block B, 3rd Floor, Cardiology Wing",
    workingHours: "Mon - Sat: 09:00 AM - 04:00 PM",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    availableSlots: ["09:00 AM", "09:30 AM", "10:30 AM", "02:00 PM", "03:30 PM"]
  },
  {
    id: "DOC-102",
    name: "Dr. Priya Patel",
    specialty: "Orthopedics",
    department: "Orthopedics & Joint Replacement",
    experience: "9 Years",
    availability: "Next Available Tomorrow",
    photo: "https://images.unsplash.com/photo-1594824813566-88855ce78905?auto=format&fit=crop&w=300&q=80",
    about: "Dr. Priya Patel is an expert in arthroscopic joint surgeries, sports injuries restoration, and complex trauma reconstruction.",
    qualifications: "MS (Ortho), Fellowship in Joint Replacement",
    languages: ["English", "Gujarati", "Hindi"],
    hospital: "MediCare Super Specialty Hospital",
    location: "Block A, 1st Floor, Ortho Department",
    workingHours: "Mon - Fri: 10:00 AM - 05:00 PM",
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    availableSlots: ["10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"]
  },
  {
    id: "DOC-103",
    name: "Dr. Ananya Roy",
    specialty: "Neurology",
    department: "Neurological Sciences",
    experience: "15 Years",
    availability: "Available Today",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
    about: "Dr. Ananya Roy specializes in neuro-degenerative disorders, stroke rehabilitation, epilepsy treatment, and chronic migraine management.",
    qualifications: "MBBS, MD, DM (Neurology)",
    languages: ["English", "Bengali"],
    hospital: "MediCare Super Specialty Hospital",
    location: "Block C, 4th Floor, Neuro Wing",
    workingHours: "Mon - Sat: 08:30 AM - 02:30 PM",
    availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    availableSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "01:30 PM"]
  },
  {
    id: "DOC-104",
    name: "Dr. Aris Vance",
    specialty: "Dermatology",
    department: "Dermatology & Cosmetology",
    experience: "8 Years",
    availability: "Available Today",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80",
    about: "Dr. Aris Vance is a renowned dermatologist providing holistic care for skin ailments, clinical dermatology, laser treatments, and cosmetic skin surgery.",
    qualifications: "MD (Dermatology)",
    languages: ["English", "Spanish"],
    hospital: "MediCare Super Specialty Hospital",
    location: "Block D, 2nd Floor, Clinic 204",
    workingHours: "Tue - Sat: 11:00 AM - 06:00 PM",
    availableDays: ["Tuesday", "Thursday", "Friday", "Saturday"],
    availableSlots: ["11:30 AM", "02:00 PM", "03:00 PM", "04:30 PM", "05:15 PM"]
  },
  {
    id: "DOC-105",
    name: "Dr. Marcus Thorne",
    specialty: "Pediatrics",
    department: "Pediatrics & Child Health",
    experience: "11 Years",
    availability: "Next Available Tomorrow",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80",
    about: "Dr. Marcus Thorne provides comprehensive pediatric healthcare, neonatal ICU supervision, developmental monitoring, and childhood immunizations.",
    qualifications: "MD (Pediatrics), DCH",
    languages: ["English"],
    hospital: "MediCare Super Specialty Hospital",
    location: "Block A, Ground Floor, Pediatric Wing",
    workingHours: "Mon - Sat: 09:00 AM - 05:00 PM",
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
    availableSlots: ["09:30 AM", "11:00 AM", "02:30 PM", "03:30 PM"]
  },
  {
    id: "DOC-106",
    name: "Dr. Elena Rostova",
    specialty: "Gynecology",
    department: "Obstetrics & Gynecology",
    experience: "14 Years",
    availability: "Available Today",
    photo: "https://images.unsplash.com/photo-1594824813566-88855ce78905?auto=format&fit=crop&w=300&q=80",
    about: "Dr. Elena Rostova is a dedicated obstetrician and gynecologist experienced in high-risk pregnancy management, laparoscopic surgeries, and women's health wellness.",
    qualifications: "MS (Obs & Gynae), FRCOG",
    languages: ["English", "Russian"],
    hospital: "MediCare Super Specialty Hospital",
    location: "Block B, 2nd Floor, Women's Care Unit",
    workingHours: "Mon - Fri: 09:00 AM - 03:00 PM",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    availableSlots: ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM"]
  }
];

export const initialAppointments = [
  {
    id: "APT-8821",
    doctorId: "DOC-101",
    doctorName: "Dr. Rahul Sharma",
    specialty: "Cardiology",
    department: "Cardiovascular Sciences",
    doctorPhoto: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",
    date: "2026-08-26",
    time: "10:30 AM",
    hospital: "MediCare Super Specialty Hospital",
    status: "Confirmed",
    reason: "Routine quarterly cardiac checkup and blood pressure management review.",
    bookingDate: "2026-08-20",
    notes: "Patient is advised to bring recent ECG reports."
  },
  {
    id: "APT-8822",
    doctorId: "DOC-102",
    doctorName: "Dr. Priya Patel",
    specialty: "Orthopedics",
    department: "Orthopedics & Joint Replacement",
    doctorPhoto: "https://images.unsplash.com/photo-1594824813566-88855ce78905?auto=format&fit=crop&w=300&q=80",
    date: "2026-08-28",
    time: "02:30 PM",
    hospital: "MediCare Super Specialty Hospital",
    status: "Pending",
    reason: "Persistent left knee discomfort after jogging.",
    bookingDate: "2026-08-24",
    notes: "Awaiting clinic confirmation."
  },
  {
    id: "APT-8710",
    doctorId: "DOC-104",
    doctorName: "Dr. Aris Vance",
    specialty: "Dermatology",
    department: "Dermatology & Cosmetology",
    doctorPhoto: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80",
    date: "2026-08-15",
    time: "11:30 AM",
    hospital: "MediCare Super Specialty Hospital",
    status: "Completed",
    reason: "Annual skin screening and mole assessment.",
    bookingDate: "2026-08-01",
    notes: "Prescribed moisturizing lotion and topical cream. Follow up in 6 months."
  },
  {
    id: "APT-8650",
    doctorId: "DOC-103",
    doctorName: "Dr. Ananya Roy",
    specialty: "Neurology",
    department: "Neurological Sciences",
    doctorPhoto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
    date: "2026-07-10",
    time: "09:00 AM",
    hospital: "MediCare Super Specialty Hospital",
    status: "Cancelled",
    reason: "Severe migraine follow-up consultation.",
    bookingDate: "2026-07-05",
    notes: "Cancelled by patient due to schedule collision."
  },
  {
    id: "APT-8612",
    doctorId: "DOC-105",
    doctorName: "Dr. Marcus Thorne",
    specialty: "Pediatrics",
    department: "Pediatrics & Child Health",
    doctorPhoto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80",
    date: "2026-06-18",
    time: "03:30 PM",
    hospital: "MediCare Super Specialty Hospital",
    status: "Rejected",
    reason: "Consultation regarding pediatric dietary plans for child.",
    bookingDate: "2026-06-15",
    notes: "Doctor unavailable due to emergency surgery schedules."
  }
];

export const initialNotifications = [
  {
    id: "NOTIF-1",
    type: "Appointment Confirmed",
    title: "Appointment Request Confirmed",
    message: "Dr. Rahul Sharma has confirmed your appointment for Aug 26, 2026 at 10:30 AM.",
    timestamp: "2 hours ago",
    isRead: false,
    appointmentId: "APT-8821",
    doctorName: "Dr. Rahul Sharma",
    iconType: "CheckCircle"
  },
  {
    id: "NOTIF-2",
    type: "Appointment Reminder",
    title: "Upcoming Appointment Reminder",
    message: "Reminder: You have an upcoming appointment with Dr. Rahul Sharma on Aug 26.",
    timestamp: "1 day ago",
    isRead: false,
    appointmentId: "APT-8821",
    doctorName: "Dr. Rahul Sharma",
    iconType: "Clock"
  },
  {
    id: "NOTIF-3",
    type: "Appointment Completed",
    title: "Consultation Completed",
    message: "Your appointment with Dr. Aris Vance on Aug 15, 2026 has been marked completed.",
    timestamp: "9 days ago",
    isRead: true,
    appointmentId: "APT-8710",
    doctorName: "Dr. Aris Vance",
    iconType: "CheckCircle"
  },
  {
    id: "NOTIF-4",
    type: "Profile Updated",
    title: "Security Settings Modified",
    message: "Your personal contact information was successfully updated.",
    timestamp: "12 days ago",
    isRead: true,
    appointmentId: null,
    doctorName: null,
    iconType: "User"
  }
];

export const initialActivities = [
  {
    id: "ACT-1",
    title: "Appointment Request Submitted",
    desc: "Requested appointment with Dr. Priya Patel for Orthopedics consultation.",
    time: "August 24, 2026 - 04:15 PM",
    type: "pending"
  },
  {
    id: "ACT-2",
    title: "Appointment Confirmed",
    desc: "Dr. Rahul Sharma confirmed your booking request.",
    time: "August 24, 2026 - 02:00 PM",
    type: "confirmed"
  },
  {
    id: "ACT-3",
    title: "Medical Report Archived",
    desc: "Dr. Aris Vance uploaded post-consultation summary notes.",
    time: "August 15, 2026 - 01:20 PM",
    type: "completed"
  }
];