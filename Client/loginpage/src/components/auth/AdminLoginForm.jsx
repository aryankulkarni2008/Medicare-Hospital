import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { authService } from '../../services/authService';

export default function AdminLoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    // Simulate a brief validation delay for UX polish
    setTimeout(() => {
      const result = authService.authenticateAdmin(email, password);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setErrorMessage(result.message);
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      {/* Inline error message */}
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-md flex items-start gap-2">
          <span className="mt-0.5 flex-shrink-0">⚠</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
          Admin Email Address
        </label>
        <div className="relative">
          <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            id="admin-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your admin email"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D9E6EC] rounded-md text-sm text-[#102A43] placeholder-[#64748B] focus:outline-none focus:border-[#2490C9] focus:ring-1 focus:ring-[#2490C9]"
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
          Password
        </label>
        <div className="relative">
          <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            id="admin-password"
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

      {/* Remember Me / Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer text-[#64748B]">
          <input type="checkbox" className="rounded border-[#D9E6EC] text-[#2490C9] focus:ring-[#2490C9]" />
          <span>Remember Me</span>
        </label>
        <a href="#forgot" className="text-[#2490C9] hover:text-[#126B9E] font-medium hover:underline">
          Forgot Password?
        </a>
      </div>

      {/* Submit Button */}
      <button
        id="admin-signin-btn"
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-[#2490C9] hover:bg-[#126B9E] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-md shadow-sm transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Signing In...
          </>
        ) : (
          'Sign In to Admin Portal'
        )}
      </button>

      <div className="text-center text-sm text-[#64748B] pt-2">
        Need staff access?{' '}
        <Link to="/register/admin" className="text-[#2490C9] font-semibold hover:text-[#126B9E] hover:underline">
          Staff Registration
        </Link>
      </div>
    </form>
  );
}