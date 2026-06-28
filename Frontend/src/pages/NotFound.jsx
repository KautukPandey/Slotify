import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#020617] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 animate-scale-in">
        <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-brand-600 to-accent-600">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Oops! The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <Link to="/" className="btn-primary px-6 py-3 inline-flex">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
