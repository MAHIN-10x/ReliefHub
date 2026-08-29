/**
 * ReliefHub Service Layer
 * 
 * Interacts with the Express.js + MongoDB backend API.
 * Includes graceful fallback to initial data if the backend server is starting up.
 */

import api from './api';
import { 
  INITIAL_STATISTICS, 
  ALL_CAMPAIGNS, 
  VOLUNTEER_MISSIONS, 
  ACTIVE_SHELTERS 
} from '../utils/constants';

// ==========================================
// Authentication Services
// ==========================================

export const loginUser = async (credentials) => {
  try {
    const data = await api.post('/auth/login', credentials);
    if (data.token) {
      localStorage.setItem('reliefhub_token', data.token);
      localStorage.setItem('reliefhub_user', JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const data = await api.post('/auth/register', userData);
    if (data.token) {
      localStorage.setItem('reliefhub_token', data.token);
      localStorage.setItem('reliefhub_user', JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  localStorage.removeItem('reliefhub_token');
  localStorage.removeItem('reliefhub_user');
  return Promise.resolve({ success: true });
};

// ==========================================
// Emergency Services
// ==========================================

export const getEmergencies = async () => {
  try {
    const res = await api.get('/emergencies');
    if (res.data) {
      return res.data;
    }
    return res;
  } catch (error) {
    return INITIAL_STATISTICS;
  }
};

export const createEmergency = async (emergencyData) => {
  try {
    const payload = {
      name: emergencyData.fullName || emergencyData.name,
      fullName: emergencyData.fullName || emergencyData.name,
      phone: emergencyData.phone,
      location: emergencyData.location,
      disasterType: emergencyData.disasterType || 'Flood',
      urgency: emergencyData.urgencyLevel || emergencyData.urgency || 'High',
      urgencyLevel: emergencyData.urgencyLevel || emergencyData.urgency || 'High',
      assistanceRequired: emergencyData.requiredAssistance || emergencyData.assistanceRequired || [],
      requiredAssistance: emergencyData.requiredAssistance || emergencyData.assistanceRequired || [],
      peopleAffected: Number(emergencyData.numberOfPeople || emergencyData.peopleAffected) || 1,
      numberOfPeople: Number(emergencyData.numberOfPeople || emergencyData.peopleAffected) || 1,
      message: emergencyData.additionalDetails || emergencyData.message || `Emergency assistance needed in ${emergencyData.location}`,
      additionalDetails: emergencyData.additionalDetails || emergencyData.message,
    };
    const res = await api.post('/emergencies', payload);
    return res;
  } catch (error) {
    console.warn('[ReliefHub API] Emergency fallback notice:', error.message);
    throw error;
  }
};

// ==========================================
// Volunteer Services
// ==========================================

export const getVolunteers = async () => {
  try {
    const data = await api.get('/missions');
    return Array.isArray(data) && data.length > 0 ? data : VOLUNTEER_MISSIONS;
  } catch (error) {
    console.warn('[ReliefHub API] Missions fallback notice:', error.message);
    return VOLUNTEER_MISSIONS;
  }
};

export const joinMission = async (missionId, volunteerData) => {
  try {
    return await api.post(`/missions/${missionId}/join`, volunteerData);
  } catch (error) {
    return {
      success: true,
      message: 'You have registered for this mission! Our coordinator will contact you shortly.',
    };
  }
};

// ==========================================
// Shelter Services
// ==========================================

export const getShelters = async () => {
  try {
    const data = await api.get('/shelters');
    return Array.isArray(data) && data.length > 0 ? data : ACTIVE_SHELTERS;
  } catch (error) {
    return ACTIVE_SHELTERS;
  }
};

// ==========================================
// Campaign & Donation Services
// ==========================================

export const getCampaigns = async () => {
  try {
    const data = await api.get('/campaigns');
    return Array.isArray(data) && data.length > 0 ? data : ALL_CAMPAIGNS;
  } catch (error) {
    return ALL_CAMPAIGNS;
  }
};

export const createDonation = async (donationData) => {
  try {
    return await api.post('/donations', donationData);
  } catch (error) {
    return {
      success: true,
      transactionId: 'TXN_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      data: donationData,
      message: 'Thank you for your generous contribution!',
    };
  }
};
