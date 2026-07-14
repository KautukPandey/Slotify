import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { SkeletonCard } from "../components/LoadingSpinner";
import providerDashboardService from "../services/providerDashboardService";
import { extractErrorMessage } from "../services/api";

const MyServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await providerDashboardService.getMyServices();
        setServices(data.myServices || []);
      } catch (err) {
        setError(extractErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <Layout className="bg-[#F8FAFC]">
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 animate-fade-in text-left">
        <PageHeader
          title="My Services"
          subtitle="Configure the list of services you offer to customers"
        >
          <Link to="/provider/services/create" className="block shrink-0">
            <Button className="text-xs font-bold flex items-center gap-1.5 py-2">
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Create Service
            </Button>
          </Link>
        </PageHeader>

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <SkeletonCard count={6} />
          </div>
        ) : services.length === 0 ? (
          <Card className="p-12 text-center bg-white border border-slate-200 mt-6">
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
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-905 mb-1.5">
              No services added
            </h3>
            <p className="text-sm text-slate-500 mb-5">
              Create your service options package details to start accepting customer orders.
            </p>
            <Link to="/provider/services/create" className="inline-block">
              <Button className="font-bold flex items-center gap-1.5">
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Create First Service
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {services.map((service) => (
              <Card
                key={service._id}
                className="bg-white border border-slate-200 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <h3 className="text-base font-bold text-slate-900 capitalize">
                      {service.name}
                    </h3>
                    {!service.isActive && (
                      <Badge variant="red" className="text-[10px] font-bold">
                        Inactive
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mb-4 select-none">
                    <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200/50 px-2 py-0.5 rounded-md">
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
                    <span className="text-sm font-extrabold text-blue-600">
                      ${service.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
};

export default MyServices;
