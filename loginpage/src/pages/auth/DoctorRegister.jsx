import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DoctorRegister() {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm border border-[#D9E6EC] p-6 sm:p-10">
        
        <div className="flex items-center justify-between border-b border-[#D9E6EC] pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#2490C9] rounded-lg flex items-center justify-center text-white">
              <Plus className="w-5 h-5 stroke-[3]" />
            </div>
            <div>
              <span className="text-lg font-bold text-[#102A43] leading-none block">MediCare</span>
              <span className="text-xs text-[#64748B]">Medical Staff Verification Portal</span>
            </div>
          </div>
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2490C9] hover:text-[#126B9E]">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#102A43]">Doctor Registration Request</h1>
          <p className="text-sm text-[#64748B] mt-1">
            Submit your professional information for verification and approval by MediCare Hospital administration.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1 */}
          <div className="bg-[#F4F9FC] p-4 rounded-lg border border-[#D9E6EC]">
            <h2 className="text-xs font-bold text-[#126B9E] uppercase tracking-wider mb-3">
              Section 1: Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">Full Name</label>
                <input type="text" required placeholder="Dr. Jane Smith" className="w-full px-3 py-2 bg-white border border-[#D9E6EC] rounded text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1">Age</label>
                  <input type="number" required placeholder="38" className="w-full px-3 py-2 bg-white border border-[#D9E6EC] rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1">Gender</label>
                  <select required className="w-full px-3 py-2 bg-white border border-[#D9E6EC] rounded text-sm">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">Email Address</label>
                <input type="email" required placeholder="doctor@medicare.com" className="w-full px-3 py-2 bg-white border border-[#D9E6EC] rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">Phone Number</label>
                <input type="tel" required placeholder="+1 (555) 234-5678" className="w-full px-3 py-2 bg-white border border-[#D9E6EC] rounded text-sm" />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-xs font-bold text-[#102A43] mb-1">Address</label>
              <input type="text" required placeholder="Residential Address" className="w-full px-3 py-2 bg-white border border-[#D9E6EC] rounded text-sm" />
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-[#F4F9FC] p-4 rounded-lg border border-[#D9E6EC]">
            <h2 className="text-xs font-bold text-[#126B9E] uppercase tracking-wider mb-3">
              Section 2: Professional Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">Specialization</label>
                <input type="text" required placeholder="e.g. Cardiology" className="w-full px-3 py-2 bg-white border border-[#D9E6EC] rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">Years of Experience</label>
                <input type="number" required placeholder="10" className="w-full px-3 py-2 bg-white border border-[#D9E6EC] rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">Medical Degree</label>
                <input type="text" required placeholder="e.g. MBBS, MD" className="w-full px-3 py-2 bg-white border border-[#D9E6EC] rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">Medical College / University</label>
                <input type="text" required placeholder="Johns Hopkins School of Medicine" className="w-full px-3 py-2 bg-white border border-[#D9E6EC] rounded text-sm" />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-xs font-bold text-[#102A43] mb-1">Registration / License Number</label>
              <input type="text" required placeholder="MED-LIC-998231" className="w-full px-3 py-2 bg-white border border-[#D9E6EC] rounded text-sm" />
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-[#F4F9FC] p-4 rounded-lg border border-[#D9E6EC]">
            <h2 className="text-xs font-bold text-[#126B9E] uppercase tracking-wider mb-3">
              Section 3: Hospital Details & Preferences
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">Preferred Department</label>
                <select required className="w-full px-3 py-2 bg-white border border-[#D9E6EC] rounded text-sm">
                  <option value="">Select Department</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="orthopedics">Orthopedics</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">Previous Hospital / Clinic</label>
                <input type="text" required placeholder="City General Hospital" className="w-full px-3 py-2 bg-white border border-[#D9E6EC] rounded text-sm" />
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-[#F4F9FC] p-4 rounded-lg border border-[#D9E6EC]">
            <h2 className="text-xs font-bold text-[#126B9E] uppercase tracking-wider mb-3">
              Section 4: Account Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">Preferred Doctor ID</label>
                <input type="text" required placeholder="DOC-1029" className="w-full px-3 py-2 bg-white border border-[#D9E6EC] rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">Password</label>
                <input type="password" required placeholder="••••••••" className="w-full px-3 py-2 bg-white border border-[#D9E6EC] rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">Confirm Password</label>
                <input type="password" required placeholder="••••••••" className="w-full px-3 py-2 bg-white border border-[#D9E6EC] rounded text-sm" />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3.5 bg-[#E6F4FA] rounded-md border border-[#D9E6EC] text-xs text-[#102A43]">
            <AlertCircle className="w-4 h-4 text-[#2490C9] shrink-0 mt-0.5" />
            <span>
              Your registration request will be reviewed by the hospital administration. You will be able to access the Doctor Portal after approval.
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#2490C9] hover:bg-[#126B9E] text-white font-semibold rounded-md shadow-sm transition-all duration-200"
          >
            Send Registration Request to Admin
          </button>
        </form>

      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#102A43]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-center border border-[#D9E6EC] shadow-md">
            <div className="w-12 h-12 rounded-full bg-[#E6F4FA] text-[#2490C9] mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#102A43]">Registration Request Submitted</h3>
            <p className="text-sm text-[#64748B] mt-2 mb-6">
              Your information has been sent to the MediCare Hospital administration for review.
            </p>
            <Link
              to="/"
              className="inline-block w-full py-2.5 px-4 bg-[#2490C9] hover:bg-[#126B9E] text-white font-semibold rounded-md text-sm"
            >
              Back to Login
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}