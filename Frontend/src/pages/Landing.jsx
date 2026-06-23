import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

const Landing = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { value: "10k+", label: "Global Providers" },
    { value: "1M+", label: "Annual Bookings" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "24h", label: "Avg. Payout Time" },
  ];

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
      title: "Hyper-Flexible Scheduling",
      description: "Set your availability, define buffer times, and let clients book instantly. Give your customers the smoothest booking experience possible.",
      highlights: ["Real-time availability", "Instant confirmations"],
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
      title: "Global Marketplace",
      description: "Get discovered by customers searching for services in your city. Build your reputation with reviews and ratings.",
      highlights: ["City-based discovery", "Review system"],
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
        </svg>
      ),
      title: "Booking Management",
      description: "Track upcoming sessions, review customer notes, and mark appointments complete — all from one dashboard.",
      highlights: ["Status tracking", "Customer notes"],
    },
  ];

  const steps = [
    { num: "01", title: "Sync & Setup", desc: "Connect your profile and set your availability. Define your service packages and pricing in minutes." },
    { num: "02", title: "Automate Bookings", desc: "Share your link or get listed on our marketplace. Reminders and confirmations happen automatically." },
    { num: "03", title: "Get Booked Instantly", desc: "Customers find you, pick a time, and book instantly. Focus on what you do best while we handle the rest." },
  ];

  const testimonials = [
    { text: "Slotify transformed my consulting business. I went from chasing clients to having a full calendar in weeks.", author: "Sarah K.", role: "Business Consultant" },
    { text: "The booking automation is a game changer. My clients love how easy it is to schedule sessions.", author: "Marcus T.", role: "Personal Trainer" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/providers");
  };

  return (
    <Layout>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#eaedff] via-[#faf8ff] to-[#faf8ff] dark:from-[#0f172a] dark:via-[#020617] dark:to-[#020617]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-20 sm:pt-32 sm:pb-28 text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 mb-8 shadow-sm">
            <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            Trusted by 10,000+ top professionals worldwide
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.1] max-w-3xl mx-auto">
            Seamless booking for{" "}
            <em className="text-brand-700 dark:text-brand-400 not-italic font-bold italic">modern</em>{" "}
            professionals.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Slotify unifies your calendar, clients, and bookings into a single,
            high-performance workspace designed for elite conversion.
          </p>

          {/* Search Bar (visual-only, navigates to /providers) */}
          <form onSubmit={handleSearchSubmit} className="mt-10 max-w-2xl mx-auto">
            <div className="flex items-center bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl p-1.5 shadow-lg shadow-slate-200/50 dark:shadow-black/20">
              <div className="flex items-center gap-2 flex-1 px-3">
                <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search services (e.g. Design, Consulting...)"
                  className="w-full py-2.5 text-sm text-slate-900 dark:text-slate-100 bg-transparent border-none outline-none placeholder:text-slate-400"
                  readOnly
                  onClick={() => navigate("/providers")}
                />
              </div>
              <div className="hidden sm:flex items-center gap-2 flex-1 px-3 border-l border-slate-200 dark:border-slate-700">
                <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Location or Remote"
                  className="w-full py-2.5 text-sm text-slate-900 dark:text-slate-100 bg-transparent border-none outline-none placeholder:text-slate-400"
                  readOnly
                  onClick={() => navigate("/providers")}
                />
              </div>
              <button type="submit" className="btn-primary px-6 py-2.5 rounded-lg shrink-0">
                Find Experts
              </button>
            </div>
          </form>

          {!isAuthenticated && (
            <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
              Free to join &middot; No credit card required
            </p>
          )}
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-[#eaedff] dark:bg-[#0f172a] border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-bold text-brand-700 dark:text-brand-400 tracking-tight">{stat.value}</p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
              Master Your Workflow
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Everything you need to run a high-ticket service business.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card p-6 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
                {feature.highlights && (
                  <div className="space-y-1.5 pt-1">
                    {feature.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {h}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="py-20 sm:py-24 bg-[#f2f3ff] dark:bg-[#0f172a] border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
              3 Steps to Full Slots
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="relative">
                <span className="text-7xl font-bold text-brand-200 dark:text-brand-900/50 leading-none select-none">{step.num}</span>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-2">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials / CTA ── */}
      <section className="py-20 sm:py-24 bg-slate-900 dark:bg-[#020617]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight max-w-md">
              Built for those who value their time.
            </h2>
            {!isAuthenticated && (
              <Link to="/register" className="btn-primary px-6 py-3 shrink-0">
                Get Started Free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to={user?.role === "provider" ? "/provider/dashboard" : "/dashboard"}
                className="btn-primary px-6 py-3 shrink-0"
              >
                Go to Dashboard
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-slate-800 dark:bg-[#0f172a] border border-slate-700 dark:border-slate-800 rounded-xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold text-white">{t.author}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="font-bold text-xl text-brand-700 dark:text-brand-400 tracking-tight">Slotify</span>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                A modern appointment scheduling platform connecting customers with service providers.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Platform</h4>
              <ul className="space-y-2">
                <li><a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 no-underline transition-colors">GitHub</a></li>
                <li><Link to="/providers" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 no-underline transition-colors">Find Providers</Link></li>
                <li><Link to="/register" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 no-underline transition-colors">Get Started</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Support</h4>
              <ul className="space-y-2">
                <li><a href="mailto:support@slotify.com" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 no-underline transition-colors">Contact Support</a></li>
                <li><span className="text-sm text-slate-400 dark:text-slate-500">&copy; {new Date().getFullYear()} Slotify Inc.</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-600">
            All rights reserved.
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Landing;
