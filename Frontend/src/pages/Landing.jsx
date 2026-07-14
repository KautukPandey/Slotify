import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { useAuth } from "../context/AuthContext";
import providerService from "../services/providerService";
import { extractErrorMessage } from "../services/api";
import { SkeletonCard } from "../components/LoadingSpinner";

const Landing = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const categories = [
    {
      name: "Design",
      description: "UI/UX, graphic & branding experts",
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.757-1.547 2.25 2.25 0 00-1.104-3.79c-1.168-.156-2.278-.58-3.266-1.222m-3.267 7.009a16.307 16.307 0 01-4.757-1.547 2.25 2.25 0 011.104-3.79c1.168-.156 2.278-.58 3.266-1.222m.777 5.597a16.3 16.3 0 003.388-1.62m-5.043-.025a16.3 16.3 0 011.622-3.395m0 0a15.998 15.998 0 00-3.389-1.62m5.043.025a15.995 15.995 0 01-1.622 3.395m-3.42-3.42a15.995 15.995 0 00-4.756-1.548 2.25 2.25 0 001.104-3.79c1.167-.156 2.277-.58 3.265-1.222m3.267 7.01a16.307 16.307 0 014.757-1.547 2.25 2.25 0 00-1.104-3.79c-1.168-.156-2.278-.58-3.266-1.222" />
        </svg>
      )
    },
    {
      name: "Consulting",
      description: "Business, finance & marketing advisors",
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      )
    },
    {
      name: "Development",
      description: "Software engineers & program code experts",
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      )
    },
    {
      name: "Wellness",
      description: "Personal trainers, yoga instructors & coaches",
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const loadFeaturedProviders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await providerService.getProviders();
        // Take the top 3 items
        setProviders((response.providers || []).slice(0, 3));
      } catch (err) {
        setError(extractErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    loadFeaturedProviders();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = [];
    if (searchQuery) query.push(`search=${encodeURIComponent(searchQuery)}`);
    if (selectedCity) query.push(`city=${encodeURIComponent(selectedCity)}`);
    navigate(`/providers?${query.join("&")}`);
  };

  const handleCategoryClick = (catName) => {
    navigate(`/providers?search=${encodeURIComponent(catName)}`);
  };

  return (
    <Layout className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 mb-6 sm:mb-8 select-none">
            Slotify· Connecting top local & remote service providers
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-3xl mx-auto mb-6 sm:mb-8">
            Find the perfect expert. <br />
            <span className="text-blue-600">Book in seconds.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10">
            Discover service providers in your city, browse transparent pricing and slot times, and reserve calendar bookings instantly.
          </p>

          {/* Search bar widget */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-10">
            <div className="flex flex-col sm:flex-row items-stretch bg-white border border-slate-200 rounded-2xl p-2 shadow-md gap-2">
              <div className="flex items-center gap-2.5 flex-1 px-3 py-1 sm:py-0">
                <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder="What service are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2.5 text-sm text-slate-800 bg-transparent border-none outline-none placeholder:text-slate-400 font-medium"
                />
              </div>

              <div className="flex items-center gap-2.5 flex-1 px-3 py-1 sm:py-0 border-t sm:border-t-0 sm:border-l border-slate-100">
                <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full py-2.5 text-sm text-slate-800 bg-transparent border-none outline-none appearance-none cursor-pointer font-medium"
                >
                  <option value="">Location or Remote</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="pune">Pune</option>
                  <option value="bangalore">Bangalore</option>
                </select>
              </div>

              <Button type="submit" className="px-6 py-3 rounded-xl font-bold shrink-0">
                Search
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-left mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Explore by Category
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-500">
              Browse experienced experts categorized by service domain
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <Card
                key={cat.name}
                hover
                onClick={() => handleCategoryClick(cat.name)}
                className="flex flex-col items-start gap-4 hover:shadow-md transition-shadow bg-white duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{cat.name}</h3>
                  <p className="text-xs text-slate-500 leading-normal mt-1">{cat.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers Section */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-left">
                Featured Professionals
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-slate-500 text-left">
                Book instantly with vetted partners verified by reviews
              </p>
            </div>
            <Link to="/providers" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1">
              View all providers
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SkeletonCard count={3} />
            </div>
          ) : error ? (
            <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {providers.map((p) => (
                <Card key={p._id} className="flex flex-col justify-between h-full bg-white hover:shadow-md duration-200 transition-shadow">
                  <div className="flex-1">
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-extrabold text-lg capitalize shrink-0">
                        {p.businessName?.charAt(0) || "P"}
                      </div>
                      <div className="text-left min-w-0">
                        <h3 className="text-base font-bold text-slate-900 capitalize truncate">
                          {p.businessName}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500 mt-0.5 capitalize">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {p.city}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-550 leading-relaxed text-left line-clamp-3">
                      {p.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link to={`/providers/${p._id}`}>
                      <Button variant="secondary" className="w-full text-sm font-bold">
                        Book Appointment
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Grow your service business with Slotify
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
            Create an onboarding profile, define your services, slot out your availability calendar, and receive bookings instantly.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/register">
                  <Button className="px-6 py-3 font-semibold text-sm w-full sm:w-auto">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="ghost" className="px-6 py-3 font-semibold text-sm text-white hover:bg-slate-800 transition-colors w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </>
            ) : (
              <Link to={user?.role === "provider" ? "/provider/dashboard" : "/dashboard"}>
                <Button className="px-6 py-3 font-semibold text-sm">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Reusable Footer */}
      <Footer />
    </Layout>
  );
};

export default Landing;
