import React from "react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, subtitle, showBack = false, children }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 mb-8 animate-fade-in">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors w-fit cursor-pointer bg-transparent border-none p-0"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      )}

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-[30px] font-semibold text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {children && <div className="flex items-center gap-3 shrink-0">{children}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
