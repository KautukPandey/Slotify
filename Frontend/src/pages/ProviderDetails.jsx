import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
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
      year: "numeric", month: "short", day: "numeric",
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 shrink-0 ${i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-700"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const lowestPrice = services.length > 0
    ? Math.min(...services.map(s => s.price))
    : null;

  const providerName = provider?.businessName || "Provider Profile";

  const tabs = [
    { id: "services", label: "Services" },
    { id: "reviews", label: "Reviews" },
    { id: "about", label: "About" },
  ];

  return (
    <Layout>
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 animate-fade-in">
        <PageHeader showBack={true} />

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-6">
            <SkeletonProfile />
            <div className="grid gap-4"><SkeletonCard count={2} /></div>
          </div>
        ) : !provider ? (
          <div className="card p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">Provider not found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">The provider you're looking for doesn't exist.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Provider Profile Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-bold text-2xl shrink-0">
                {provider.businessName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 capitalize tracking-tight">
                  {provider.businessName}
                </h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                  {reviewCount > 0 && (
                    <span className="inline-flex items-center gap-1 text-sm">
                      <svg className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{averageRating}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500 dark:text-slate-400">{reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'}</span>
                    </span>
                  )}
                  <span className="text-slate-400 dark:text-slate-600">·</span>
                  <span className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {provider.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Tab Navigation + Content */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column */}
              <div className="flex-1 min-w-0">
                {/* Tabs */}
                <div className="flex gap-6 border-b border-slate-200 dark:border-slate-800 mb-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer bg-transparent px-0 ${
                        activeTab === tab.id
                          ? "border-brand-600 text-brand-700 dark:text-brand-400"
                          : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Services Tab */}
                {activeTab === "services" && (
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Available Services</h2>
                    {services.length === 0 ? (
                      <div className="card p-8 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">This provider hasn't added any services yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {services.map((service) => (
                          <div key={service._id} className="card p-5 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                              <div className="flex-1 space-y-2">
                                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 capitalize">
                                  {service.name}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                  {service.description}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                  <span className="inline-flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {service.duration} min
                                  </span>
                                  <span className="font-semibold text-slate-900 dark:text-slate-100">${service.price.toFixed(2)}</span>
                                </div>
                              </div>
                              <Link
                                to={`/services/${service._id}/slots`}
                                className="btn-primary text-sm shrink-0"
                              >
                                Book Now
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Customer Reviews</h2>
                    {reviewsLoading ? (
                      <SkeletonCard count={1} />
                    ) : reviews.length === 0 ? (
                      <div className="card p-8 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">No reviews yet for this provider.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {reviews.map((review) => (
                          <div key={review._id} className="card p-5 space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-semibold text-sm capitalize shrink-0">
                                  {(review.customer?.name || "C").charAt(0)}
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 capitalize">
                                    {review.customer?.name || "Anonymous Customer"}
                                  </h4>
                                  <p className="text-xs text-slate-400 dark:text-slate-500">
                                    {formatReviewDate(review.createdAt)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-0.5 shrink-0">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            {review.comment && (
                              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-1">
                                {review.comment}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* About Tab */}
                {activeTab === "about" && (
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">About</h2>
                    <div className="card p-6">
                      <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                        {provider.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar (Desktop) */}
              <div className="lg:w-80 shrink-0">
                <div className="card p-6 space-y-5 lg:sticky lg:top-24">
                  {lowestPrice !== null && (
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Starts From</p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-1">
                        ${lowestPrice.toFixed(2)} <span className="text-sm font-normal text-slate-400">/ service</span>
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <svg className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Verified Provider</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Background checked</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <svg className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Instant Booking</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Confirm in seconds</p>
                      </div>
                    </div>
                  </div>

                  {services.length > 0 && (
                    <Link
                      to={`/services/${services[0]._id}/slots`}
                      className="btn-primary w-full justify-center py-3 text-base"
                    >
                      Book Now
                    </Link>
                  )}
                  <p className="text-xs text-center text-slate-400 dark:text-slate-500">You won't be charged yet</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default ProviderDetails;
