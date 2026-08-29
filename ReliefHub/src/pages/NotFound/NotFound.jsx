import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';
import Button from '../../components/common/Button';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relief-notfound-page">
      <div className="container relief-notfound-container text-center">
        <div className="relief-notfound-icon-wrap">
          <AlertCircle size={64} className="relief-notfound-icon" />
        </div>
        <span className="relief-notfound-code">404</span>
        <h1 className="relief-notfound-title">Page Not Found</h1>
        <p className="relief-notfound-desc">
          The requested disaster response page or resource does not exist or has been relocated.
        </p>
        <div className="relief-notfound-action">
          <Button variant="primary" size="lg" onClick={() => navigate('/')}>
            <Home size={18} /> Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
