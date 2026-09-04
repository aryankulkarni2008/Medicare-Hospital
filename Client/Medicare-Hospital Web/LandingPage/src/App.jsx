import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Check, 
  ChevronRight, 
  Menu, 
  X,
  Stethoscope,
  Hospital,
  MapPin,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

// ============================================================================
// NAVIGATION PATH CONSTANTS
// Easily connect your existing Patient, Doctor, and Admin modules here:
// ============================================================================
export const ROUTES = {
  BOOK_APPOINTMENT: 'http://localhost:5173',
  LOGIN: 'http://localhost:5173',
  DOCTOR: '/doctor',
  ADMIN: '/admin'
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');

  return (
    <div className="min-h-screen bg-[#F4F9FC] text-[#102A43] font-sans antialiased flex flex-col justify-between selection:bg-[#E6F4FA] selection:text-[#2490C9]">
      
      {/* ====================================================================
          1. NAVBAR
         ==================================================================== */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#D9E6EC] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#2490C9] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Plus className="w-5 h-5 stroke-[3]" />
            </div>
            <span className="font-bold text-xl text-[#102A43] tracking-tight">
              MEDICARE
            </span>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#home" className="text-[#102A43] hover:text-[#2490C9] transition-colors py-1">
              Home
            </a>
            <a href="#features" className="text-[#64748B] hover:text-[#2490C9] transition-colors py-1">
              Features
            </a>
            <a href="#how-it-works" className="text-[#64748B] hover:text-[#2490C9] transition-colors py-1">
              How It Works
            </a>
          </nav>

          {/* Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <a 
              href={ROUTES.LOGIN} 
              className="px-4 py-2 text-sm font-medium text-[#102A43] hover:text-[#2490C9] hover:bg-[#E6F4FA] rounded-lg transition-colors border border-transparent hover:border-[#D9E6EC]"
            >
              Login
            </a>
            <a 
              href={ROUTES.BOOK_APPOINTMENT} 
              className="px-4 py-2 text-sm font-medium text-white bg-[#2490C9] hover:bg-[#126B9E] rounded-lg shadow-sm transition-colors"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#102A43] hover:bg-[#E6F4FA] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#D9E6EC] px-4 pt-3 pb-4 space-y-2 shadow-md">
            <a 
              href="#home" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-[#102A43] hover:bg-[#E6F4FA]"
            >
              Home
            </a>
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-[#64748B] hover:bg-[#E6F4FA]"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-[#64748B] hover:bg-[#E6F4FA]"
            >
              How It Works
            </a>
            <div className="pt-2 border-t border-[#D9E6EC] flex flex-col space-y-2">
              <a 
                href={ROUTES.LOGIN} 
                className="w-full text-center px-4 py-2 text-sm font-medium text-[#102A43] border border-[#D9E6EC] rounded-lg"
              >
                Login
              </a>
              <a 
                href={ROUTES.BOOK_APPOINTMENT} 
                className="w-full text-center px-4 py-2 text-sm font-medium text-white bg-[#2490C9] rounded-lg"
              >
                Book Appointment
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-grow">
        
        {/* ====================================================================
            2. HERO SECTION — HUMAN-DESIGNED HEALTHCARE VISUAL
           ==================================================================== */}
        <section id="home" className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-10 items-center">
            
            {/* HERO LEFT COLUMN */}
            <div className="space-y-6 text-left max-w-3xl mx-auto w-full">
              
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E6F4FA] border border-[#D9E6EC]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2490C9]" />
                <span className="text-[11px] font-semibold text-[#2490C9] uppercase tracking-wider">
                  MEDICARE • HEALTHCARE APPOINTMENT SYSTEM
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#102A43] tracking-tight leading-[1.15]">
                Your Health,<br />
                <span className="text-[#2490C9]">Our Priority.</span>
              </h1>

              {/* Description */}
              <p className="text-base text-[#64748B] leading-relaxed max-w-lg">
                Find doctors, check available slots and book appointments easily with Medicare.
              </p>

              {/* Action Buttons */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a 
                  href={ROUTES.BOOK_APPOINTMENT}
                  className="px-6 py-3 text-center text-sm font-semibold text-white bg-[#2490C9] hover:bg-[#126B9E] rounded-lg shadow-sm transition-all"
                >
                  Book Appointment
                </a>
                <a 
                  href={ROUTES.LOGIN}
                  className="px-6 py-3 text-center text-sm font-semibold text-[#102A43] bg-white border border-[#D9E6EC] hover:bg-[#E6F4FA] rounded-lg transition-all"
                >
                  Login
                </a>
              </div>

              {/* Human-designed subtle OPD badges */}
              <div className="pt-2 flex items-center gap-4 text-xs text-[#64748B]">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Verified Doctors
                </span>
                <span className="text-[#D9E6EC]">|</span>
                <span>Real-Time OPD Slots</span>
                <span className="text-[#D9E6EC]">|</span>
                <span>Instant Ticket</span>
              </div>

            </div>

          </div>
        </section>

        {/* ====================================================================
            3. FEATURES — HORIZONTAL BENEFIT BAR WITH VERTICAL DIVIDERS
           ==================================================================== */}
        <section id="features" className="py-8 bg-white border-y border-[#D9E6EC]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-[#D9E6EC]">
              
              {/* Feature 1 */}
              <div className="flex items-center gap-3.5 lg:px-4 first:pl-0">
                <div className="w-10 h-10 rounded-lg bg-[#E6F4FA] border border-[#D9E6EC] text-[#2490C9] flex items-center justify-center flex-shrink-0">
                  <Search className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#102A43]">🔎 Find Doctors</h3>
                  <p className="text-xs text-[#64748B]">Search doctors easily</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3.5 lg:px-6">
                <div className="w-10 h-10 rounded-lg bg-[#E6F4FA] border border-[#D9E6EC] text-[#2490C9] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#102A43]">🕐 Check Slots</h3>
                  <p className="text-xs text-[#64748B]">See available timings</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3.5 lg:px-6">
                <div className="w-10 h-10 rounded-lg bg-[#E6F4FA] border border-[#D9E6EC] text-[#2490C9] flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#102A43]">📅 Book Appointment</h3>
                  <p className="text-xs text-[#64748B]">Choose preferred time</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center gap-3.5 lg:px-6 last:pr-0">
                <div className="w-10 h-10 rounded-lg bg-[#E6F4FA] border border-[#D9E6EC] text-[#2490C9] flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#102A43]">✓ Manage Bookings</h3>
                  <p className="text-xs text-[#64748B]">Keep track of visits</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ====================================================================
            4. HOW IT WORKS — TYPOGRAPHY & APPOINTMENT PREVIEW
           ==================================================================== */}
        <section id="how-it-works" className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          
          {/* Section Heading */}
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43] tracking-tight">
              How Medicare Works
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              A simple 3-step appointment flow for patients and doctors.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 items-center">
            
            {/* Left 3-Step Flow */}
            <div className="max-w-2xl mx-auto w-full space-y-6 relative">
              
              {/* Connecting vertical line on desktop */}
              <div className="hidden sm:block absolute top-4 bottom-4 left-5 w-0.5 bg-[#D9E6EC] -z-0"></div>

              {/* Step 01 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[#2490C9] text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                  01
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-bold text-[#102A43]">Find a Doctor</h3>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                    Search registered specialists by medical department or clinic location.
                  </p>
                </div>
              </div>

              {/* Step 02 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[#2490C9] text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                  02
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-bold text-[#102A43]">Choose a Time Slot</h3>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                    Pick a convenient morning or afternoon OPD appointment time.
                  </p>
                </div>
              </div>

              {/* Step 03 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[#2490C9] text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                  03
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-bold text-[#102A43]">Book Appointment</h3>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                    Confirm your details and instantly receive your booking ticket.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* ====================================================================
            5. SMALL CTA
           ==================================================================== */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-12">
          <div className="bg-[#E6F4FA] border border-[#D9E6EC] rounded-xl p-6 sm:p-8 text-center max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-[#102A43] mb-2">
              Healthcare appointments, made simple.
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Find a doctor, choose a convenient time and manage your appointments with Medicare.
            </p>
          </div>
        </section>

      </main>

      {/* ====================================================================
          6. FOOTER
         ==================================================================== */}
      <footer className="bg-white border-t border-[#D9E6EC] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-0.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-[#2490C9] flex items-center justify-center text-white">
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="font-bold text-base text-[#102A43]">MEDICARE</span>
            </div>
            <p className="text-xs text-[#64748B]">
              Simple healthcare appointment management.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-4 sm:space-x-6 text-xs font-medium text-[#64748B]">
            <a href="#home" className="hover:text-[#2490C9] transition-colors">Home</a>
            <span className="text-[#D9E6EC]">|</span>
            <a href="#features" className="hover:text-[#2490C9] transition-colors">Features</a>
            <span className="text-[#D9E6EC]">|</span>
            <a href="#how-it-works" className="hover:text-[#2490C9] transition-colors">How It Works</a>
            <span className="text-[#D9E6EC]">|</span>
            <a href={ROUTES.LOGIN} className="hover:text-[#2490C9] transition-colors">Login</a>
          </nav>

          {/* Copyright */}
          <div className="text-xs text-[#64748B]">
            © 2026 Medicare
          </div>

        </div>
      </footer>

    </div>
  );
}
