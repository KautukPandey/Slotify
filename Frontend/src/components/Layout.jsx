import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children, className = "" }) => {
  return (
    <div className={`min-h-screen bg-[#faf8ff] dark:bg-[#020617] text-slate-800 dark:text-slate-200 flex flex-col ${className}`}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
