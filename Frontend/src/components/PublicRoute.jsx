import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950">
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border-3 border-slate-200 dark:border-zinc-700" />
          <div className="absolute w-14 h-14 rounded-full border-3 border-t-brand-600 dark:border-t-brand-400 animate-spin" />
          <span className="absolute text-brand-600 dark:text-brand-400 font-bold text-base select-none">S</span>
        </div>
        <p className="mt-4 text-sm font-medium text-slate-500 dark:text-zinc-400 animate-pulse">
          Securing your session...
        </p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
