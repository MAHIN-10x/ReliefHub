import React from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../common/Badge';
import Button from '../common/Button';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relief-hero">
      {}
      <div className="relief-hero-decorations" aria-hidden="true">
        <div className="relief-hero-circle relief-hero-circle--1" />
        <div className="relief-hero-circle relief-hero-circle--2" />
        <div className="relief-hero-circle relief-hero-circle--3" />
      </div>

      <div className="container relief-hero-container">
        {/* Pill Badge */}
        <div className="relief-hero-badge-wrap">
          <Badge variant="live" dot size="md">
            LIVE DISASTER RESPONSE PLATFORM
          </Badge>
        </div>

        {/* Hero Title */}
        <h1 className="relief-hero-title">
          When disaster strikes, every<br className="relief-hero-br" /> second matters.
        </h1>

        {/* Supporting Text */}
        <p className="relief-hero-description">
          ReliefHub connects disaster victims, volunteers, NGOs and emergency agencies in one
          platform so help can reach the people who need it faster.
        </p>

        {/* Action Buttons */}
        <div className="relief-hero-actions">
          <Button
            variant="danger"
            size="lg"
            onClick={() => navigate('/emergency')}
            className="relief-hero-report-btn"
          >
            🚨 Report Emergency
          </Button>

          <Button
            variant="white"
            size="lg"
            onClick={() => navigate('/services')}
            className="relief-hero-explore-btn"
          >
            Explore ReliefHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
