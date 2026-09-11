import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, HeartHandshake, ShieldCheck, Flame, Droplets, Wind, Mountain } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { ALL_CAMPAIGNS } from '../../utils/constants';
import { getCampaigns } from '../../services/authService';
import './Campaigns.css';

const categoryIcons = {
  Flood: Droplets,
  Cyclone: Wind,
  Landslide: Mountain,
  Fire: Flame,
};

const Campaigns = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState(ALL_CAMPAIGNS);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    getCampaigns().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setCampaigns(data);
      }
    });
  }, []);

  const categories = ['All', 'Flood', 'Cyclone', 'Landslide', 'Fire'];

  const filteredCampaigns = selectedCategory === 'All'
    ? campaigns
    : campaigns.filter((c) => c.category === selectedCategory);

  return (
    <div className="relief-campaigns-page">
      <div className="container">
        {/* Page Header */}
        <div className="relief-page-header text-center">
          <Badge variant="live" dot size="md" className="relief-campaigns-badge">
            VERIFIED HUMANITARIAN APPEALS
          </Badge>
          <h1 className="relief-page-title">Active Relief Campaigns</h1>
          <p className="relief-page-subtitle">
            Transparent, audited disaster relief efforts currently on the ground.
            Track real-time fundraising targets and fund allocations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="relief-campaign-filter-bar">
          <span className="relief-filter-label">Filter by Disaster:</span>
          <div className="relief-filter-chips">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`relief-filter-btn ${
                  selectedCategory === cat ? 'relief-filter-btn--active' : ''
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="relief-campaigns-grid">
          {filteredCampaigns.map((campaign) => {
            const Icon = categoryIcons[campaign.category] || Droplets;
            const progress = Math.min(
              100,
              Math.round((campaign.raisedAmount / campaign.targetAmount) * 100)
            );

            return (
              <Card key={campaign.id} className="relief-full-campaign-card" padding="normal">
                {/* Header */}
                <div className="relief-campaign-card-header">
                  <div className="relief-campaign-icon-box">
                    <Icon size={22} color="#0a5c48" />
                  </div>
                  <div className="relief-campaign-category-status">
                    <span className="relief-campaign-cat-pill">{campaign.category}</span>
                    <Badge variant={campaign.status === 'Urgent' ? 'urgent' : 'success'} size="sm">
                      {campaign.status}
                    </Badge>
                  </div>
                </div>

                <h3 className="relief-campaign-card-title">{campaign.title}</h3>

                <div className="relief-campaign-location-meta">
                  <MapPin size={15} className="relief-campaign-loc-icon" />
                  <span>{campaign.location}</span>
                </div>

                <p className="relief-campaign-card-desc">{campaign.description}</p>

                {/* Progress bar */}
                <div className="relief-campaign-progress-section">
                  <div className="relief-campaign-progress-bar">
                    <div
                      className="relief-campaign-progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="relief-campaign-progress-numbers">
                    <span>
                      <strong>৳{campaign.raisedAmount.toLocaleString()}</strong> raised
                    </span>
                    <span className="relief-campaign-pct">{progress}%</span>
                  </div>
                  <div className="relief-campaign-target-sub">
                    Goal: ৳{campaign.targetAmount.toLocaleString()} ({campaign.donorsCount || 100}+ supporters)
                  </div>
                </div>

                {/* Donate CTA */}
                <div className="relief-campaign-card-action">
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => navigate('/donate')}
                  >
                    Donate to This Appeal
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
