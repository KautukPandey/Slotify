import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { SkeletonCard } from "../components/LoadingSpinner";
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
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: "completed" } : b))
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="amber">Confirmed</Badge>;
      case "completed":
        return <Badge variant="blue">Completed</Badge>;
      case "cancelled":
        return <Badge variant="red">Cancelled</Badge>;
      default:
        return <Badge variant="slate">{status}</Badge>;
    }
  };

  return (
    <Layout className="bg-[#F8FAFC]">
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 animate-fade-in text-left">
        <PageHeader
          title="Customer Bookings"
          subtitle="Track appointments, review notes, and mark sessions as completed"
        />

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
            {error}
          </div>
        )}

        {actionError && (
          <div className="p-3.5 mb-4 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
            {actionError}
          </div>
        )}

        {loading ? (
          <div className="space-y-4 mt-6">
            <SkeletonCard count={3} />
          </div>
        ) : bookings.length === 0 ? (
          <Card className="p-12 text-center bg-white border border-slate-205 mt-6">
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
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-905 mb-1.5 animate-fade-in">
              No appointments active
            </h3>
            <p className="text-sm text-slate-500">
              Customer bookings will appear here once they start scheduling slots.
            </p>
          </Card>
        ) : (
          <div className="space-y-4 mt-6">
            {bookings.map((booking) => {
              const isActionLoading = actionLoadingId === booking._id;
              const isConfirmed = booking.status === "confirmed";

              return (
                <Card
                  key={booking._id}
                  className="bg-white border border-slate-200 p-5 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        {getStatusBadge(booking.status)}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 capitalize">
                        {booking.service?.name || "Service Profile Deleted"}
                      </h3>
                      <div className="text-sm text-slate-500 space-y-1.5 font-semibold">
                        <p className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-slate-400 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>
                            <span className="font-bold text-slate-400">
                              Client:
                            </span>{" "}
                            {booking.customer?.name || "N/A"} (
                            {booking.customer?.email || "N/A"})
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-slate-400 shrink-0"
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
                          <span>
                            <span className="font-bold text-slate-400">
                              Schedule:
                            </span>{" "}
                            {formatDate(booking.slot?.date)} at{" "}
                            {booking.slot?.time || "N/A"}
                          </span>
                        </p>
                        {booking.note && (
                          <p className="flex items-start gap-2 italic text-slate-450 pt-1">
                            <svg
                              className="w-4 h-4 text-slate-400 shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                              />
                            </svg>
                            <span>&ldquo;{booking.note}&rdquo;</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 mt-4 sm:mt-0">
                      {isConfirmed && (
                        <Button
                          onClick={() => handleMarkCompleted(booking._id)}
                          isLoading={isActionLoading}
                          className="text-xs py-2 px-4 shadow-[0_1px_2px_rgba(37,99,235,0.05)] w-full sm:w-auto font-bold flex items-center justify-center gap-1.5"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Mark Completed
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </Layout>
  );
};

export default ProviderBookings;
