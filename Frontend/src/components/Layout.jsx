import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children, className = "" }) => {
  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-150 flex flex-col ${className}`}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
