import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState('');

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setApiError('');
    setSuccessMessage('');

    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      setSuccessMessage(response.data.message || 'Registration successful! Redirecting...');
      
      // Auto redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login', { state: { registeredEmail: email, message: 'Registration successful! Please login.' } });
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      const message = err.response?.data?.message || 'Something went wrong. Please try again.';
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-zinc-950 p-4 transition-colors duration-300">
      
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-violet-200/40 dark:bg-violet-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-indigo-200/40 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Register Card */}
      <div className="w-full max-w-[440px] bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl shadow-xl shadow-slate-100/50 dark:shadow-none p-8 relative overflow-hidden transition-all duration-300 z-10">
        
        {/* Brand Accent Top Line */}
        <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 absolute top-0 left-0"></div>

        {/* Header / Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-violet-500/20 mb-3">
            S
          </div>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-zinc-100 tracking-tight">Create an account</h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1 text-center">
            Sign up to start booking and managing your slots
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-4 p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-sm rounded-xl flex items-center gap-2.5 animate-fadeIn">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        {/* API Error Alert */}
        {apiError && (
          <div className="mb-4 p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 text-red-700 dark:text-red-400 text-sm rounded-xl flex items-center gap-2.5 animate-fadeIn">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{apiError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div className="space-y-1 text-left">
            <label htmlFor="name" className="text-xs font-medium text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-xl border bg-transparent text-sm text-slate-800 dark:text-zinc-100 transition-all duration-200 focus:outline-none focus:ring-2 
                  ${errors.name 
                    ? 'border-red-400 dark:border-red-500/50 focus:ring-red-500/10 focus:border-red-500' 
                    : 'border-slate-200 dark:border-zinc-700/80 focus:ring-violet-500/20 focus:border-violet-500'
                  }`}
              />
            </div>
            {errors.name && (
              <span className="text-xs text-red-500 dark:text-red-400 mt-1 block font-medium">
                {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1 text-left">
            <label htmlFor="email" className="text-xs font-medium text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-xl border bg-transparent text-sm text-slate-800 dark:text-zinc-100 transition-all duration-200 focus:outline-none focus:ring-2 
                  ${errors.email 
                    ? 'border-red-400 dark:border-red-500/50 focus:ring-red-500/10 focus:border-red-500' 
                    : 'border-slate-200 dark:border-zinc-700/80 focus:ring-violet-500/20 focus:border-violet-500'
                  }`}
              />
            </div>
            {errors.email && (
              <span className="text-xs text-red-500 dark:text-red-400 mt-1 block font-medium">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1 text-left">
            <label htmlFor="password" className="text-xs font-medium text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-2 rounded-xl border bg-transparent text-sm text-slate-800 dark:text-zinc-100 transition-all duration-200 focus:outline-none focus:ring-2 
                  ${errors.password 
                    ? 'border-red-400 dark:border-red-500/50 focus:ring-red-500/10 focus:border-red-500' 
                    : 'border-slate-200 dark:border-zinc-700/80 focus:ring-violet-500/20 focus:border-violet-500'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 focus:outline-none"
              >
                {showPassword ? (
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-red-500 dark:text-red-400 mt-1 block font-medium">
                {errors.password}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1 text-left">
            <label htmlFor="confirmPassword" className="text-xs font-medium text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-2 rounded-xl border bg-transparent text-sm text-slate-800 dark:text-zinc-100 transition-all duration-200 focus:outline-none focus:ring-2 
                  ${errors.confirmPassword 
                    ? 'border-red-400 dark:border-red-500/50 focus:ring-red-500/10 focus:border-red-500' 
                    : 'border-slate-200 dark:border-zinc-700/80 focus:ring-violet-500/20 focus:border-violet-500'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 focus:outline-none"
              >
                {showConfirmPassword ? (
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-xs text-red-500 dark:text-red-400 mt-1 block font-medium">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 mt-2
              ${isLoading 
                ? 'bg-slate-800 dark:bg-zinc-800 text-slate-400 cursor-not-allowed' 
                : 'bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 focus:ring-slate-900/20 dark:focus:ring-zinc-100/20'
              }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4.5 w-4.5 text-current" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Creating account...</span>
              </>
            ) : (
              <span>Sign up</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100 dark:border-zinc-800/80"></div>
          </div>
          <span className="relative px-3 bg-white dark:bg-zinc-900 text-[10px] font-medium text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
            Or register with
          </span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3.5">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-700 dark:text-zinc-300 font-medium text-xs transition-all duration-200 active:scale-[0.98]"
            onClick={() => alert('Mock Google Sign-Up')}
          >
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.94 5.94 0 018.05 12.57a5.94 5.94 0 015.94-5.94c1.493 0 2.852.547 3.906 1.455l3.223-3.223C19.16 2.99 16.792 2 13.99 2 8.472 2 4 6.472 4 11.99s4.472 9.99 9.99 9.99c5.8 0 9.645-4.077 9.645-9.82 0-.662-.058-1.294-.173-1.875H12.24z"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-700 dark:text-zinc-300 font-medium text-xs transition-all duration-200 active:scale-[0.98]"
            onClick={() => alert('Mock GitHub Sign-In')}
          >
            <svg className="w-3.5 h-3.5 shrink-0 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"/>
            </svg>
            GitHub
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-zinc-400">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
