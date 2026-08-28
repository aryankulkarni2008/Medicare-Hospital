import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowLeft, Info } from 'lucide-react';

export default function AdminRegister() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-sm border border-[#D9E6EC] p-6 sm:p-10">
        
        <div className="flex items-center justify-between border-b border-[#D9E6EC] pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#2490C9] rounded-lg flex items-center justify-center text-white">
              <Plus className="w-5 h-5 stroke-[3]" />
            </div>
            <div>
              <span className="text-lg font-bold text-[#102A43] leading-none block">MediCare</span>
              <span className="text-xs text-[#64748B]">Internal Staff Setup</span>
            </div>
          </div>
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2490C9] hover:text-[#126B9E]">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#102A43]">Staff Registration</h1>
          <p className="text-sm text-[#64748B] mt-1">
            Register a hospital staff or administration account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">Full Name</label>
              <input type="text" required placeholder="Staff Member Name" className="w-full px-3.5 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">Employee ID</label>
              <input type="text" required placeholder="EMP-8092" className="w-full px-3.5 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">Department</label>
              <input type="text" required placeholder="Administration / Reception" className="w-full px-3.5 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">Job Role</label>
              <input type="text" required placeholder="Hospital Administrator" className="w-full px-3.5 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">Email Address</label>
              <input type="email" required placeholder="staff@medicare.com" className="w-full px-3.5 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">Phone Number</label>
              <input type="tel" required placeholder="+1 (555) 900-1122" className="w-full px-3.5 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">Password</label>
              <input type="password" required placeholder="••••••••" className="w-full px-3.5 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">Confirm Password</label>
              <input type="password" required placeholder="••••••••" className="w-full px-3.5 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43]" />
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-[#E6F4FA] rounded-md border border-[#D9E6EC] text-xs text-[#102A43]">
            <Info className="w-4 h-4 text-[#2490C9] shrink-0" />
            <span>Staff accounts require internal hospital administration approval.</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#2490C9] hover:bg-[#126B9E] text-white font-semibold rounded-md shadow-sm transition-all duration-200"
          >
            Submit Staff Registration
          </button>

          <div className="text-center text-sm text-[#64748B] pt-2">
            Already registered?{' '}
            <Link to="/" className="text-[#2490C9] font-semibold hover:text-[#126B9E] hover:underline">
              Sign in here
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}