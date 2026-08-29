import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import { FEATURED_CAMPAIGN } from '../../utils/constants';
import './CampaignCard.css';

const CampaignCard = ({ campaign = FEATURED_CAMPAIGN, isSection = true }) => {
  const navigate = useNavigate();

  const progressPercentage = Math.min(
    100,
    Math.round((campaign.raisedAmount / campaign.targetAmount) * 100)
  );

  const formattedRaised = `${campaign.currency || '৳'}${campaign.raisedAmount.toLocaleString()}`;
  const formattedTarget = `${campaign.currency || '৳'}${campaign.targetAmount.toLocaleString()}`;

  const cardContent = (
    <Card className="relief-campaign-card" padding="normal">
      {/* Title & Icon */}
      <div className="relief-campaign-header">
        <div className="relief-campaign-icon-wrap">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path
              d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
              fill="#0ea5e9"
            />
          </svg>
        </div>
        <h3 className="relief-campaign-title">{campaign.title}</h3>
      </div>

      {/* Description */}
      <p className="relief-campaign-desc">{campaign.description}</p>

      {/* Progress Bar */}
      <div className="relief-campaign-progress-wrap">
        <div className="relief-campaign-progress-bar">
          <div
            className="relief-campaign-progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Raised Stats */}
      <div className="relief-campaign-stats">
        <span className="relief-campaign-raised-text">
          <strong>{formattedRaised}</strong> raised of <strong>{formattedTarget}</strong>
        </span>
        <span className="relief-campaign-pct">{progressPercentage}%</span>
      </div>

      {/* Action Button */}
      <div className="relief-campaign-action">
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/donate')}
          className="relief-campaign-donate-btn"
        >
          Donate Now
        </Button>
      </div>
    </Card>
  );

  if (!isSection) {
    return cardContent;
  }

  return (
    <section className="relief-campaign-section">
      <div className="container relief-campaign-container">
        <h2 className="relief-campaign-section-title">Active Relief Campaign</h2>
        <div className="relief-campaign-grid-single">
          {cardContent}
        </div>
      </div>
    </section>
  );
};

export default CampaignCard;
