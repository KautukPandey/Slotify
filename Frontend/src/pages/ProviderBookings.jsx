import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import providerBookingService from "../services/providerBookingService";
import { extractErrorMessage } from "../services/api";

const ProviderBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [actionError, setActionError] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await providerBookingService.getProviderBookings();
      // Sort chronologically (newest appointment date first)
      const sorted = (data.providerBookings || []).sort((a, b) => {
        const dateA = a.slot?.date ? new Date(a.slot.date) : new Date(0);
        const dateB = b.slot?.date ? new Date(b.slot.date) : new Date(0);
        return dateB - dateA;
      });
      setBookings(sorted);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleMarkCompleted = async (bookingId) => {
    setActionError(null);
    setActionLoadingId(bookingId);
    try {
      await providerBookingService.completeBooking(bookingId);
      // Immediately update local UI status
      setBookings((prevBookings) =>
        prevBookings.map((b) =>
          b._id === bookingId ? { ...b, status: "completed" } : b
        )
      );
    } catch (err) {
      setActionError(extractErrorMessage(err));
    } finally {
      setActionLoadingId(null);
    }
  };

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

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 text-green-750 dark:bg-green-950/20 dark:text-green-400 border border-green-200/50";
      case "cancelled":
        return "bg-red-50 text-red-755 dark:bg-red-950/20 dark:text-red-400 border border-red-200/50";
      case "completed":
        return "bg-blue-50 text-blue-750 dark:bg-blue-950/20 dark:text-blue-400 border border-blue-200/50";
      default:
        return "bg-slate-50 text-slate-700 dark:bg-zinc-800 dark:text-zinc-400 border border-slate-200/50";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-150 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto p-6">
        <PageHeader
          title="Customer Bookings"
          subtitle="Track customer appointments, review instruction notes, and mark completed sessions"
        />

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl">
            {error}
          </div>
        )}

        {actionError && (
          <div className="p-3 mb-4 text-xs text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg">
            Failed to complete booking: {actionError}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-slate-500 dark:text-zinc-400">
            Loading appointment bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800">
            <p className="text-slate-500 dark:text-zinc-400">No customer bookings found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const isActionLoading = actionLoadingId === booking._id;
              const isConfirmed = booking.status === "confirmed";

              return (
                <div
                  key={booking._id}
                  className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-850 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-sm transition-shadow duration-150"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusBadgeClass(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 capitalize my-0 pt-0.5">
                      {booking.service?.name || "Service Unavailable"}
                    </h3>

                    <div className="text-xs text-slate-650 dark:text-zinc-400 space-y-1">
                      <p className="my-0">
                        <span className="font-semibold text-slate-500 dark:text-zinc-500">Customer:</span> {booking.customer?.name || "N/A"} ({booking.customer?.email || "N/A"})
                      </p>
                      <p className="my-0">
                        <span className="font-semibold text-slate-500 dark:text-zinc-500">Schedule:</span> {formatDate(booking.slot?.date)} at {booking.slot?.time || "N/A"}
                      </p>
                      {booking.note && (
                        <p className="my-0 italic text-slate-500 dark:text-zinc-500 pt-1">
                          &ldquo;{booking.note}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-end">
                    {isConfirmed && (
                      <button
                        onClick={() => handleMarkCompleted(booking._id)}
                        disabled={isActionLoading}
                        className="w-full md:w-auto px-4 py-2 text-xs font-bold text-violet-600 hover:text-white border border-violet-200 hover:bg-violet-600 rounded-lg transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                      >
                        {isActionLoading ? "Processing..." : "Mark Completed"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProviderBookings;
