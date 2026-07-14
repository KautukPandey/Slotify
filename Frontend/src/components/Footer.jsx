import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <span className="font-bold text-xl text-brand-600 dark:text-brand-400 tracking-tight flex items-center gap-1.5">
              Slotify
              <span className="w-1.5 h-1.5 bg-brand-600 rounded-full inline-block" />
            </span>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              A modern service marketplace connecting top professionals with clients.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 list-none p-0">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 no-underline transition-colors">
                  GitHub Project
                </a>
              </li>
              <li>
                <Link to="/providers" className="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 no-underline transition-colors">
                  Browse Providers
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 no-underline transition-colors">
                  Join as Pro
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 list-none p-0">
              <li>
                <a href="mailto:support@slotify.com" className="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 no-underline transition-colors">
                  support@slotify.com
                </a>
              </li>
              <li>
                <span className="text-sm text-slate-400 dark:text-slate-500">
                  &copy; {new Date().getFullYear()} Slotify Inc. All rights reserved.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500/80">
          Crafted with care.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
