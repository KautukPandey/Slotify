import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import providerProfileService from "../services/providerProfileService";

const ProviderProfileRoute = ({ children }) => {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [hasProfile, setHasProfile] = useState(null);

  useEffect(() => {
    const checkProfile = async () => {
      if (authLoading) return;
      if (!isAuthenticated || user?.role !== "provider") {
        setHasProfile(false);
        return;
      }

      if (sessionStorage.getItem("hasProviderProfile") === "true") {
        setHasProfile(true);
        return;
      }

      try {
        await providerProfileService.getMyProviderProfile();
        sessionStorage.setItem("hasProviderProfile", "true");
        setHasProfile(true);
      } catch (err) {
        sessionStorage.removeItem("hasProviderProfile");
        setHasProfile(false);
      }
    };

    checkProfile();
  }, [isAuthenticated, authLoading, user]);

  if (authLoading || hasProfile === null) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950">
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border-3 border-slate-200 dark:border-zinc-700" />
          <div className="absolute w-14 h-14 rounded-full border-3 border-t-brand-600 dark:border-t-brand-400 animate-spin" />
        </div>
        <p className="mt-4 text-sm font-medium text-slate-500 dark:text-zinc-400 animate-pulse">
          Checking provider profile...
        </p>
      </div>
    );
  }

  if (!hasProfile) {
    return <Navigate to="/provider/create-profile" replace />;
  }

  return children;
};

export default ProviderProfileRoute;
