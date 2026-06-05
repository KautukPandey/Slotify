import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";
import providerDashboardService from "../services/providerDashboardService";
import providerBookingService from "../services/providerBookingService";
import { extractErrorMessage } from "../services/api";

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [counts, setCounts] = useState({ services: 0, slots: 0, bookings: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        let providerProfile = null;
        try {
          const profileData = await providerDashboardService.getProfile();
          providerProfile = profileData.provider;
          setProfile(providerProfile);
        } catch (err) {
          console.warn("Could not load provider profile:", err);
        }

        // Fetch counts in parallel
        const [servicesData, slotsData, bookingsData] = await Promise.all([
          providerDashboardService.getMyServices().catch(() => ({ myServices: [] })),
          providerDashboardService.getMySlots().catch(() => ({ mySlots: [] })),
          providerBookingService.getProviderBookings().catch(() => ({ providerBookings: [] })),
        ]);

        setCounts({
          services: servicesData.myServices?.length || 0,
          slots: slotsData.mySlots?.length || 0,
          bookings: bookingsData.providerBookings?.length || 0,
        });
      } catch (err) {
        setError(extractErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const businessName = profile?.businessName || user?.name || "Provider Workspace";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-150 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto p-6 space-y-6">
        <PageHeader
          title="Provider Workspace"
          subtitle={`Welcome back, ${businessName}`}
        />

        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-slate-500 dark:text-zinc-400">
            Loading workspace statistics...
          </div>
        ) : (
          <div className="space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-850 p-6 rounded-2xl shadow-sm">
                <span className="text-xs text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                  Active Services
                </span>
                <p className="text-4xl font-black text-slate-900 dark:text-zinc-50 mt-1 my-0">
                  {counts.services}
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-855 p-6 rounded-2xl shadow-sm">
                <span className="text-xs text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                  Scheduled Slots
                </span>
                <p className="text-4xl font-black text-slate-900 dark:text-zinc-50 mt-1 my-0">
                  {counts.slots}
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-855 p-6 rounded-2xl shadow-sm">
                <span className="text-xs text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                  Appointments Booked
                </span>
                <p className="text-4xl font-black text-slate-900 dark:text-zinc-50 mt-1 my-0">
                  {counts.bookings}
                </p>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100 my-0">
                Workspace Operations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Services Card */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-855 p-6 rounded-2xl flex flex-col justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-md font-bold text-slate-900 dark:text-zinc-100 my-0">
                      Services Management
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                      Configure and list service catalog details, pricing and durations.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to="/provider/services"
                      className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-750 rounded-lg no-underline transition-colors"
                    >
                      View Services
                    </Link>
                    <Link
                      to="/provider/services/create"
                      className="px-4 py-2 text-xs font-bold text-white bg-violet-650 hover:bg-violet-700 rounded-lg no-underline transition-colors shadow-sm shadow-violet-500/10"
                    >
                      Add Service
                    </Link>
                  </div>
                </div>

                {/* Slots Card */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-855 p-6 rounded-2xl flex flex-col justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-md font-bold text-slate-900 dark:text-zinc-100 my-0">
                      Slots Configuration
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                      Define dates and time availabilities for your services.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to="/provider/slots"
                      className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-750 rounded-lg no-underline transition-colors"
                    >
                      View Slots
                    </Link>
                    <Link
                      to="/provider/slots/create"
                      className="px-4 py-2 text-xs font-bold text-white bg-violet-650 hover:bg-violet-700 rounded-lg no-underline transition-colors shadow-sm shadow-violet-500/10"
                    >
                      Add Slot
                    </Link>
                  </div>
                </div>

                {/* Bookings Card */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-855 p-6 rounded-2xl flex flex-col justify-between gap-4 md:col-span-2">
                  <div className="space-y-1">
                    <h3 className="text-md font-bold text-slate-900 dark:text-zinc-100 my-0">
                      Customer Appointments Tracker
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                      Track active client bookings, view instruction notes, and mark completed sessions.
                    </p>
                  </div>
                  <div>
                    <Link
                      to="/provider/bookings"
                      className="inline-block px-4 py-2.5 text-xs font-bold text-white bg-violet-605 hover:bg-violet-700 rounded-lg no-underline transition-colors shadow-sm shadow-violet-500/10"
                    >
                      Manage Appointments
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProviderDashboard;
