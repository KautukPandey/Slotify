import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { SkeletonProfile, SkeletonCard } from "../components/LoadingSpinner";
import providerService from "../services/providerService";
import reviewService from "../services/reviewService";
import { extractErrorMessage } from "../services/api";

const ProviderDetails = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("services");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setReviewsLoading(true);
      setError(null);
      try {
        const [providerData, servicesData, reviewsData] = await Promise.all([
          providerService.getProviderById(id),
          providerService.getProviderServices(id),
          reviewService.getProviderReviews(id),
        ]);
        setProvider(providerData.provider);
        setServices(servicesData.services || []);
        setAverageRating(providerData.averageRating || reviewsData.averageRating || 0);
        setReviewCount(
          providerData.reviewCount !== undefined
            ? providerData.reviewCount
            : (reviewsData.reviewCount || 0)
        );
        setReviews(reviewsData.reviews || []);
      } catch (err) {
        setError(extractErrorMessage(err));
      } finally {
        setLoading(false);
        setReviewsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const formatReviewDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 shrink-0 ${i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
          }`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const lowestPrice =
    services.length > 0 ? Math.min(...services.map((s) => s.price)) : null;

  const tabs = [
    { id: "services", label: "Available Services" },
    { id: "reviews", label: "Customer Reviews" },
    { id: "about", label: "About Business" },
  ];

  return (
    <Layout className="bg-[#F8FAFC]">
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 animate-fade-in">
        <PageHeader showBack={true} />

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl text-left">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-6">
            <SkeletonProfile />
            <div className="grid gap-4 mt-6">
              <SkeletonCard count={2} />
            </div>
          </div>
        ) : !provider ? (
          <Card className="p-12 text-center bg-white border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Provider profile not found
            </h3>
            <p className="text-sm text-slate-500">
              The service provider you are looking for has been removed or modified.
            </p>
          </Card>
        ) : (
          <div className="space-y-8 mt-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-left">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-2xl shrink-0">
                {provider.businessName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 capitalize tracking-tight">
                  {provider.businessName}
                </h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm select-none">
                  {reviewCount > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <svg
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold text-slate-800">
                        {averageRating.toFixed(1)}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">
                        {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
                      </span>
                    </span>
                  )}
                  {reviewCount > 0 && (
                    <span className="text-slate-400 dark:text-slate-650">·</span>
                  )}
                  <span className="inline-flex items-center gap-1 text-slate-500 capitalize">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {provider.city}
                  </span>
                  <Badge variant="blue" className="ml-2 font-bold capitalize">
                    Verified Pro
                  </Badge>
                </div>
              </div>
            </div>

            {/* Content tabs grid layout */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Tabs and detail content list */}
              <div className="flex-1 min-w-0 w-full text-left">
                {/* Tabs selection buttons */}
                <div className="flex gap-6 border-b border-slate-200 mb-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer bg-transparent px-0 ${activeTab === tab.id
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-slate-500 hover:text-slate-800"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab content rendering */}
                {activeTab === "services" && (
                  <div className="space-y-4">
                    {services.length === 0 ? (
                      <Card className="p-8 text-center bg-white border border-slate-200">
                        <p className="text-sm text-slate-500">
                          This provider hasn't listed any booking services yet.
                        </p>
                      </Card>
                    ) : (
                      services.map((s) => (
                        <Card
                          key={s._id}
                          className="bg-white border border-slate-200 p-5 sm:p-6"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="space-y-1.5 flex-1 max-w-xl">
                              <h3 className="text-base font-bold text-slate-900 capitalize">
                                {s.name}
                              </h3>
                              <p className="text-sm text-slate-500 leading-relaxed">
                                {s.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs font-bold text-slate-500 pt-1">
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
                                  {s.duration} mins
                                </span>
                                <span className="text-base font-extrabold text-blue-600">
                                  ${s.price.toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <Link to={`/services/${s._id}/slots`} className="shrink-0">
                              <Button className="text-sm font-bold w-full sm:w-auto px-5">
                                Book slot
                              </Button>
                            </Link>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    {reviewsLoading ? (
                      <SkeletonCard count={1} />
                    ) : reviews.length === 0 ? (
                      <Card className="p-8 text-center bg-white border border-slate-205">
                        <p className="text-sm text-slate-500">
                          No reviews or ratings received by this provider yet.
                        </p>
                      </Card>
                    ) : (
                      reviews.map((r) => (
                        <Card
                          key={r._id}
                          className="bg-white border border-slate-200 p-5 space-y-3.5"
                        >
                          <div className="flex items-start justify-between gap-2.5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 font-extrabold text-sm capitalize shrink-0">
                                {(r.customer?.name || "C").charAt(0)}
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 capitalize">
                                  {r.customer?.name || "Anonymous Client"}
                                </h4>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                  {formatReviewDate(r.createdAt)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-0.5 shrink-0 select-none">
                              {renderStars(r.rating)}
                            </div>
                          </div>
                          {r.comment && (
                            <p className="text-sm text-slate-650 leading-relaxed pl-1 whitespace-pre-line">
                              {r.comment}
                            </p>
                          )}
                        </Card>
                      ))
                    )}
                  </div>
                )}

                {activeTab === "about" && (
                  <Card className="bg-white border border-slate-200 p-6">
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3 select-none">
                      Provider Description
                    </h3>
                    <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                      {provider.description ||
                        "No background biography description has been provided."}
                    </p>
                  </Card>
                )}
              </div>

              {/* Booking details info Sidebar */}
              <div className="w-full lg:w-80 shrink-0">
                <Card className="bg-white border border-slate-200 p-6 space-y-5 lg:sticky lg:top-24 text-left">
                  {lowestPrice !== null && (
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Starting Price
                      </p>
                      <p className="text-3xl font-extrabold text-slate-900 mt-1">
                        ${lowestPrice.toFixed(2)}{" "}
                        <span className="text-xs font-semibold text-slate-400">
                          / session
                        </span>
                      </p>
                    </div>
                  )}

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200/50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-blue-100/50 flex items-center justify-center text-blue-600 shrink-0">
                        <svg
                          className="w-4.5 h-4.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          Vetted Partner
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Professional qualifications checked
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200/50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-blue-100/50 flex items-center justify-center text-blue-600 shrink-0">
                        <svg
                          className="w-4.5 h-4.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          Real-time Calendar
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Select slot & receive instant email
                        </p>
                      </div>
                    </div>
                  </div>

                  {services.length > 0 && (
                    <Link
                      to={`/services/${services[0]._id}/slots`}
                      className="block pt-1"
                    >
                      <Button className="w-full justify-center py-3 text-sm font-bold">
                        Choose Slot Now
                      </Button>
                    </Link>
                  )}
                  <p className="text-[10px] text-center text-slate-400">
                    Booking deposits handled securely
                  </p>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default ProviderDetails;
