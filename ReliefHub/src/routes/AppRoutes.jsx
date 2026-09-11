import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Emergency from '../pages/Emergency/Emergency';
import Donate from '../pages/Donate/Donate';
import Volunteers from '../pages/Volunteers/Volunteers';
import Shelters from '../pages/Shelters/Shelters';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/emergency" element={<Emergency />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/volunteers" element={<Volunteers />} />
      <Route path="/shelters" element={<Shelters />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
