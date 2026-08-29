import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import { HOW_IT_HELPS } from '../../utils/constants';
import './HowItHelps.css';

const HowItHelps = ({ items = HOW_IT_HELPS }) => {
  const navigate = useNavigate();

  return (
    <section className="relief-how-section">
      <div className="container">
        <h2 className="relief-how-title">How ReliefHub Helps</h2>

        <div className="relief-how-grid">
          {items.map((item) => (
            <Card
              key={item.id}
              className="relief-how-card"
              padding="normal"
              interactive
              onClick={() => item.link && navigate(item.link)}
            >
              <div
                className="relief-how-icon-box"
                style={{ backgroundColor: item.badgeColor || '#f3f4f6' }}
              >
                <span className="relief-how-emoji">{item.icon}</span>
              </div>
              <h3 className="relief-how-card-title">{item.title}</h3>
              <p className="relief-how-card-desc">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItHelps;
