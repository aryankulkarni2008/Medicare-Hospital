import React, { useState } from 'react';
import { Plus, CheckCircle2, Award, Clock } from 'lucide-react';
import AuthRoleTabs from '../../components/auth/AuthRoleTabs';
import PatientLoginForm from '../../components/auth/PatientLoginForm';
import DoctorLoginForm from '../../components/auth/DoctorLoginForm';
import AdminLoginForm from '../../components/auth/AdminLoginForm';

export default function HospitalLogin() {
  const [selectedRole, setSelectedRole] = useState('patient');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-sm border border-[#D9E6EC] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT SIDE: Visual Branding */}
        <div className="lg:col-span-5 bg-[#F4F9FC] p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#D9E6EC] flex flex-col justify-between relative overflow-hidden">
          
          <div className="relative z-10">
            {/* Header Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#2490C9] rounded-lg flex items-center justify-center text-white shadow-sm">
                <Plus className="w-6 h-6 stroke-[3]" />
              </div>
              <div>
                <span className="text-xl font-bold text-[#102A43] tracking-tight block leading-none">
                  MediCare
                </span>
                <span className="text-xs font-semibold text-[#64748B] tracking-wider uppercase">
                  Hospital Management
                </span>
              </div>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-[#102A43] leading-tight mb-3">
              Welcome to MediCare Hospital
            </h1>
            <p className="text-[#64748B] text-sm leading-relaxed mb-8">
              Sign in here to access your healthcare account and manage clinical records seamlessly.
            </p>

            {/* Realistic Medical Details */}
            <div className="space-y-4">
              <div className="bg-white p-3.5 rounded-lg border border-[#D9E6EC] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E6F4FA] flex items-center justify-center text-[#2490C9]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#102A43]">Trusted Healthcare</div>
                  <div className="text-xs text-[#64748B]">Accredited clinical services</div>
                </div>
              </div>

              <div className="bg-[#E6F4FA]/60 p-3.5 rounded-lg border border-[#D9E6EC] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2490C9]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#102A43]">Easy Appointments</div>
                  <div className="text-xs text-[#64748B]">24/7 online scheduling</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-[#D9E6EC] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E6F4FA] flex items-center justify-center text-[#2490C9]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#102A43]">Professional Doctors</div>
                  <div className="text-xs text-[#64748B]">Board-certified specialists</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 mt-8 border-t border-[#D9E6EC] text-xs text-[#64748B] flex justify-between items-center">
            <span>© 2026 MediCare Inc.</span>
            <span>Support: 1-800-MEDICARE</span>
          </div>

          {/* Low Opacity Decorative Medical Cross Background Pattern */}
          <div className="absolute right-[-40px] bottom-[-40px] opacity-[0.03] text-[#102A43] pointer-events-none">
            <Plus className="w-80 h-80 stroke-[1]" />
          </div>
        </div>

        {/* RIGHT SIDE: Auth Card */}
        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#102A43]">Welcome Back</h2>
            <p className="text-sm text-[#64748B] mt-1">
              Select your portal role to sign in to your healthcare account.
            </p>
          </div>

          <AuthRoleTabs selectedRole={selectedRole} setSelectedRole={setSelectedRole} />

          {selectedRole === 'patient' && <PatientLoginForm />}
          {selectedRole === 'doctor' && <DoctorLoginForm />}
          {selectedRole === 'admin' && <AdminLoginForm />}
        </div>

      </div>
    </div>
  );
}