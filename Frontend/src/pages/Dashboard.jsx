import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import providerProfileService from "../services/providerProfileService";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      if (user?.role === "provider") {
        try {
          await providerProfileService.getMyProviderProfile();
          sessionStorage.setItem("hasProviderProfile", "true");
          navigate("/provider/dashboard", { replace: true });
        } catch (err) {
          sessionStorage.removeItem("hasProviderProfile");
          navigate("/provider/create-profile", { replace: true });
        }
      }
    };
    checkProfile();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-150 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 space-y-6">
        <PageHeader
          title="Account Profile"
          subtitle="Manage your personal session details and explore customer actions"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          {/* Profile Details Card */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 p-6 rounded-2xl md:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center font-black uppercase text-xl shadow-sm">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-105 my-0 capitalize">
                  {user?.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Customer account role active
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-zinc-800/80 pt-4 space-y-3">
              <div className="grid grid-cols-3 text-xs">
                <span className="text-slate-400 font-semibold">Email</span>
                <span className="col-span-2 text-slate-800 dark:text-zinc-300 font-mono break-all">{user?.email}</span>
              </div>
              <div className="grid grid-cols-3 text-xs">
                <span className="text-slate-400 font-semibold">City Location</span>
                <span className="col-span-2 text-slate-800 dark:text-zinc-300 capitalize">{user?.city}</span>
              </div>
              <div className="grid grid-cols-3 text-xs">
                <span className="text-slate-400 font-semibold">User Role</span>
                <span className="col-span-2">
                  <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400">
                    {user?.role}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 p-6 rounded-2xl space-y-4">
            <h3 className="text-md font-bold text-slate-900 dark:text-zinc-100 my-0">
              Customer Operations
            </h3>
            <p className="text-xs text-slate-505 dark:text-zinc-400 leading-relaxed">
              Find service providers, schedule open time slots, or track your booking records.
            </p>
            <div className="space-y-2 pt-2">
              <Link
                to="/providers"
                className="w-full text-center py-2.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-750 rounded-xl no-underline block"
              >
                Book a Service
              </Link>
              <Link
                to="/bookings"
                className="w-full text-center py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-750 border border-slate-200 dark:border-zinc-800 rounded-xl no-underline block"
              >
                View My Bookings
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
