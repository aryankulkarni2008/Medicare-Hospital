import React, { useState } from 'react';
import { useDoctor } from '../context/DoctorContext';
import { User, Star, Edit2, Save, X, Mail, Phone, Building, Award, Stethoscope, DollarSign } from 'lucide-react';
import DoctorAvatar from '../components/common/DoctorAvatar';

export const DoctorProfile = () => {
  const { doctorProfile, updateDoctorProfile } = useDoctor();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...doctorProfile });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateDoctorProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...doctorProfile });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1000px]">
      {/* Header Banner Card */}
      <div className="bg-white rounded-xl border border-[#D9E6EC] p-[1.75rem] flex justify-between items-center flex-wrap gap-5 shadow-[0_1px_3px_rgba(16,42,67,0.05)]">
        <div className="flex items-center gap-5">
          <DoctorAvatar
            name={doctorProfile.name}
            photo={doctorProfile.avatar}
            className="w-[86px] h-[86px] rounded-full object-cover border-3 border-[#2490C9] shadow-[0_4px_10px_rgba(36,144,201,0.15)]"
          />
          <div>
            <h1 className="text-[1.4rem] font-bold text-[#102A43] mb-1">
              {doctorProfile.name}
            </h1>
            <p className="text-[#2490C9] font-semibold text-[0.95rem] mb-1.5">
              {doctorProfile.title} • {doctorProfile.department}
            </p>
            <div className="flex items-center gap-1.5 text-[0.85rem] text-[#64748B]">
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <strong className="text-[#102A43]">{doctorProfile.rating}</strong>
              <span>({doctorProfile.reviewCount} patient reviews)</span>
            </div>
          </div>
        </div>

        {!isEditing ? (
          <button
            className="inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#2490C9] bg-[#2490C9] text-white hover:bg-[#126B9E]"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 size={16} />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex gap-2.5">
            <button
              className="inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#102A43] hover:bg-[#F4F9FC]"
              onClick={handleCancel}
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#10B981] bg-[#10B981] text-white hover:bg-[#059669]"
              onClick={handleSave}
            >
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* Professional Information */}
        <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)]">
          <h2 className="text-[1.1rem] font-semibold text-[#102A43] mb-5 border-b border-[#D9E6EC] pb-2.5 flex items-center gap-2">
            <Stethoscope size={18} color="#2490C9" />
            <span>Professional Information</span>
          </h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-sm font-medium text-[#102A43]">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              ) : (
                <div className="font-semibold text-[#102A43] text-[0.925rem] py-2">
                  {doctorProfile.name}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-sm font-medium text-[#102A43]">Specialization</label>
              {isEditing ? (
                <input
                  type="text"
                  name="title"
                  className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              ) : (
                <div className="font-semibold text-[#102A43] text-[0.925rem] py-2">
                  {doctorProfile.title}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-sm font-medium text-[#102A43]">Department</label>
              {isEditing ? (
                <input
                  type="text"
                  name="department"
                  className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              ) : (
                <div className="font-semibold text-[#102A43] text-[0.925rem] py-2">
                  {doctorProfile.department}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-sm font-medium text-[#102A43]">Experience</label>
              {isEditing ? (
                <input
                  type="text"
                  name="experience"
                  className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              ) : (
                <div className="font-semibold text-[#102A43] text-[0.925rem] py-2">
                  {doctorProfile.experience}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-sm font-medium text-[#102A43]">Qualification</label>
              {isEditing ? (
                <input
                  type="text"
                  name="qualification"
                  className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
                  value={formData.qualification}
                  onChange={handleChange}
                  required
                />
              ) : (
                <div className="font-semibold text-[#102A43] text-[0.925rem] py-2">
                  {doctorProfile.qualification}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-sm font-medium text-[#102A43]">Consultation Fee</label>
              {isEditing ? (
                <input
                  type="text"
                  name="consultationFee"
                  className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  required
                />
              ) : (
                <div className="font-semibold text-[#047857] text-[0.925rem] py-2">
                  {doctorProfile.consultationFee}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-sm font-medium text-[#102A43]">Hospital</label>
              {isEditing ? (
                <input
                  type="text"
                  name="hospital"
                  className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
                  value={formData.hospital}
                  onChange={handleChange}
                  required
                />
              ) : (
                <div className="font-semibold text-[#102A43] text-[0.925rem] py-2">
                  {doctorProfile.hospital}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)]">
          <h2 className="text-[1.1rem] font-semibold text-[#102A43] mb-5 border-b border-[#D9E6EC] pb-2.5 flex items-center gap-2">
            <Mail size={18} color="#2490C9" />
            <span>Contact Information</span>
          </h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-sm font-medium text-[#102A43]">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              ) : (
                <div className="font-semibold text-[#102A43] text-[0.925rem] py-2">
                  {doctorProfile.email}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-sm font-medium text-[#102A43]">Phone Number</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              ) : (
                <div className="font-semibold text-[#102A43] text-[0.925rem] py-2">
                  {doctorProfile.phone}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white border border-[#D9E6EC] rounded-[10px] p-5 shadow-[0_1px_3px_rgba(16,42,67,0.06)]">
          <h2 className="text-[1.1rem] font-semibold text-[#102A43] mb-5 border-b border-[#D9E6EC] pb-2.5 flex items-center gap-2">
            <User size={18} color="#2490C9" />
            <span>About Doctor</span>
          </h2>

          <div className="flex flex-col gap-1.5 mb-4">
            {isEditing ? (
              <textarea
                name="about"
                className="w-full px-[0.85rem] py-[0.55rem] text-sm text-[#102A43] bg-white border border-[#D9E6EC] rounded-[6px] outline-none transition-colors focus:border-[#2490C9] focus:ring-2 focus:ring-[#2490C9]/15"
                rows={4}
                value={formData.about}
                onChange={handleChange}
              />
            ) : (
              <p className="text-[#102A43] text-sm leading-relaxed m-0">
                {doctorProfile.about}
              </p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#D9E6EC] bg-white text-[#102A43] hover:bg-[#F4F9FC]"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-[1.1rem] py-[0.55rem] text-sm font-medium rounded-[6px] cursor-pointer transition-all border border-[#10B981] bg-[#10B981] text-white hover:bg-[#059669]"
            >
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default DoctorProfile;
