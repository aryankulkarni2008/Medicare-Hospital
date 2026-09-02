// ============================================================
// MediCare Hospital — Demo Auth Service
// Frontend-only temporary authentication.
//
// FUTURE BACKEND REPLACEMENT:
// Replace the credential-check blocks below with:
//   POST /api/auth/login  →  { user: { id, name, email, role }, token }
// Then store the returned token in localStorage and use role-based routing.
// ============================================================

const API_URL = 'http://localhost:5000/api/patients/';

// ─── Admin Demo Credentials ──────────────────────────────────
const ADMIN_CREDENTIALS = {
  email: 'aryankulkarni2048@gmail.com',
  password: 'Aryan@123',
  name: 'Aryan Kulkarni',
  role: 'admin'
};

// DOCTOR_CREDENTIALS demo removed, now using real backend

export const authService = {
  // ─── PATIENT AUTH ─────────────────────────────────────────
  async authenticatePatient(email, password) {
    try {
      const response = await fetch(API_URL + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const user = {
          id: data._id,
          name: data.fullName,
          email: data.email,
          role: data.role,
          token: data.token,
          isAuthenticated: true,
        };
        localStorage.setItem('medicare_patient_user', JSON.stringify(user));
        return { success: true, user };
      } else {
        return { success: false, message: data.message || 'Invalid email or password.' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Server error. Please try again later.' };
    }
  },

  async registerPatient(patientData) {
    try {
      const response = await fetch(API_URL + 'register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      const data = await response.json();

      if (response.ok) {
        const user = {
          id: data._id,
          name: data.fullName,
          email: data.email,
          role: 'patient',
          token: data.token,
          isAuthenticated: true,
        };
        localStorage.setItem('medicare_patient_user', JSON.stringify(user));
        return { success: true, user };
      } else {
        return { success: false, message: data.message || 'Registration failed.' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Server error. Please try again later.' };
    }
  },

  getCurrentPatient() {
    const userStr = localStorage.getItem('medicare_patient_user');
    if (userStr) {
      try { return JSON.parse(userStr); } catch (e) { return null; }
    }
    return null;
  },

  // Kept for backward compatibility with existing PatientPortal.jsx
  getCurrentUser() {
    return this.getCurrentPatient();
  },

  isLoggedIn() {
    return !!localStorage.getItem('medicare_patient_user');
  },

  logoutPatient() {
    localStorage.removeItem('medicare_patient_user');
    localStorage.removeItem('medicare_patient_profile');
  },

  // ─── APPOINTMENTS ─────────────────────────────────────────
  async createAppointment(appointmentData) {
    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, message: data.message || 'Failed to create appointment.' };
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      return { success: false, message: 'Server error. Please try again later.' };
    }
  },

  // ─── ADMIN AUTH ───────────────────────────────────────────
  async authenticateAdmin(email, password) {
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const user = {
          id: data._id,
          name: data.fullName,
          email: data.email,
          role: data.role,
          token: data.token,
          isAuthenticated: true,
        };
        localStorage.setItem('medicare_admin_user', JSON.stringify(user));
        return { success: true, user };
      } else {
        return { success: false, message: data.message || 'Invalid email or password.' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Server error. Please try again later.' };
    }
  },

  async registerAdmin(adminData) {
    try {
      const response = await fetch('http://localhost:5000/api/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });

      const data = await response.json();

      if (response.ok) {
        const user = {
          id: data._id,
          name: data.fullName,
          email: data.email,
          role: 'admin',
          token: data.token,
          isAuthenticated: true,
        };
        localStorage.setItem('medicare_admin_user', JSON.stringify(user));
        return { success: true, user };
      } else {
        return { success: false, message: data.message || 'Registration failed.' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Server error. Please try again later.' };
    }
  },

  getCurrentAdmin() {
    const userStr = localStorage.getItem('medicare_admin_user');
    if (userStr) {
      try { return JSON.parse(userStr); } catch (e) { return null; }
    }
    return null;
  },

  isAdminLoggedIn() {
    return !!localStorage.getItem('medicare_admin_user');
  },

  logoutAdmin() {
    localStorage.removeItem('medicare_admin_user');
  },

  // ─── DOCTOR AUTH ──────────────────────────────────────────
  async authenticateDoctor(doctorId, password) {
    try {
      const response = await fetch('http://localhost:5000/api/doctors/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const user = {
          id: data._id,
          name: data.fullName,
          email: data.email,
          doctorId: data.doctorId,
          role: data.role,
          token: data.token,
          isAuthenticated: true,
        };
        localStorage.setItem('medicare_doctor_user', JSON.stringify(user));
        return { success: true, user };
      } else {
        return { success: false, message: data.message || 'Invalid Doctor ID or password.' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Server error. Please try again later.' };
    }
  },

  async registerDoctorRequest(doctorData) {
    try {
      const response = await fetch('http://localhost:5000/api/doctors/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Registration request failed.' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Server error. Please try again later.' };
    }
  },

  async getDoctors() {
    try {
      const response = await fetch('http://localhost:5000/api/doctors');
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to fetch doctors');
        return [];
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      return [];
    }
  },

  async getDoctorById(id) {
    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${id}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to fetch doctor by id');
        return null;
      }
    } catch (error) {
      console.error('Error fetching doctor by id:', error);
      return null;
    }
  },

  // ─── ADMIN PATIENTS & APPOINTMENTS ────────────────────────
  async getPatients() {
    try {
      const admin = this.getCurrentAdmin();
      const headers = {};
      if (admin?.token) {
        headers['Authorization'] = `Bearer ${admin.token}`;
      }
      if (admin?.email) {
        headers['x-admin-email'] = admin.email;
      }
      const response = await fetch('http://localhost:5000/api/patients', { headers });
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to fetch patients:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      return [];
    }
  },

  async getPatientById(id) {
    try {
      const admin = this.getCurrentAdmin();
      const headers = {};
      if (admin?.token) {
        headers['Authorization'] = `Bearer ${admin.token}`;
      }
      if (admin?.email) {
        headers['x-admin-email'] = admin.email;
      }
      const response = await fetch(`http://localhost:5000/api/patients/${id}`, { headers });
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to fetch patient by id:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching patient by id:', error);
      return null;
    }
  },

  async getAllAppointments() {
    try {
      const response = await fetch('http://localhost:5000/api/appointments');
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to fetch appointments:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }
  },

  async getPatientAppointments(patientId) {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/patient/${patientId}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to fetch patient appointments:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching patient appointments:', error);
      return [];
    }
  },

  // ─── ADMIN DOCTOR REQUESTS ──────────────────────────────────
  async getDoctorRequests() {
    try {
      const response = await fetch('http://localhost:5000/api/admin/requests/doctors');
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to fetch doctor requests');
        return [];
      }
    } catch (error) {
      console.error('Error fetching doctor requests:', error);
      return [];
    }
  },

  async acceptDoctorRequest(id) {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/requests/doctors/${id}/accept`, {
        method: 'POST',
      });
      const data = await response.json();
      return { success: response.ok, message: data.message };
    } catch (error) {
      console.error('Accept request error:', error);
      return { success: false, message: 'Server error.' };
    }
  },

  async rejectDoctorRequest(id) {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/requests/doctors/${id}/reject`, {
        method: 'POST',
      });
      const data = await response.json();
      return { success: response.ok, message: data.message };
    } catch (error) {
      console.error('Reject request error:', error);
      return { success: false, message: 'Server error.' };
    }
  },

  // ─── DOCTOR AVAILABILITY ──────────────────────────────────
  async getDoctorAvailability(doctorId) {
    try {
      const response = await fetch(`http://localhost:5000/api/availability/doctor/${doctorId}`);
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        return data;
      } catch (e) {
        console.error('Non-JSON response from getDoctorAvailability:', text);
        return null;
      }
    } catch (error) {
      console.error('Error fetching doctor availability:', error);
      return null;
    }
  },

  async getMyAvailability() {
    try {
      const doctor = this.getCurrentDoctor();
      const token = doctor?.token;
      const doctorId = doctor?.doctorId || doctor?.id;

      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (doctorId) headers['x-doctor-id'] = doctorId;

      const response = await fetch('http://localhost:5000/api/availability/me', { headers });
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error('Non-JSON response from getMyAvailability:', text);
        return null;
      }
    } catch (error) {
      console.error('Error fetching my availability:', error);
      return null;
    }
  },

  async updateDoctorAvailability(availabilityData) {
    try {
      const doctor = this.getCurrentDoctor();
      const token = doctor?.token;
      const doctorId = doctor?.doctorId || doctor?.id;

      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (doctorId) headers['x-doctor-id'] = doctorId;

      const payload = {
        doctorId,
        ...availabilityData,
      };

      const response = await fetch('http://localhost:5000/api/availability', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let data = {};
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Non-JSON response from updateDoctorAvailability:', text);
        return { success: false, message: 'Invalid response from server.' };
      }

      if (response.ok && (data.success || data.availability)) {
        return { success: true, data };
      } else {
        return { success: false, message: data.message || 'Failed to update availability.' };
      }
    } catch (error) {
      console.error('Error updating availability:', error);
      return { success: false, message: 'Server error. Please try again.' };
    }
  },

  async getDoctorSlots(doctorId, date) {
    try {
      const response = await fetch(`http://localhost:5000/api/availability/doctor/${doctorId}/slots?date=${date}`);
      const text = await response.text();
      let data = null;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Non-JSON response from getDoctorSlots:', text);
      }

      if (response.ok && data) {
        return data;
      } else {
        return {
          available: false,
          message: data?.message || 'Doctor is not available on this day.',
          slots: [],
        };
      }
    } catch (error) {
      console.error('Error fetching doctor slots:', error);
      return { available: false, message: 'Unable to load time slots.', slots: [] };
    }
  },

  getCurrentDoctor() {
    const userStr = localStorage.getItem('medicare_doctor_user');
    if (userStr) {
      try { return JSON.parse(userStr); } catch (e) { return null; }
    }
    return null;
  },

  isDoctorLoggedIn() {
    return !!localStorage.getItem('medicare_doctor_user');
  },

  logoutDoctor() {
    localStorage.removeItem('medicare_doctor_user');
  }
};

