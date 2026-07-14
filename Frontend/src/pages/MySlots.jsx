import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { SkeletonTable } from "../components/LoadingSpinner";
import providerDashboardService from "../services/providerDashboardService";
import { extractErrorMessage } from "../services/api";

const MySlots = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await providerDashboardService.getMySlots();
        const sorted = (data.mySlots || []).sort((a, b) => {
          const dateA = a.date ? new Date(a.date) : new Date(0);
          const dateB = b.date ? new Date(b.date) : new Date(0);
          if (dateB.getTime() !== dateA.getTime()) return dateB - dateA;
          return b.time.localeCompare(a.time);
        });
        setSlots(sorted);
      } catch (err) {
        setError(extractErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const correctedDate = new Date(date.getTime() + userTimezoneOffset);
    return correctedDate.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Layout className="bg-[#F8FAFC]">
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 animate-fade-in text-left">
        <PageHeader
          title="My Slots"
          subtitle="Configure availabilities for bookings and assign services"
        >
          <Link to="/provider/slots/create" className="block shrink-0">
            <Button className="text-xs font-bold flex items-center gap-1.5 py-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Create Slot
            </Button>
          </Link>
        </PageHeader>

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-6">
            <SkeletonTable rows={5} />
          </div>
        ) : slots.length === 0 ? (
          <Card className="p-12 text-center bg-white border border-slate-200 mt-6">
            <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <svg
                className="w-7 h-7"
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
            </div>
            <h3 className="text-lg font-bold text-slate-905 mb-1.5">
              No calendar slots active
            </h3>
            <p className="text-sm text-slate-500 mb-5">
              Create your availability options for scheduling customer reservations.
            </p>
            <Link to="/provider/slots/create" className="inline-block">
              <Button className="font-bold flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Create First Slot
              </Button>
            </Link>
          </Card>
        ) : (
          <Card className="bg-white border border-slate-200 overflow-hidden mt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 font-bold select-none text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-4.5 pl-6">Service Type</th>
                    <th className="p-4.5">Date</th>
                    <th className="p-4.5 pr-6 w-44">Scheduled Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {slots.map((slot) => (
                    <tr
                      key={slot._id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="p-4.5 pl-6 text-slate-900 capitalize">
                        {slot.service?.name || "Service Profile Deleted"}
                      </td>
                      <td className="p-4.5 text-slate-500">
                        {formatDate(slot.date)}
                      </td>
                      <td className="p-4.5 pr-6">
                        <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-105 text-blue-600 px-3 py-1 rounded-xl text-xs font-bold">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {slot.time}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </main>
    </Layout>
  );
};

export default MySlots;
