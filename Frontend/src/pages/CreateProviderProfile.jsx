import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
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
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState(null);

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
    if (!formData.businessName.trim()) {
      errors.businessName = "Business name is required";
    }
    if (!formData.city.trim()) {
      errors.city = "City location is required";
    }
    if (!formData.description.trim()) {
      errors.description = "Business bio description is required";
    }
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

  return (
    <Layout className="bg-[#F8FAFC]">
      <main className="flex-1 max-w-xl w-full mx-auto p-4 sm:p-6 animate-fade-in text-left">
        <PageHeader
          title="Complete Profile"
          subtitle="Define your business details before configuring services and availabilities"
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="businessName"
              name="businessName"
              label="Business Name"
              type="text"
              placeholder="e.g. Paramount Wellness Group"
              value={formData.businessName}
              onChange={handleChange}
              error={validationErrors.businessName}
              icon={
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
                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h2.4c.05 0 .1-.04.1-.1V7.8a.1.1 0 00-.068-.094l-6.858-2.451a.1.1 0 00-.064 0L4.354 7.706a.1.1 0 00-.05.045L4.25 7.8V21M3 21h18"
                  />
                </svg>
              }
            />

            <Input
              id="city"
              name="city"
              label="City Location"
              type="text"
              placeholder="e.g. Pune"
              value={formData.city}
              onChange={handleChange}
              error={validationErrors.city}
              icon={
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
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              }
            />

            <div className="space-y-1.5">
              <label htmlFor="description" className="label">
                Business Biography & Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="5"
                placeholder="Give details about service hours, areas of expertise, and booking highlights..."
                value={formData.description}
                onChange={handleChange}
                className={`input resize-none text-sm ${validationErrors.description ? "input-error" : ""
                  }`}
              />
              {validationErrors.description && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-1 font-medium select-none anim-fade-in">
                  {validationErrors.description}
                </p>
              )}
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full font-bold pt-1"
            >
              Configure Service Profile
            </Button>
          </form>
        </Card>
      </main>
    </Layout>
  );
};

export default CreateProviderProfile;
