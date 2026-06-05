import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
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
        // Sort slots chronologically (newest first)
        const sorted = (data.mySlots || []).sort((a, b) => {
          const dateA = a.date ? new Date(a.date) : new Date(0);
          const dateB = b.date ? new Date(b.date) : new Date(0);
          if (dateB.getTime() !== dateA.getTime()) {
            return dateB - dateA;
          }
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
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-150 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto p-6">
        <PageHeader
          title="My Slots"
          subtitle="Configure availabilities for bookings and assign services"
        >
          <Link
            to="/provider/slots/create"
            className="inline-block px-4 py-2 text-xs font-bold text-white bg-violet-605 hover:bg-violet-700 rounded-lg no-underline shadow-sm shadow-violet-500/10"
          >
            + Create Slot
          </Link>
        </PageHeader>

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-slate-500 dark:text-zinc-400">
            Loading scheduled time slots...
          </div>
        ) : slots.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-205 dark:border-zinc-800 space-y-4">
            <p className="text-slate-500 dark:text-zinc-400 mb-0">No time slots scheduled yet.</p>
            <Link
              to="/provider/slots/create"
              className="inline-block px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-755 rounded-lg no-underline"
            >
              Create Your First Slot
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-850 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-zinc-850/50 border-b border-slate-205 dark:border-zinc-800 text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                    <th className="p-4 pl-6">Service Name</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 pr-6">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80">
                  {slots.map((slot) => (
                    <tr key={slot._id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-850/10">
                      <td className="p-4 pl-6 font-bold text-slate-900 dark:text-zinc-150 capitalize">
                        {slot.service?.name || "Service Unavailable"}
                      </td>
                      <td className="p-4 text-slate-650 dark:text-zinc-400">
                        {formatDate(slot.date)}
                      </td>
                      <td className="p-4 pr-6">
                        <span className="inline-block px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                          ⏱️ {slot.time}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MySlots;
