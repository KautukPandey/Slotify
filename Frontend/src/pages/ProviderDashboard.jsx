import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { SkeletonStats } from "../components/LoadingSpinner";
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

  const businessName = profile?.businessName || user?.name || "Provider";

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const statCards = [
    {
      label: "Active Services",
      value: counts.services,
      icon: (
        <svg
          className="w-5 h-5 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      ),
      color: "bg-blue-50 border border-blue-100/50",
    },
    {
      label: "Scheduled Slots",
      value: counts.slots,
      icon: (
        <svg
          className="w-5 h-5 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
      ),
      color: "bg-indigo-50 border border-indigo-100/50",
    },
    {
      label: "Total Bookings",
      value: counts.bookings,
      icon: (
        <svg
          className="w-5 h-5 text-emerald-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25"
          />
        </svg>
      ),
      color: "bg-emerald-50 border border-emerald-100/50",
    },
  ];

  const quickActions = [
    {
      title: "Services Management",
      desc: "Configure your service catalog with pricing and durations.",
      links: [
        { to: "/provider/services", label: "View Services" },
        { to: "/provider/services/create", label: "Add Service", primary: true },
      ],
    },
    {
      title: "Slots Configuration",
      desc: "Define dates and time availabilities for your services.",
      links: [
        { to: "/provider/slots", label: "View Slots" },
        { to: "/provider/slots/create", label: "Add Slot", primary: true },
      ],
    },
    {
      title: "Customer Appointments",
      desc: "Track client bookings, review notes, and complete sessions.",
      links: [
        { to: "/provider/bookings", label: "Manage Appointments", primary: true },
      ],
      colSpan: true,
    },
  ];

  return (
    <Layout className="bg-[#F8FAFC]">
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-8 animate-fade-in text-left">
        {/* Header */}
        <div className="space-y-1.5 pb-2 border-b border-slate-100">
          <h1 className="text-2xl sm:text-[30px] font-extrabold text-slate-900 tracking-tight leading-tight capitalize">
            Welcome back, {businessName}
          </h1>
          <p className="text-sm font-semibold text-slate-400 select-none">{today}</p>
        </div>

        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
            {error}
          </div>
        )}

        {loading ? (
          <SkeletonStats />
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {statCards.map((stat) => (
                <Card key={stat.label} className="bg-white border border-slate-200 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider select-none">
                      {stat.label}
                    </span>
                    <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center`}>
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4 pt-2">
              <h2 className="text-lg font-extrabold text-slate-900 select-none">
                Workspace Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <Card
                    key={action.title}
                    className={`bg-white border border-slate-200 p-5 flex flex-col justify-between gap-4 ${action.colSpan ? "md:col-span-2" : ""
                      }`}
                  >
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-905">
                        {action.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {action.desc}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {action.links.map((link) => (
                        <Link key={link.to} to={link.to} className="block">
                          <Button
                            variant={link.primary ? "primary" : "secondary"}
                            className="text-xs font-bold py-2 px-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                          >
                            {link.label}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </Layout>
  );
};

export default ProviderDashboard;
