import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import providerDashboardService from "../services/providerDashboardService";
import { extractErrorMessage } from "../services/api";

const CreateService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
    if (!formData.name.trim()) {
      errors.name = "Service name is required";
    }
    const priceNum = parseFloat(formData.price);
    if (!formData.price || isNaN(priceNum) || priceNum <= 0) {
      errors.price = "Enter a valid price greater than 0";
    }
    const durationNum = parseInt(formData.duration, 10);
    if (!formData.duration || isNaN(durationNum) || durationNum <= 0) {
      errors.duration = "Enter a valid duration name value";
    }
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    setError(null);
    try {
      await providerDashboardService.createService({
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: priceNum,
        duration: durationNum,
      });
      navigate("/provider/services");
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
          title="Create Service"
          subtitle="Define a new service for your client booking catalog"
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="name"
              name="name"
              label="Service Title"
              type="text"
              placeholder="e.g. Traditional Haircut & Wash"
              value={formData.name}
              onChange={handleChange}
              error={validationErrors.name}
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
                    d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.357.205a1.125 1.125 0 01-1.4-.205l-1.922-1.922a1.125 1.125 0 00-1.59 0l-1.922 1.922a1.125 1.125 0 01-1.4.205l-.358-.205a1.125 1.125 0 01-.462-1.511c.4-.89.731-1.82 1.004-2.783m9.467-9.18C10.593 5.378 10.262 4.45 9.86 3.56c-.247-.55-.06-1.21.463-1.511l.357-.205a1.125 1.125 0 011.4.205l1.922 1.922a1.125 1.125 0 001.59 0l1.922-1.922a1.125 1.125 0 011.4-.205l.358.205a1.125 1.125 0 01.462 1.511c-.4.89-.731 1.82-1.004 2.783"
                  />
                </svg>
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                id="price"
                name="price"
                label="Price ($)"
                type="number"
                step="0.01"
                placeholder="49.99"
                value={formData.price}
                onChange={handleChange}
                error={validationErrors.price}
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
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
              />
              <Input
                id="duration"
                name="duration"
                label="Duration (mins)"
                type="number"
                placeholder="30"
                value={formData.duration}
                onChange={handleChange}
                error={validationErrors.duration}
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
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="description" className="label">
                Detailed Biography/Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="List what is included in this session/service catalog..."
                value={formData.description}
                onChange={handleChange}
                className="input resize-none text-sm"
              />
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full font-bold pt-1"
            >
              Publish Booking Option
            </Button>
          </form>
        </Card>
      </main>
    </Layout>
  );
};

export default CreateService;
