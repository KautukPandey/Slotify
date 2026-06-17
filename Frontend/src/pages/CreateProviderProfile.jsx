import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import providerProfileService from "../services/providerProfileService";
import { extractErrorMessage } from "../services/api";

const CreateProviderProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ businessName: "", city: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.businessName.trim()) errors.businessName = "Business name is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.description.trim()) errors.description = "Description is required";
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    setError(null);
    try {
      await providerProfileService.createProviderProfile({
        businessName: formData.businessName.trim(),
        city: formData.city.trim().toLowerCase(),
        description: formData.description.trim(),
      });
      sessionStorage.setItem("hasProviderProfile", "true");
      navigate("/provider/dashboard");
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) => `input ${validationErrors[field] ? "input-error" : ""}`;

  return (
    <Layout>
      <main className="flex-1 max-w-xl w-full mx-auto p-4 sm:p-6 animate-fade-in">
        <PageHeader title="Complete Profile" subtitle="Define your business details before configuring services and availabilities" />

        <div className="card p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-3.5 text-sm text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="businessName" className="label">Business Name</label>
              <input id="businessName" name="businessName" type="text" required placeholder="e.g. Acme Hair Salon"
                value={formData.businessName} onChange={handleChange} className={inputClass("businessName")} />
              {validationErrors.businessName && <p className="text-xs text-red-500 dark:text-red-400 mt-1.5 font-medium">{validationErrors.businessName}</p>}
            </div>

            <div>
              <label htmlFor="city" className="label">City Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <input id="city" name="city" type="text" required placeholder="e.g. Seattle"
                  value={formData.city} onChange={handleChange} className={`${inputClass("city")} pl-10`} />
              </div>
              {validationErrors.city && <p className="text-xs text-red-500 dark:text-red-400 mt-1.5 font-medium">{validationErrors.city}</p>}
            </div>

            <div>
              <label htmlFor="description" className="label">Business Description</label>
              <textarea id="description" name="description" rows="5" required placeholder="Describe your services, hours, and other details..."
                value={formData.description} onChange={handleChange} className={inputClass("description")} />
              {validationErrors.description && <p className="text-xs text-red-500 dark:text-red-400 mt-1.5 font-medium">{validationErrors.description}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? (
                <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Saving Profile...</>
              ) : "Save Profile & Continue"}
            </button>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default CreateProviderProfile;
