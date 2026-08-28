// ============================================================
// MediCare Hospital — Demo Auth Service
// Frontend-only temporary authentication.
//
// FUTURE BACKEND REPLACEMENT:
// Replace the credential-check blocks below with:
//   POST /api/auth/login  →  { user: { id, name, email, role }, token }
// Then store the returned token in localStorage and use role-based routing.
// ============================================================

// ─── Patient Demo Credentials ────────────────────────────────
const PATIENT_CREDENTIALS = {
  email: 'kulkarniaryan852@gmail.com',
  password: 'Aryan@2008',
  name: 'Aryan Kulkarni',
  role: 'patient'
};

// ─── Admin Demo Credentials ──────────────────────────────────
const ADMIN_CREDENTIALS = {
  email: 'aryankulkarni2048@gmail.com',
  password: 'Aryan@123',
  name: 'Aryan Kulkarni',
  role: 'admin'
};

export const authService = {
  // ─── PATIENT AUTH ─────────────────────────────────────────
  authenticatePatient(email, password) {
    if (
      email.toLowerCase().trim() === PATIENT_CREDENTIALS.email.toLowerCase() &&
      password === PATIENT_CREDENTIALS.password
    ) {
      const user = {
        name: PATIENT_CREDENTIALS.name,
        email: PATIENT_CREDENTIALS.email,
        role: PATIENT_CREDENTIALS.role,
        isAuthenticated: true
      };
      localStorage.setItem('medicare_patient_user', JSON.stringify(user));
      return { success: true, user };
    }
    return {
      success: false,
      message: 'Invalid email or password. Please check your credentials and try again.'
    };
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

  // ─── ADMIN AUTH ───────────────────────────────────────────
  authenticateAdmin(email, password) {
    if (
      email.toLowerCase().trim() === ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const user = {
        name: ADMIN_CREDENTIALS.name,
        email: ADMIN_CREDENTIALS.email,
        role: ADMIN_CREDENTIALS.role,
        isAuthenticated: true
      };
      localStorage.setItem('medicare_admin_user', JSON.stringify(user));
      return { success: true, user };
    }
    return {
      success: false,
      message: 'Invalid Admin email or password. Please check your credentials and try again.'
    };
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
  }
};
