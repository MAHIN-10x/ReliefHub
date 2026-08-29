import React from 'react';
import Hero from '../../components/home/Hero';
import Statistics from '../../components/home/Statistics';
import HowItHelps from '../../components/home/HowItHelps';
import EmergencyBanner from '../../components/home/EmergencyBanner';
import CampaignCard from '../../components/home/CampaignCard';
import './Home.css';

const Home = () => {
  return (
    <div className="relief-home-page">
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Statistics Overview */}
      <Statistics />

      {/* 3. How ReliefHub Helps Section */}
      <HowItHelps />

      {/* 4. Urgent Assistance Callout Banner */}
      <EmergencyBanner />

      {/* 5. Active Relief Campaign Card */}
      <CampaignCard />
    </div>
  );
};

export default Home;
