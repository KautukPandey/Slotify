import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import providerDashboardService from "../services/providerDashboardService";
import { extractErrorMessage } from "../services/api";

const CreateSlot = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    serviceId: "",
    date: "",
    time: "",
  });
  const [loadingServices, setLoadingServices] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoadingServices(true);
      setError(null);
      try {
        const data = await providerDashboardService.getMyServices();
        const activeServices = data.myServices || [];
        setServices(activeServices);
        if (activeServices.length > 0) {
          setFormData((prev) => ({ ...prev, serviceId: activeServices[0]._id }));
        }
      } catch (err) {
        setError(extractErrorMessage(err));
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.serviceId) {
      errors.serviceId = "Please select a service";
    }
    if (!formData.date) {
      errors.date = "Please select a date";
    }
    if (!formData.time) {
      errors.time = "Please select a time";
    }
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitLoading(true);
    setError(null);
    try {
      await providerDashboardService.createSlot({
        serviceId: formData.serviceId,
        date: formData.date,
        time: formData.time,
      });
      navigate("/provider/slots");
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Layout className="bg-[#F8FAFC]">
      <main className="flex-1 max-w-xl w-full mx-auto p-4 sm:p-6 animate-fade-in text-left">
        <PageHeader
          title="Create Slot"
          subtitle="Assign availability dates and times for client bookings"
          showBack={true}
        />

        <Card className="bg-white border border-slate-205 p-6 sm:p-8 mt-6">
          {error && (
            <div className="p-3.5 mb-5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
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
              <span>{error}</span>
            </div>
          )}

          {loadingServices ? (
            <div className="flex flex-col items-center justify-center py-10 font-bold text-slate-400 select-none">
              <div className="w-5 h-5 rounded-full border-2 border-slate-200 border-t-blue-600 animate-spin mb-2" />
              Loading catalogs...
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-8 select-none text-slate-405">
              <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
              <p className="text-sm font-semibold mb-2">
                No active services defined yet
              </p>
              <p className="text-xs">
                You must publish a service from your management catalogs first
                before you can schedule availability slots.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="serviceId" className="label select-none">
                  Service Provider Title
                </label>
                <select
                  id="serviceId"
                  name="serviceId"
                  required
                  value={formData.serviceId}
                  onChange={handleChange}
                  className={`input text-sm cursor-pointer ${validationErrors.serviceId ? "input-error" : ""
                    }`}
                >
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name} (${service.price.toFixed(2)} -{" "}
                      {service.duration} mins)
                    </option>
                  ))}
                </select>
                {validationErrors.serviceId && (
                  <p className="text-xs text-red-500 font-medium select-none anim-fade-in mt-1">
                    {validationErrors.serviceId}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="date"
                  name="date"
                  label="Available Date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  error={validationErrors.date}
                />
                <Input
                  id="time"
                  name="time"
                  label="Available Time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  error={validationErrors.time}
                />
              </div>

              <Button
                type="submit"
                isLoading={submitLoading}
                className="w-full font-bold pt-1"
              >
                Create Availability Slot
              </Button>
            </form>
          )}
        </Card>
      </main>
    </Layout>
  );
};

export default CreateSlot;
