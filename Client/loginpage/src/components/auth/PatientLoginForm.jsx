import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { authService } from '../../services/authService';

export default function PatientLoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const result = authService.authenticatePatient(email, password);
    if (result.success) {
      navigate('/patient/dashboard');
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-md">
          {errorMessage}
        </div>
      )}
      <div>
        <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
          Email Address
        </label>
        <div className="relative">
          <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43] placeholder-[#64748B] focus:outline-none focus:border-[#2490C9] focus:ring-1 focus:ring-[#2490C9]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
          Password
        </label>
        <div className="relative">
          <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43] placeholder-[#64748B] focus:outline-none focus:border-[#2490C9] focus:ring-1 focus:ring-[#2490C9]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#102A43]"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer text-[#64748B]">
          <input type="checkbox" className="rounded border-[#D9E6EC] text-[#2490C9] focus:ring-[#2490C9]" />
          <span>Remember Me</span>
        </label>
        <a href="#forgot" className="text-[#2490C9] hover:text-[#126B9E] font-medium hover:underline">
          Forgot Password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-[#2490C9] hover:bg-[#126B9E] text-white font-semibold rounded-md shadow-sm transition-all duration-200 hover:-translate-y-0.5"
      >
        Sign In
      </button>

      <div className="text-center text-sm text-[#64748B] pt-2">
        Don't have an account?{' '}
        <Link to="/register/patient" className="text-[#2490C9] font-semibold hover:text-[#126B9E] hover:underline">
          Register here
        </Link>
      </div>
    </form>
  );
}