import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import './AuthBranding.css';

const AuthBranding = () => {
  return (
    <div className="relief-auth-brand-pane">
      {/* Background circular decorations matching screenshots */}
      <div className="relief-auth-brand-decorations" aria-hidden="true">
        <div className="relief-auth-circle relief-auth-circle--1" />
        <div className="relief-auth-circle relief-auth-circle--2" />
        <div className="relief-auth-circle relief-auth-circle--3" />
      </div>

      <div className="relief-auth-brand-content">
        {/* Brand Logo */}
        <Link to="/" className="relief-auth-logo">
          <div className="relief-auth-logo-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
              <path
                d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"
                fill="#e05252"
              />
              <circle cx="12" cy="12" r="3.5" fill="#ffffff" />
            </svg>
          </div>
          <span className="relief-auth-logo-text">ReliefHub</span>
        </Link>

        {/* Live pill badge */}
        <div className="relief-auth-badge-wrap">
          <Badge variant="live" size="sm">
            LIVE DISASTER RESPONSE PLATFORM
          </Badge>
        </div>

        {/* Large Typography Headline */}
        <h1 className="relief-auth-headline">
          When disaster<br />
          strikes,<br />
          every second<br />
          matters.
        </h1>

        {/* Supporting description */}
        <p className="relief-auth-subtext">
          ReliefHub connects disaster victims, volunteers, NGOs and emergency
          agencies so help can reach the people who need it faster.
        </p>

        {/* Bullet feature list */}
        <ul className="relief-auth-features">
          <li className="relief-auth-feature-item">
            <span className="relief-auth-bullet">•</span>
            <span>Respond to emergency requests faster</span>
          </li>
          <li className="relief-auth-feature-item">
            <span className="relief-auth-bullet">•</span>
            <span>Connect volunteers and NGOs</span>
          </li>
          <li className="relief-auth-feature-item">
            <span className="relief-auth-bullet">•</span>
            <span>Coordinate available shelters</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AuthBranding;
