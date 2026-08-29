/**
 * AuthContext for ReliefHub
 * 
 * Provides state for current user session without blocking any public routes.
 * Designed for immediate plug-and-play with Express.js + JWT backend in the future.
 */

import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Check if session user exists in local state
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('reliefhub_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Error loading stored user session', e);
    }
  }, []);

  // Login handler
  const login = async (credentials) => {
    setLoading(true);
    setAuthError(null);
    try {
      const res = await loginUser(credentials);
      if (res.success && res.user) {
        setUser(res.user);
        sessionStorage.setItem('reliefhub_user_preview', JSON.stringify(res.user));
        return { success: true, user: res.user };
      }
      throw new Error(res.message || 'Login failed');
    } catch (error) {
      setAuthError(error.message || 'Failed to sign in');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const register = async (userData) => {
    setLoading(true);
    setAuthError(null);
    try {
      const res = await registerUser(userData);
      if (res.success && res.user) {
        setUser(res.user);
        sessionStorage.setItem('reliefhub_user_preview', JSON.stringify(res.user));
        return { success: true, user: res.user };
      }
      throw new Error(res.message || 'Registration failed');
    } catch (error) {
      setAuthError(error.message || 'Failed to register');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      sessionStorage.removeItem('reliefhub_user_preview');
    }
  };

  const value = {
    user,
    loading,
    authError,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
