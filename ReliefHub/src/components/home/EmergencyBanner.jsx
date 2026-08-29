import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import './EmergencyBanner.css';

const EmergencyBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="relief-urgent-section">
      <div className="container">
        <div className="relief-urgent-banner">
          <div className="relief-urgent-content">
            <h3 className="relief-urgent-heading">Need urgent assistance?</h3>
            <p className="relief-urgent-subtext">
              Submit your location and emergency details to the response team.
            </p>
          </div>
          <div className="relief-urgent-action">
            <Button
              variant="danger"
              size="md"
              onClick={() => navigate('/emergency')}
              className="relief-urgent-btn"
            >
              Report Emergency
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyBanner;
