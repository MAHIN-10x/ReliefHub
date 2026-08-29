import React from 'react';
import Card from '../common/Card';
import { INITIAL_STATISTICS } from '../../utils/constants';
import './Statistics.css';

const Statistics = ({ stats = INITIAL_STATISTICS }) => {
  return (
    <section className="relief-stats-section">
      <div className="container">
        <div className="relief-stats-grid">
          {stats.map((item) => (
            <Card key={item.id} className="relief-stat-card" padding="normal">
              <div className="relief-stat-value">{item.value}</div>
              <div className="relief-stat-label">{item.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
