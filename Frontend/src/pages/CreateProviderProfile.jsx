import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import providerProfileService from "../services/providerProfileService";
import { extractErrorMessage } from "../services/api";

const CreateProviderProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    city: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.businessName.trim()) {
      setError("Business Name cannot be empty.");
      return;
    }
    if (!formData.city.trim()) {
      setError("City cannot be empty.");
      return;
    }
    if (!formData.description.trim()) {
      setError("Description cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await providerProfileService.createProviderProfile({
        businessName: formData.businessName.trim(),
        city: formData.city.trim().toLowerCase(),
        description: formData.description.trim(),
      });

      // Update sessionStorage cache to notify Navbar and Route Guard
      sessionStorage.setItem("hasProviderProfile", "true");

      navigate("/provider/dashboard");
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-150 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-xl w-full mx-auto p-6">
        <PageHeader
          title="Complete Profile"
          subtitle="Define your business details before configuring services and availabilities"
        />

        <div className="bg-white dark:bg-zinc-900 border border-slate-205 dark:border-zinc-850 rounded-2xl p-8 space-y-6 shadow-sm">
          {error && (
            <div className="p-3 text-xs text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="businessName" className="text-xs font-bold text-slate-650 dark:text-zinc-400">
                Business Name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                required
                placeholder="e.g. Acme Hair Salon"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="city" className="text-xs font-bold text-slate-650 dark:text-zinc-400">
                City Location
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                placeholder="e.g. Seattle"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="description" className="text-xs font-bold text-slate-650 dark:text-zinc-400">
                Business Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="5"
                required
                placeholder="Describe the type of work you do, services, hours, or any other details..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-755 disabled:bg-violet-400 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              {loading ? "Saving Profile..." : "Save Profile & Continue"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateProviderProfile;
