import React from "react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, subtitle, showBack = false, children }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 mb-8">
      {showBack && (
        <div>
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-1.5 text-xs font-bold text-violet-650 dark:text-violet-400 hover:text-violet-750 bg-transparent border-none p-0 cursor-pointer transition-colors"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">&larr;</span> Back
          </button>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-zinc-50 my-0 tracking-tight capitalize">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
