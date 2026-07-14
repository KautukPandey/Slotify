import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
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
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const serviceName = service?.name || "Book Service";

  return (
    <Layout className="bg-[#F8FAFC]">
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 animate-fade-in text-left">
        <PageHeader
          title={`Book ${serviceName}`}
          subtitle={
            service
              ? `Duration: ${service.duration} mins  ·  $${service.price.toFixed(2)}`
              : ""
          }
          showBack={true}
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner message="Retrieving service options & calendars..." />
          </div>
        ) : !service ? (
          <Card className="p-12 text-center bg-white border border-slate-205">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Service details not found
            </h3>
            <p className="text-sm text-slate-500">
              The service or class you requested is not active.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-6">
            {/* Left Column - Service Info & Slots */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white border border-slate-200 p-5 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-slate-900 capitalize">
                    {service.name}
                  </h3>
                  <Badge variant="blue" className="font-bold">
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 border border-slate-200/50 text-slate-600">
                    <svg
                      className="w-3.5 h-3.5 text-slate-400"
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
                    {service.duration} mins
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-blue-50 border border-blue-100/50 text-blue-600">
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
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    ${service.price.toFixed(2)}
                  </span>
                </div>
              </Card>

              {/* Date Filter & Slots Card */}
              <Card className="bg-white border border-slate-200 p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-2 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900">
                    Select a Time Slot
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400">
                      Filter Date:
                    </span>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="input py-1.5 px-3 text-xs w-[140px]"
                    />
                    {selectedDate && (
                      <Button
                        variant="ghost"
                        onClick={() => setSelectedDate("")}
                        className="text-xs px-2.5 py-1.5"
                      >
                        Reset
                      </Button>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="p-3 mb-4 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
                    {error}
                  </div>
                )}

                {slotsLoading ? (
                  <div className="flex items-center justify-center py-10">
                    <div className="flex items-center gap-2 text-sm text-slate-400 font-bold select-none">
                      <div className="w-5 h-5 rounded-full border-2 border-slate-200 border-t-blue-600 animate-spin" />
                      Updating schedules...
                    </div>
                  </div>
                ) : slots.length === 0 ? (
                  <div className="text-center py-10 select-none">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mx-auto mb-3 text-slate-400">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-1.875 5.25h.008v.008H2.25v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-slate-550">
                      No slots available{selectedDate ? " for this date" : ""}.
                    </p>
                    <p className="text-xs text-slate-450 mt-1">
                      Check back later or try another calendar date.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {slots.map((s) => {
                      const isSelected = selectedSlot?._id === s._id;
                      return (
                        <button
                          key={s._id}
                          onClick={() => {
                            setSelectedSlot(s);
                            setBookingSuccess(false);
                            setBookingError(null);
                          }}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all cursor-pointer ${isSelected
                              ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.02]"
                              : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300"
                            }`}
                        >
                          <span
                            className={`text-sm font-bold ${isSelected ? "text-white" : "text-slate-900"
                              }`}
                          >
                            {s.time}
                          </span>
                          <span
                            className={`text-[10px] mt-1.5 font-bold ${isSelected ? "text-blue-200" : "text-slate-450"
                              }`}
                          >
                            {formatDate(s.date)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </Card>
            </div>

            {/* Right Column - Booking Summary Card */}
            <div className="space-y-4">
              {bookingSuccess && (
                <Card className="p-5 border-emerald-200 bg-emerald-50/40 space-y-3.5 animate-scale-in text-slate-900">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-emerald-800">
                      Booking Scheduled!
                    </h4>
                  </div>
                  <p className="text-xs text-emerald-605 leading-relaxed font-medium">
                    Your appointment confirmation slot has been successfully booked.
                  </p>
                  <Link to="/bookings" className="block pt-1">
                    <Button className="w-full justify-center bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/10 text-xs py-2 h-9">
                      My Bookings
                    </Button>
                  </Link>
                </Card>
              )}

              {bookingError && (
                <div className="p-3.5 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{bookingError}</span>
                </div>
              )}

              <Card className="bg-white border border-slate-200 p-5 sm:p-6 text-left">
                <h3 className="text-sm font-extrabold text-slate-905 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 select-none">
                  Booking Summary
                </h3>

                {selectedSlot ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-5">
                    <div className="text-sm space-y-3 font-semibold">
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-400 font-medium">Date</span>
                        <span className="text-slate-800">
                          {formatDate(selectedSlot.date)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-400 font-medium">Time</span>
                        <span className="text-slate-800">{selectedSlot.time}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-400 font-medium">Duration</span>
                        <span className="text-slate-800">{service.duration} mins</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                        <span className="text-slate-900 font-bold">Total price</span>
                        <span className="text-lg font-extrabold text-blue-600">
                          ${service.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <label
                        htmlFor="booking-note"
                        className="text-xs font-bold text-slate-500"
                      >
                        Notes
                      </label>
                      <textarea
                        id="booking-note"
                        rows="3"
                        placeholder="Provide details about requirements..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="input text-xs resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      isLoading={bookingLoading}
                      className="w-full font-bold"
                    >
                      Confirm Booking Slot
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8 select-none text-slate-405">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-205 flex items-center justify-center mx-auto mb-3 text-slate-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 12.408l-1.62 1.62A2.25 2.25 0 016.59 18H4.5A2.25 2.25 0 012.25 15.75v-10.5A2.25 2.25 0 014.5 3h2.09a2.25 2.25 0 011.606.66l1.62 1.62m.008 10.5H15M9 14h6"
                        />
                      </svg>
                    </div>
                    <p className="text-xs font-semibold">
                      {bookingSuccess
                        ? "Select another slot to schedule."
                        : "Select open slot above."}
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default AvailableSlots;
