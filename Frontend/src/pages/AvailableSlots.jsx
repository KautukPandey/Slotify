import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import slotService from "../services/slotService";
import bookingService from "../services/bookingService";
import api, { extractErrorMessage } from "../services/api";

const AvailableSlots = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [note, setNote] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const fetchServiceDetails = useCallback(async () => {
    try {
      const response = await api.get("/services");
      const matched = (response.data.services || []).find((s) => s._id === serviceId);
      setService(matched || null);
    } catch (err) {
      console.error("Failed to fetch service details:", err);
    }
  }, [serviceId]);

  const fetchSlots = useCallback(async () => {
    setSlotsLoading(true);
    setError(null);
    try {
      const data = await slotService.getAvailableSlots(serviceId, selectedDate || undefined);
      setSlots(data.slots || []);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSlotsLoading(false);
    }
  }, [serviceId, selectedDate]);

  useEffect(() => {
    const initPage = async () => {
      setLoading(true);
      await fetchServiceDetails();
      await fetchSlots();
      setLoading(false);
    };
    initPage();
  }, [fetchServiceDetails, fetchSlots]);

  useEffect(() => {
    if (!loading) {
      fetchSlots();
    }
    setSelectedSlot(null);
  }, [selectedDate, fetchSlots]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setBookingLoading(true);
    setBookingError(null);
    setBookingSuccess(false);
    try {
      await bookingService.createBooking(selectedSlot._id, note);
      setBookingSuccess(true);
      setSelectedSlot(null);
      setNote("");
      await fetchSlots();
    } catch (err) {
      setBookingError(extractErrorMessage(err));
    } finally {
      setBookingLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const correctedDate = new Date(date.getTime() + userTimezoneOffset);
    return correctedDate.toLocaleDateString(undefined, {
      weekday: "short", year: "numeric", month: "short", day: "numeric",
    });
  };

  const serviceName = service?.name || "Book Service";

  return (
    <Layout>
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 animate-fade-in">
        <PageHeader
          title={`Book ${serviceName}`}
          subtitle={service ? `Duration: ${service.duration} mins  ·  $${service.price.toFixed(2)}` : ""}
          showBack={true}
        />

        {loading ? (
          <LoadingSpinner message="Loading service details..." />
        ) : !service ? (
          <div className="card p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-zinc-100 mb-1">Service not found</h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400">The service you're looking for doesn't exist.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left Column - Service Info & Slots */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-5 sm:p-6">
                <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100 capitalize mb-2">{service.name}</h3>
                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {service.duration} mins
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ${service.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Date Filter & Slots */}
              <div className="card p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100">Available Time Slots</h3>
                  <div className="flex items-center gap-2">
                    <label htmlFor="slot-date" className="text-xs font-medium text-slate-500 dark:text-zinc-400 whitespace-nowrap">
                      Filter by date:
                    </label>
                    <input
                      id="slot-date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="input w-auto py-1.5 text-xs"
                    />
                    {selectedDate && (
                      <button onClick={() => setSelectedDate("")} className="btn-ghost text-xs px-2 py-1">
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="p-3 mb-4 text-xs text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg">
                    {error}
                  </div>
                )}

                {slotsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
                      <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-zinc-700 border-t-brand-600 animate-spin" />
                      Loading slots...
                    </div>
                  </div>
                ) : slots.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">
                      No open time slots found{selectedDate ? " for this date" : ""}.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {slots.map((slot) => {
                      const isSelected = selectedSlot?._id === slot._id;
                      return (
                        <button
                          key={slot._id}
                          onClick={() => {
                            setSelectedSlot(slot);
                            setBookingSuccess(false);
                            setBookingError(null);
                          }}
                          className={`flex flex-col items-center justify-center p-3.5 text-xs rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20 scale-[1.02]"
                              : "bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-800 dark:text-zinc-100 border-slate-200 dark:border-zinc-700 hover:border-brand-300 dark:hover:border-brand-700"
                          }`}
                        >
                          <span className={`font-semibold ${isSelected ? "text-white" : "text-slate-900 dark:text-zinc-50"}`}>
                            {slot.time}
                          </span>
                          <span className={`text-[10px] mt-1.5 ${isSelected ? "text-brand-200" : "text-slate-500 dark:text-zinc-400"}`}>
                            {formatDate(slot.date)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="space-y-4">
              {bookingSuccess && (
                <div className="card p-5 border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-3 animate-scale-in">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-400">Booking Confirmed!</h4>
                  </div>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300/80 leading-relaxed">
                    Your appointment has been scheduled successfully.
                  </p>
                  <Link to="/bookings" className="btn-primary text-xs w-full justify-center bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/15">
                    View My Bookings
                  </Link>
                </div>
              )}

              {bookingError && (
                <div className="p-3 text-xs text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {bookingError}
                </div>
              )}

              <div className="card p-5 sm:p-6">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-100 mb-4">Booking Summary</h3>

                {selectedSlot ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="text-sm space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-zinc-800">
                        <span className="text-slate-500 dark:text-zinc-400">Date</span>
                        <span className="font-medium text-slate-800 dark:text-zinc-200">{formatDate(selectedSlot.date)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-zinc-800">
                        <span className="text-slate-500 dark:text-zinc-400">Time</span>
                        <span className="font-medium text-slate-800 dark:text-zinc-200">{selectedSlot.time}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-zinc-800">
                        <span className="text-slate-500 dark:text-zinc-400">Duration</span>
                        <span className="font-medium text-slate-800 dark:text-zinc-200">{service.duration} mins</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-500 dark:text-zinc-400">Price</span>
                        <span className="font-bold text-lg text-slate-900 dark:text-zinc-50">${service.price.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="booking-note" className="text-xs font-medium text-slate-600 dark:text-zinc-400">
                        Notes (optional)
                      </label>
                      <textarea
                        id="booking-note"
                        rows="3"
                        placeholder="Any specific requests for the provider..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="input resize-none"
                      />
                    </div>

                    <button type="submit" disabled={bookingLoading} className="btn-primary w-full">
                      {bookingLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Scheduling...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Confirm Booking
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-400 dark:text-zinc-500">
                      {bookingSuccess
                        ? "Choose another slot to book again."
                        : "Please select a time slot to review your booking."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default AvailableSlots;
