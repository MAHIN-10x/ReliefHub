import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Emergency from '../pages/Emergency/Emergency';
import Donate from '../pages/Donate/Donate';
import Volunteers from '../pages/Volunteers/Volunteers';
import Shelters from '../pages/Shelters/Shelters';
import About from '../pages/About/About';
import Services from '../pages/Services/Services';
import NotFound from '../pages/NotFound/NotFound';


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
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
