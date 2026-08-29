import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, ShieldAlert, Heart, MapPin, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="relief-footer">
      <div className="container relief-footer-inner">
        {/* Brand & Mission Column */}
        <div className="relief-footer-col relief-footer-brand-col">
          <Link to="/" className="relief-footer-brand">
            <div className="relief-footer-brand-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                <path
                  d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"
                  fill="#e05252"
                />
                <circle cx="12" cy="12" r="3" fill="#ffffff" />
              </svg>
            </div>
            <span className="relief-footer-brand-title">ReliefHub</span>
          </Link>
          <p className="relief-footer-description">
            A unified, transparent disaster-response platform connecting victims,
            volunteers, humanitarian NGOs, and first responders when every second counts.
          </p>
          <div className="relief-footer-badge">
            <span className="relief-footer-badge-dot" /> Live Response Ready
          </div>
        </div>

        {/* Quick Links */}
        <div className="relief-footer-col">
          <h4 className="relief-footer-heading">Platform</h4>
          <ul className="relief-footer-list">
            <li><Link to="/services">All Services</Link></li>
            <li><Link to="/emergency" className="relief-footer-emergency-link">Report Emergency</Link></li>
            <li><Link to="/volunteers">Volunteer Missions</Link></li>
            <li><Link to="/shelters">Find Shelters</Link></li>
            <li><Link to="/campaigns">Relief Campaigns</Link></li>
            <li><Link to="/donate">Donate & Track</Link></li>
          </ul>
        </div>

        {/* Organization Links */}
        <div className="relief-footer-col">
          <h4 className="relief-footer-heading">Organization</h4>
          <ul className="relief-footer-list">
            <li><Link to="/about">About ReliefHub</Link></li>
            <li><Link to="/about#how-it-works">How It Works</Link></li>
            <li><Link to="/login">Partner NGO Login</Link></li>
            <li><Link to="/register">Join as Volunteer</Link></li>
            <li><a href="#transparency">Fund Transparency</a></li>
          </ul>
        </div>

        {/* Emergency Hotlines Column */}
        <div className="relief-footer-col relief-footer-hotline-col">
          <h4 className="relief-footer-heading">Emergency Hotlines</h4>
          <div className="relief-hotline-box">
            <div className="relief-hotline-item">
              <ShieldAlert size={18} className="relief-hotline-icon" />
              <div>
                <div className="relief-hotline-title">National Emergency</div>
                <div className="relief-hotline-num">999 / 1090 (Flood/Cyclone)</div>
              </div>
            </div>
            <div className="relief-hotline-item">
              <PhoneCall size={18} className="relief-hotline-icon" />
              <div>
                <div className="relief-hotline-title">ReliefHub Dispatch</div>
                <div className="relief-hotline-num">+880 9612-000999</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relief-footer-bottom">
        <div className="container relief-footer-bottom-inner">
          <p>© {new Date().getFullYear()} ReliefHub. Built for rapid emergency relief and community support.</p>
          <div className="relief-footer-bottom-links">
            <Link to="/about">Privacy & Trust</Link>
            <span>•</span>
            <Link to="/about">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
