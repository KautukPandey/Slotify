import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

const Landing = () => {
  const { isAuthenticated, user } = useAuth();

  const stats = [
    { value: "150+", label: "Service Providers" },
    { value: "600+", label: "Active Services" },
    { value: "10k+", label: "Appointments Booked" },
  ];

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
      title: "Discover Providers",
      description: "Browse a curated directory of local service providers. Search by city, read bios, and find the perfect match for your needs.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
      title: "Easy Appointment Booking",
      description: "Select your service, pick a date and time slot from the live calendar, add notes, and book instantly with real-time confirmation.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
      ),
      title: "Manage Appointments",
      description: "Track upcoming sessions, review notes, and cancel appointments with automated status updates sent to providers in real-time.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
      ),
      title: "Provider Workspace",
      description: "Create services with custom pricing and durations, open time slots, track customer bookings, and mark appointments complete.",
    },
  ];

  const customerSteps = [
    { num: "01", title: "Find a Provider", desc: "Search the directory by city or name to locate local service providers near you." },
    { num: "02", title: "Select a Service", desc: "Browse their catalog of services, compare pricing and duration, and pick what you need." },
    { num: "03", title: "Book Your Slot", desc: "Choose an available time slot from the calendar, add any notes, and confirm instantly." },
  ];

  const providerSteps = [
    { num: "01", title: "Create Your Profile", desc: "Set up your business profile with name, location, and a description of your services." },
    { num: "02", title: "List Services & Slots", desc: "Define your service offerings with pricing, durations, and open availability slots." },
    { num: "03", title: "Manage Bookings", desc: "Review incoming appointments, check customer notes, and mark sessions as completed." },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid dark:bg-grid-dark pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-brand-200/30 via-accent-200/20 to-transparent dark:from-brand-900/20 dark:via-accent-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 border border-brand-200/50 dark:border-brand-800/50 mb-6">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Effortless Appointment Scheduling
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Book appointments{" "}
            <span className="text-gradient-hero">effortlessly</span>
            <br />
            <span className="text-slate-700 dark:text-zinc-300">manage seamlessly</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Connect customers and service providers through a simple, robust scheduling experience.
            Find local businesses, browse services, select times, and manage bookings all in one place.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link
                to={user?.role === "provider" ? "/provider/dashboard" : "/dashboard"}
                className="btn-primary px-6 py-3 text-base"
              >
                Go to Dashboard
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary px-6 py-3 text-base">
                  Get Started Free
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link to="/login" className="btn-secondary px-6 py-3 text-base">
                  Sign In
                </Link>
              </>
            )}
          </div>

          {!isAuthenticated && (
            <p className="mt-4 text-xs text-slate-400 dark:text-zinc-500">
              Free to join &middot; No credit card required
            </p>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-zinc-50">{stat.value}</p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight">
              Platform Capabilities
            </h2>
            <p className="mt-3 text-slate-500 dark:text-zinc-400">
              Everything you need to schedule, manage, and complete client bookings.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="group card-hover p-6 sm:p-7">
                <div className="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 sm:py-24 bg-white dark:bg-zinc-900/50 border-y border-slate-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight">
              How Slotify Works
            </h2>
            <p className="mt-3 text-slate-500 dark:text-zinc-400">
              A streamlined flow designed for both customers and service providers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Customer Flow */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-sm">
                  C
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100">For Customers</h3>
              </div>
              <div className="space-y-8">
                {customerSteps.map((step) => (
                  <div key={step.num} className="flex gap-5 group">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {step.num}
                      </div>
                      <div className="flex-1 w-0.5 bg-slate-200 dark:bg-zinc-700 group-last:hidden" />
                    </div>
                    <div className="pb-8 group-last:pb-0">
                      <h4 className="font-semibold text-slate-900 dark:text-zinc-200 text-sm">{step.title}</h4>
                      <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Provider Flow */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400 flex items-center justify-center font-bold text-sm">
                  P
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100">For Providers</h3>
              </div>
              <div className="space-y-8">
                {providerSteps.map((step) => (
                  <div key={step.num} className="flex gap-5 group">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-accent-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {step.num}
                      </div>
                      <div className="flex-1 w-0.5 bg-slate-200 dark:bg-zinc-700 group-last:hidden" />
                    </div>
                    <div className="pb-8 group-last:pb-0">
                      <h4 className="font-semibold text-slate-900 dark:text-zinc-200 text-sm">{step.title}</h4>
                      <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="card p-10 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-200/30 to-transparent dark:from-brand-900/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight">
                  Ready to simplify scheduling?
                </h2>
                <p className="mt-3 text-slate-500 dark:text-zinc-400 max-w-md mx-auto">
                  Join thousands of professionals and customers who trust Slotify for their appointment needs.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link to="/register" className="btn-primary px-6 py-3 text-base">
                    Get Started Free
                  </Link>
                  <Link to="/login" className="btn-secondary px-6 py-3 text-base">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-600 flex items-center justify-center text-white font-bold text-sm">
                  S
                </div>
                <span className="font-bold text-lg text-slate-900 dark:text-zinc-50 tracking-tight">Slotify</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed max-w-xs">
                A modern appointment scheduling platform connecting customers with service providers.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-900 dark:text-zinc-100 uppercase tracking-wider">Platform</h4>
              <ul className="space-y-2">
                <li><a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 no-underline transition-colors">GitHub</a></li>
                <li><Link to="/providers" className="text-sm text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 no-underline transition-colors">Find Providers</Link></li>
                <li><Link to="/register" className="text-sm text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 no-underline transition-colors">Get Started</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-900 dark:text-zinc-100 uppercase tracking-wider">Support</h4>
              <ul className="space-y-2">
                <li><a href="mailto:support@slotify.com" className="text-sm text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 no-underline transition-colors">Contact Support</a></li>
                <li><span className="text-sm text-slate-400 dark:text-zinc-500">&copy; {new Date().getFullYear()} Slotify Inc.</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800 text-center text-xs text-slate-400 dark:text-zinc-600">
            All rights reserved.
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Landing;
