import { BrowserRouter } from 'react-router-dom'
import { Link } from "react-router-dom";
import React, { useEffect } from 'react';
import Routes from '../routes/Index';
//import './App.css'
import { useNavigate } from 'react-router-dom';

export default function App() {
  const navigateTo = useNavigate();
  const isAuthenticated = !!sessionStorage.getItem('token'); // Cek apakah token tersedia di localStorage
  // Redirect otomatis jika token tersedia
  useEffect(() => {
    if (isAuthenticated) {
      navigateTo('/dashboard')
    }
    else{
      navigateTo('/login')
    }
  }, [navigateTo, isAuthenticated]);
  return (
    
    <>
    
      <Routes />
    </>
  )
}
