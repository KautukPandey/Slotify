import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import providerProfileService from "../services/providerProfileService";
import Layout from "../components/Layout";
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

  const getInitials = (name) => (name || "U").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <Layout>
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 animate-fade-in">
        <PageHeader
          title="Account Profile"
          subtitle="Manage your personal session details and explore customer actions"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="card p-6 lg:col-span-2 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-500 to-accent-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                {getInitials(user?.name)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-zinc-100 capitalize">{user?.name}</h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400">Customer account</p>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-zinc-800 pt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 text-sm">
                <span className="text-slate-400 font-medium">Email</span>
                <span className="sm:col-span-2 text-slate-800 dark:text-zinc-300">{user?.email}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 text-sm">
                <span className="text-slate-400 font-medium">Location</span>
                <span className="sm:col-span-2 text-slate-800 dark:text-zinc-300 capitalize">{user?.city || "Not set"}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 text-sm">
                <span className="text-slate-400 font-medium">Role</span>
                <span className="sm:col-span-2">
                  <span className="badge-emerald">{user?.role}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-100">Quick Actions</h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
              Find service providers, schedule appointments, or track your booking records.
            </p>
            <div className="space-y-3 pt-2">
              <Link to="/providers" className="btn-primary w-full justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                Book a Service
              </Link>
              <Link to="/bookings" className="btn-secondary w-full justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12z" />
                </svg>
                View My Bookings
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Dashboard;
