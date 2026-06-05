import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute component to restrict unauthenticated access.
 * Shows loading spinner if fetching auth data, redirects to /login if unauthenticated.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Show a premium loading state while verifying user session on page boot
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
        <div className="relative flex items-center justify-center">
          {/* Animated Spinner circles */}
          <div className="w-16 h-16 rounded-full border-4 border-violet-100 dark:border-violet-950/30"></div>
          <div className="absolute w-16 h-16 rounded-full border-4 border-t-violet-600 dark:border-t-violet-400 animate-spin"></div>
          {/* Central Logo Monogram placeholder */}
          <span className="absolute text-violet-600 dark:text-violet-400 font-bold text-lg select-none">S</span>
        </div>
        <p className="mt-4 text-sm font-medium text-slate-500 dark:text-zinc-400 animate-pulse">
          Securing your session...
        </p>
      </div>
    );
  }

  // Redirect unauthenticated user to login screen, saving their target location
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Optional Role-Based Access Control check
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    console.warn(`User with role ${user?.role} tried to access unauthorized route.`);
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
