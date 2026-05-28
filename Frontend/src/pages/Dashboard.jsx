import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token')

    if(!token){
      navigate('/login')
    }
  },[])

  return (
    <div className="login-page">
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
