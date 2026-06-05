import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Landing = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-150 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <header className="relative py-20 md:py-28 text-center max-w-4xl mx-auto px-6 space-y-6 z-10 overflow-hidden">
        {/* Blob decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-300/20 dark:bg-violet-900/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-violet-100 text-violet-750 dark:bg-violet-950/40 dark:text-violet-400 mb-2">
          ✨ Effortless Appointments Scheduling
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-zinc-50 tracking-tight leading-none my-0 max-w-3xl mx-auto">
          Book appointments <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">effortlessly</span>.
        </h1>
        
        <p className="text-base md:text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Connect customers and service providers through a simple, robust scheduling experience. Find local businesses, browse services, select times, and manage bookings all in one place.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {isAuthenticated ? (
            <Link
              to={user?.role === "provider" ? "/provider/dashboard" : "/dashboard"}
              className="px-6 py-3 text-sm font-bold text-white bg-violet-605 hover:bg-violet-705 rounded-xl no-underline shadow-md shadow-violet-600/15"
            >
              Go to Dashboard &rarr;
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="px-6 py-3 text-sm font-bold text-white bg-violet-605 hover:bg-violet-705 rounded-xl no-underline shadow-md shadow-violet-600/15"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 text-sm font-bold text-slate-700 bg-white border border-slate-205 hover:bg-slate-50 dark:text-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-850 rounded-xl no-underline"
              >
                Sign In
              </Link>
            </>
          )}
          
          <Link
            to="/providers"
            className="px-6 py-3 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline no-underline"
          >
            Explore Providers &rarr;
          </Link>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-white dark:bg-zinc-900 border-y border-slate-200 dark:border-zinc-800/80 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <h3 className="text-3xl font-black text-slate-900 dark:text-zinc-50">150+</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Service Providers</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-black text-slate-900 dark:text-zinc-50">600+</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Active Services</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-black text-slate-900 dark:text-zinc-50">10k+</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Appointments Booked</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 max-w-5xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-zinc-50 my-0">
            Platform Capabilities
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            Everything you need to schedule, manage, and complete client bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 p-6 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-lg">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 my-0">Discover Providers</h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
              Browse localized business directory, search by cities, and check provider reviews, bios, and open catalogs.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 p-6 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-lg">
              📅
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 my-0">Easy Appointment Booking</h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
              Select your desired service, pick a date and time slot from the live calendar, add optional notes, and book instantly.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 p-6 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-lg">
              📝
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 my-0">Manage Appointments</h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
              Track upcoming sessions, review notes, and cancel appointments with automated status updates for providers.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 p-6 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-lg">
              💼
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 my-0">Provider Workspace</h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
              Create services with customized pricing/durations, open slots, track customer bookings, and mark appointments as completed.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-white dark:bg-zinc-900 border-y border-slate-200 dark:border-zinc-800/80 py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-zinc-50 my-0">
              How Slotify Works
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              A streamlined flow for customers and service providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Customer Flow */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100 pb-2 border-b border-slate-100 dark:border-zinc-800">
                For Customers
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400 flex items-center justify-center font-black shrink-0 text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-zinc-200 my-0 text-sm">Find Provider</h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-450 mt-1">Search the directory by city to locate local service providers.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400 flex items-center justify-center font-black shrink-0 text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-zinc-200 my-0 text-sm">Select Service</h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-450 mt-1">Check their details card and select the offering you need.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400 flex items-center justify-center font-black shrink-0 text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-zinc-200 my-0 text-sm">Book Slot</h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-450 mt-1">Select an open calendar slot, add optional note instructions, and confirm.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Flow */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100 pb-2 border-b border-slate-100 dark:border-zinc-800">
                For Providers
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400 flex items-center justify-center font-black shrink-0 text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-zinc-200 my-0 text-sm">Create Service</h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-450 mt-1">Set up service titles, write descriptions, specify duration and custom prices.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400 flex items-center justify-center font-black shrink-0 text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-zinc-200 my-0 text-sm">Create Slots</h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-450 mt-1">Open calendar time ranges and link them to your created services.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400 flex items-center justify-center font-black shrink-0 text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-zinc-200 my-0 text-sm">Manage Bookings</h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-450 mt-1">Review guest lists, check appointment notes, and mark completed bookings.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-zinc-900/40 border-t border-slate-200 dark:border-zinc-800/80 py-12 mt-auto">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm">
              S
            </div>
            <span className="font-bold text-slate-900 dark:text-zinc-100 tracking-tight">Slotify</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-zinc-400 font-medium">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="no-underline hover:text-violet-650 transition-colors">
              GitHub
            </a>
            <a href="mailto:support@slotify.com" className="no-underline hover:text-violet-650 transition-colors">
              Contact Support
            </a>
            <span>&copy; {new Date().getFullYear()} Slotify Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
