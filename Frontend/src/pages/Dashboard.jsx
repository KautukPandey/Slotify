import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../services/api"

const Dashboard = () => {
  const navigate = useNavigate();
  const [name,setName] = useState();
  useEffect(()=>{
    const token = localStorage.getItem('token')

    if(!token){
      navigate('/login')
    }

    const getName = async() => {
      const response = await api.get("/auth/getMe", {
        headers: {
          Authorization: `Bearer ${token}`
          }
        })
      setName(response.data.name)
      console.log(response.data)
    }

    const getAppointments = async() => {
      try {
        const response = await api.get("/slot/")
      } catch (error) {
        console.log(error);
        
      }
    }
    getName()
  },[])

  return (
    <div className="login-page">
      <h1>Dashboard</h1>
      <h3>Welcome {name}</h3>
    </div>
  );
};

export default Dashboard;
