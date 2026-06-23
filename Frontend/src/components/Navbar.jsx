import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("hasProviderProfile");
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-brand-700 dark:text-brand-400 font-semibold"
      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200";

  const hasProfile = sessionStorage.getItem("hasProviderProfile") === "true";

  const customerLinks = [
    { to: "/providers", label: "Find Providers" },
    { to: "/bookings", label: "My Bookings" },
  ];

  const providerLinks = [
    { to: "/provider/dashboard", label: "Dashboard" },
    { to: "/provider/services", label: "Services" },
    { to: "/provider/slots", label: "Slots" },
    { to: "/provider/bookings", label: "Bookings" },
  ];

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline shrink-0">
            <span className="font-bold text-xl text-brand-700 dark:text-brand-400 tracking-tight">Slotify</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 mx-6">
            {user?.role === "customer" &&
              customerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors no-underline ${isActive(link.to)}`}
                >
                  {link.label}
                  {location.pathname === link.to && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-600 dark:bg-brand-400 rounded-full" />
                  )}
                </Link>
              ))}
            {user?.role === "provider" && hasProfile &&
              providerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors no-underline ${isActive(link.to)}`}
                >
                  {link.label}
                  {location.pathname === link.to && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-600 dark:bg-brand-400 rounded-full" />
                  )}
                </Link>
              ))}
            {user?.role === "provider" && !hasProfile && (
              <Link
                to="/provider/create-profile"
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors no-underline ${isActive("/provider/create-profile")}`}
              >
                Create Profile
                {location.pathname === "/provider/create-profile" && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-600 dark:bg-brand-400 rounded-full" />
                )}
              </Link>
            )}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer bg-transparent border-none"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold">
                    {getInitials(user.name)}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-tight">{user.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 capitalize leading-tight">{user.role}</p>
                  </div>
                  <svg className={`w-4 h-4 text-slate-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0f172a] rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 py-1.5 animate-scale-in origin-top-right">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center gap-2 cursor-pointer bg-transparent border-none"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 no-underline transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Join as Pro
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer bg-transparent border-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617] animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {user && (
              <div className="flex items-center gap-3 px-3 py-3 mb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-bold">
                  {getInitials(user.name)}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{user.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user.role}</p>
                </div>
              </div>
            )}

            {user?.role === "customer" &&
              customerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-lg no-underline transition-colors ${
                    location.pathname === link.to
                      ? "text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/30"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            {user?.role === "provider" && hasProfile &&
              providerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-lg no-underline transition-colors ${
                    location.pathname === link.to
                      ? "text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/30"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            {user?.role === "provider" && !hasProfile && (
              <Link
                to="/provider/create-profile"
                className={`block px-3 py-2.5 text-sm font-medium rounded-lg no-underline transition-colors ${
                  location.pathname === "/provider/create-profile"
                    ? "text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/30"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                Create Profile
              </Link>
            )}

            {!user && (
              <div className="space-y-2 pt-2">
                <Link
                  to="/login"
                  className="block px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg no-underline transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg no-underline transition-colors text-center"
                >
                  Join as Pro
                </Link>
              </div>
            )}

            {user && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors flex items-center gap-2 cursor-pointer bg-transparent border-none"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
