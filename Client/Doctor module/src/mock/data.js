// MediCare Doctor Module Mock Data Store

export const initialDoctorProfile = {
  id: "DOC-8021",
  name: "Dr. Rahul Sharma",
  title: "Cardiologist",
  department: "Cardiology",
  experience: "8 Years",
  qualification: "MBBS, MD Cardiology",
  consultationFee: "₹800",
  hospital: "MediCare Hospital",
  rating: 4.8,
  reviewCount: 124,
  email: "rahul.sharma@medicare.com",
  phone: "+91 98765 43210",
  about: "Dr. Rahul Sharma is a renowned Cardiologist with over 8 years of clinical experience. Specializing in preventive cardiac care, non-invasive diagnostic cardiology, and hypertension management at MediCare Hospital.",
  avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250"
};

export const initialAppointments = [
  {
    id: "MC-10245",
    patientId: "P-1001",
    patientName: "Aryan Sharma",
    patientAge: 21,
    patientGender: "Male",
    patientPhone: "+91 98111 22334",
    patientEmail: "aryan.s@example.com",
    doctorName: "Dr. Rahul Sharma",
    department: "Cardiology",
    date: "2026-08-23",
    time: "10:00 AM",
    status: "Confirmed",
    reason: "Chest discomfort and routine consultation",
    bookingDate: "2026-08-20"
  },
  {
    id: "MC-10246",
    patientId: "P-1002",
    patientName: "Rahul Patil",
    patientAge: 35,
    patientGender: "Male",
    patientPhone: "+91 98222 33445",
    patientEmail: "rahul.patil@example.com",
    doctorName: "Dr. Rahul Sharma",
    department: "Cardiology",
    date: "2026-08-23",
    time: "11:30 AM",
    status: "Pending",
    reason: "High blood pressure evaluation",
    bookingDate: "2026-08-22"
  },
  {
    id: "MC-10247",
    patientId: "P-1003",
    patientName: "Sneha Joshi",
    patientAge: 28,
    patientGender: "Female",
    patientPhone: "+91 98333 44556",
    patientEmail: "sneha.j@example.com",
    doctorName: "Dr. Rahul Sharma",
    department: "Cardiology",
    date: "2026-08-23",
    time: "12:30 PM",
    status: "Confirmed",
    reason: "Post-medication review & cardiac risk check",
    bookingDate: "2026-08-21"
  },
  {
    id: "MC-10248",
    patientId: "P-1004",
    patientName: "Vikram Patel",
    patientAge: 45,
    patientGender: "Male",
    patientPhone: "+91 98444 55667",
    patientEmail: "vikram.patel@example.com",
    doctorName: "Dr. Rahul Sharma",
    department: "Cardiology",
    date: "2026-08-24",
    time: "09:30 AM",
    status: "Pending",
    reason: "ECG report review & shortness of breath",
    bookingDate: "2026-08-22"
  },
  {
    id: "MC-10249",
    patientId: "P-1005",
    patientName: "Ananya Rao",
    patientAge: 52,
    patientGender: "Female",
    patientPhone: "+91 98555 66778",
    patientEmail: "ananya.rao@example.com",
    doctorName: "Dr. Rahul Sharma",
    department: "Cardiology",
    date: "2026-08-25",
    time: "11:00 AM",
    status: "Confirmed",
    reason: "Annual cardiac routine screening",
    bookingDate: "2026-08-19"
  },
  {
    id: "MC-10230",
    patientId: "P-1001",
    patientName: "Aryan Sharma",
    patientAge: 21,
    patientGender: "Male",
    patientPhone: "+91 98111 22334",
    patientEmail: "aryan.s@example.com",
    doctorName: "Dr. Rahul Sharma",
    department: "Cardiology",
    date: "2026-08-20",
    time: "10:30 AM",
    status: "Completed",
    reason: "Initial cardiac assessment and blood pressure check",
    bookingDate: "2026-08-15"
  },
  {
    id: "MC-10228",
    patientId: "P-1002",
    patientName: "Rahul Patil",
    patientAge: 35,
    patientGender: "Male",
    patientPhone: "+91 98222 33445",
    patientEmail: "rahul.patil@example.com",
    doctorName: "Dr. Rahul Sharma",
    department: "Cardiology",
    date: "2026-08-18",
    time: "02:00 PM",
    status: "Completed",
    reason: "Treadmill stress test discussion",
    bookingDate: "2026-08-12"
  },
  {
    id: "MC-10225",
    patientId: "P-1006",
    patientName: "Amit Kulkarni",
    patientAge: 31,
    patientGender: "Male",
    patientPhone: "+91 98888 99001",
    patientEmail: "amit.k@example.com",
    doctorName: "Dr. Rahul Sharma",
    department: "Cardiology",
    date: "2026-08-17",
    time: "11:30 AM",
    status: "Cancelled",
    reason: "Patient rescheduled due to personal work",
    bookingDate: "2026-08-14"
  },
  {
    id: "MC-10220",
    patientId: "P-1007",
    patientName: "Sunita Deshmukh",
    patientAge: 48,
    patientGender: "Female",
    patientPhone: "+91 98999 00112",
    patientEmail: "sunita.d@example.com",
    doctorName: "Dr. Rahul Sharma",
    department: "Cardiology",
    date: "2026-08-15",
    time: "04:00 PM",
    status: "Rejected",
    reason: "Doctor attending emergency hospital ward call",
    bookingDate: "2026-08-14"
  }
];



