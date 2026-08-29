import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Services from '../pages/Services/Services';
import Emergency from '../pages/Emergency/Emergency';
import Donate from '../pages/Donate/Donate';
import Volunteers from '../pages/Volunteers/Volunteers';
import Shelters from '../pages/Shelters/Shelters';
import Campaigns from '../pages/Campaigns/Campaigns';
import About from '../pages/About/About';
import NotFound from '../pages/NotFound/NotFound';

/**
 * Main Application Routing
 * All routes are unblocked and publicly accessible for initial phase.
 * Ready for future ProtectedRoute wraps when Express backend is connected.
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/services" element={<Services />} />
      <Route path="/emergency" element={<Emergency />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/volunteers" element={<Volunteers />} />
      <Route path="/shelters" element={<Shelters />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/about" element={<About />} />
      {/* 404 Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
