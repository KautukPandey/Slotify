import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("hasProviderProfile");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path
      ? "text-violet-650 dark:text-violet-400 font-bold"
      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-150";
  };

  const hasProfile = sessionStorage.getItem("hasProviderProfile") === "true";

  return (
    <nav className="w-full bg-white/85 dark:bg-zinc-900/85 backdrop-blur-md border-b border-slate-205 dark:border-zinc-800/80 px-6 py-4 flex items-center justify-between z-10 sticky top-0">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-md shadow-md shadow-violet-500/15">
            S
          </div>
          <span className="font-bold text-slate-900 dark:text-zinc-50 tracking-tight text-lg">Slotify</span>
        </Link>

        {user?.role === "customer" && (
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link to="/providers" className={`no-underline transition-colors duration-150 ${isActive("/providers")}`}>
              Find Providers
            </Link>
            <Link to="/bookings" className={`no-underline transition-colors duration-150 ${isActive("/bookings")}`}>
              My Bookings
            </Link>
          </div>
        )}

        {user?.role === "provider" && hasProfile && (
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link to="/provider/dashboard" className={`no-underline transition-colors duration-150 ${isActive("/provider/dashboard")}`}>
              Dashboard
            </Link>
            <Link to="/provider/services" className={`no-underline transition-colors duration-150 ${isActive("/provider/services")}`}>
              My Services
            </Link>
            <Link to="/provider/slots" className={`no-underline transition-colors duration-150 ${isActive("/provider/slots")}`}>
              My Slots
            </Link>
            <Link to="/provider/bookings" className={`no-underline transition-colors duration-150 ${isActive("/provider/bookings")}`}>
              Bookings
            </Link>
          </div>
        )}

        {user?.role === "provider" && !hasProfile && (
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link to="/provider/create-profile" className={`no-underline transition-colors duration-150 ${isActive("/provider/create-profile")}`}>
              Create Profile
            </Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {user?.role === "customer" && (
          <div className="flex md:hidden items-center gap-3 text-xs font-semibold">
            <Link to="/providers" className={`no-underline ${isActive("/providers")}`}>
              Providers
            </Link>
            <Link to="/bookings" className={`no-underline ${isActive("/bookings")}`}>
              Bookings
            </Link>
          </div>
        )}

        {user?.role === "provider" && hasProfile && (
          <div className="flex md:hidden items-center gap-2 text-[10px] font-semibold">
            <Link to="/provider/dashboard" className={`no-underline ${isActive("/provider/dashboard")}`}>
              Dashboard
            </Link>
            <Link to="/provider/services" className={`no-underline ${isActive("/provider/services")}`}>
              Services
            </Link>
            <Link to="/provider/slots" className={`no-underline ${isActive("/provider/slots")}`}>
              Slots
            </Link>
            <Link to="/provider/bookings" className={`no-underline ${isActive("/provider/bookings")}`}>
              Bookings
            </Link>
          </div>
        )}

        {user?.role === "provider" && !hasProfile && (
          <div className="flex md:hidden items-center gap-2 text-[10px] font-semibold">
            <Link to="/provider/create-profile" className={`no-underline ${isActive("/provider/create-profile")}`}>
              Create Profile
            </Link>
          </div>
        )}

        {user ? (
          <>
            <span className="hidden sm:inline text-xs text-slate-500 dark:text-zinc-400 font-medium">
              {user.name} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold text-slate-650 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 border border-slate-200 dark:border-zinc-800 bg-transparent rounded-lg hover:bg-red-50/50 dark:hover:bg-red-950/20 hover:border-red-200/50 transition-all duration-150 cursor-pointer"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-150 no-underline"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg no-underline shadow-sm shadow-violet-500/10"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