export const initialAvailability = {
  days: {
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: false
  },
  workHours: {
    from: "09:00 AM",
    to: "01:00 PM"
  },
  breakTime: {
    from: "12:00 PM",
    to: "12:30 PM"
  },
  slotDuration: "30" // 30 minutes default
};

export const initialNotifications = [
  {
    id: "N-101",
    title: "New Appointment Request",
    description: "Aryan Sharma requested an appointment for tomorrow at 10:30 AM.",
    time: "2 min ago",
    read: false,
    type: "request"
  },
  {
    id: "N-102",
    title: "Appointment Cancelled",
    description: "Rahul Patil cancelled the appointment scheduled for 12:00 PM.",
    time: "1 hour ago",
    read: false,
    type: "cancelled"
  },
  {
    id: "N-103",
    title: "Upcoming Appointment",
    description: "You have an appointment with Sneha Joshi tomorrow at 11:30 AM.",
    time: "3 hours ago",
    read: true,
    type: "upcoming"
  },
  {
    id: "N-104",
    title: "Schedule Reminder",
    description: "Please review and confirm your weekend working availability slots.",
    time: "1 day ago",
    read: true,
    type: "system"
  }
];

// Helper generator for time slots preview
export function generateTimeSlots(fromTimeStr, toTimeStr, breakFromStr, breakToStr, durationMins) {
  // Convert "09:00 AM" to minutes from midnight
  const parseTimeToMins = (timeStr) => {
    if (!timeStr) return 0;
    const parts = timeStr.trim().split(" ");
    const [h, m] = parts[0].split(":").map(Number);
    let hours = h;
    const isPM = parts[1] === "PM";
    if (isPM && hours < 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;
    return hours * 60 + m;
  };

  const formatMinsToTime = (mins) => {
    let hours = Math.floor(mins / 60);
    const m = mins % 60;
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;
    const hStr = hours < 10 ? `0${hours}` : `${hours}`;
    const mStr = m < 10 ? `0${m}` : `${m}`;
    return `${hStr}:${mStr} ${ampm}`;
  };

  const startMins = parseTimeToMins(fromTimeStr);
  const endMins = parseTimeToMins(toTimeStr);
  const breakStart = parseTimeToMins(breakFromStr);
  const breakEnd = parseTimeToMins(breakToStr);
  const dur = parseInt(durationMins, 10) || 30;

  const slots = [];
  for (let current = startMins; current < endMins; current += dur) {
    const timeLabel = formatMinsToTime(current);
    const isBreak = current >= breakStart && current < breakEnd;

    // Determine initial simulated status
    let status = "Available";
    if (isBreak) {
      status = "Break";
    } else if (current === startMins + dur) {
      status = "Booked"; // Mock second slot booked
    } else if (current === startMins + dur * 3) {
      status = "Booked"; // Mock 4th slot booked
    }

    slots.push({
      time: timeLabel,
      status: status,
      isBreak: isBreak
    });
  }

  return slots;
}
