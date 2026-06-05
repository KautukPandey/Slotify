import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PublicRoute component. Redirects authenticated users to the dashboard.
 * Used to guard /login and /register pages.
 */
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show a loading screen while resolving auth status to prevent layout flashing
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-violet-100 dark:border-violet-950/30"></div>
          <div className="absolute w-16 h-16 rounded-full border-4 border-t-violet-600 dark:border-t-violet-400 animate-spin"></div>
          <span className="absolute text-violet-600 dark:text-violet-400 font-bold text-lg select-none">S</span>
        </div>
        <p className="mt-4 text-sm font-medium text-slate-500 dark:text-zinc-400 animate-pulse">
          Securing your session...
        </p>
      </div>
    );
  }

  // If already logged in, redirect user to the dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
