import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowLeft } from 'lucide-react';

export default function PatientRegister() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-[#D9E6EC] p-6 sm:p-10">
        
        <div className="flex items-center justify-between border-b border-[#D9E6EC] pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#2490C9] rounded-lg flex items-center justify-center text-white">
              <Plus className="w-5 h-5 stroke-[3]" />
            </div>
            <div>
              <span className="text-lg font-bold text-[#102A43] leading-none block">MediCare</span>
              <span className="text-xs text-[#64748B]">Patient Portal Registration</span>
            </div>
          </div>
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2490C9] hover:text-[#126B9E]">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#102A43]">Create Your Patient Account</h1>
          <p className="text-sm text-[#64748B] mt-1">
            Join MediCare Hospital and manage your healthcare appointments easily.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full px-3.5 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43] focus:outline-none focus:border-[#2490C9] focus:ring-1 focus:ring-[#2490C9]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                className="w-full px-3.5 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43] focus:outline-none focus:border-[#2490C9] focus:ring-1 focus:ring-[#2490C9]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                className="w-full px-3.5 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43] focus:outline-none focus:border-[#2490C9] focus:ring-1 focus:ring-[#2490C9]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">Date of Birth</label>
              <input
                type="date"
                required
                className="w-full px-3.5 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43] focus:outline-none focus:border-[#2490C9] focus:ring-1 focus:ring-[#2490C9]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">Gender</label>
              <select
                required
                className="w-full px-3.5 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43] focus:outline-none focus:border-[#2490C9] focus:ring-1 focus:ring-[#2490C9]"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">Address</label>
            <textarea
              rows="2"
              required
              placeholder="Street Address, City, State, ZIP"
              className="w-full px-3.5 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43] focus:outline-none focus:border-[#2490C9] focus:ring-1 focus:ring-[#2490C9]"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="Create password"
                className="w-full px-3.5 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43] focus:outline-none focus:border-[#2490C9] focus:ring-1 focus:ring-[#2490C9]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">Confirm Password</label>
              <input
                type="password"
                required
                placeholder="Confirm password"
                className="w-full px-3.5 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43] focus:outline-none focus:border-[#2490C9] focus:ring-1 focus:ring-[#2490C9]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#2490C9] hover:bg-[#126B9E] text-white font-semibold rounded-md shadow-sm transition-all duration-200 mt-2"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-[#64748B] pt-4">
            Already have an account?{' '}
            <Link to="/" className="text-[#2490C9] font-semibold hover:text-[#126B9E] hover:underline">
              Sign in here
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}