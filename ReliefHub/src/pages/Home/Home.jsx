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
      {}
      <Hero />

      {}
      <Statistics />

      {}
      <HowItHelps />

      {}
      <EmergencyBanner />

      {}
      <CampaignCard />
    </div>
  );
};

export default Home;
