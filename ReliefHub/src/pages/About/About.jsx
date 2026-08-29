import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, Eye, Users, Radio, CheckCircle2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import './About.css';

const ECOSYSTEM_ROLES = [
  {
    title: 'Disaster Victims & Families',
    desc: 'Instantly broadcast rescue SOS alerts with exact GPS locations and needs for medicine, rations, or evacuation.',
  },
  {
    title: 'Volunteers on the Ground',
    desc: 'Find live coordinated missions, join boat rescue teams, and manage emergency shelter supplies.',
  },
  {
    title: 'Partner Humanitarian NGOs',
    desc: 'Coordinate aid logistics across districts without duplication of relief packages.',
  },
  {
    title: 'Emergency Response Agencies',
    desc: 'Access consolidated emergency incident heatmaps for efficient deployment of civil defense units.',
  },
  {
    title: 'Donors & Global Supporters',
    desc: 'Track every dollar and taka transparently with live fund allocation receipts.',
  },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="relief-about-page">
      <div className="container">
        {/* Header */}
        <div className="relief-page-header text-center">
          <Badge variant="live" dot size="md" className="relief-about-badge">
            OUR MISSION & PILLARS
          </Badge>
          <h1 className="relief-page-title">About ReliefHub</h1>
          <p className="relief-page-subtitle">
            ReliefHub was founded on a singular premise: when disaster strikes, delays cost lives.
            We provide a modern, high-speed coordination bridge between affected communities and emergency responders.
          </p>
        </div>

        {/* Why ReliefHub Exists Card */}
        <Card className="relief-about-hero-card" padding="lg">
          <div className="relief-about-mission-content">
            <h2 className="relief-about-section-heading">Why ReliefHub Exists</h2>
            <p>
              During major flash floods, cyclones, and fires in vulnerable regions, fragmented
              communication is the greatest impediment to survival. Rescue requests get lost in
              scattered social media posts, while volunteer groups unwittingly distribute aid to the
              same accessible roads while remote villages remain unreached.
            </p>
            <p>
              ReliefHub unites all relief efforts into a <strong>single real-time operational map</strong>—connecting
              victims directly to verified volunteers, vetted NGOs, and national disaster response teams.
            </p>
          </div>
        </Card>

        {/* Ecosystem Grid */}
        <div className="relief-ecosystem-section" id="how-it-works">
          <h2 className="relief-about-section-heading text-center">How the Ecosystem Works</h2>
          <div className="relief-ecosystem-grid">
            {ECOSYSTEM_ROLES.map((role, idx) => (
              <Card key={idx} className="relief-ecosystem-card" padding="normal">
                <div className="relief-ecosystem-num">0{idx + 1}</div>
                <h3 className="relief-ecosystem-title">{role.title}</h3>
                <p className="relief-ecosystem-desc">{role.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Transparency & Governance */}
        <div className="relief-transparency-section" id="transparency">
          <Card className="relief-transparency-card" padding="lg">
            <div className="relief-transparency-icon-box">
              <ShieldCheck size={36} color="#0a5c48" />
            </div>
            <div className="relief-transparency-text">
              <h3 className="relief-transparency-title">Audited Fund Transparency</h3>
              <p>
                Every donation submitted through ReliefHub is mapped directly to verified emergency
                procurement needs. We publish real-time disbursement manifests and partner NGO vouchers
                so donors can verify exactly how their relief funds reach beneficiaries on the ground.
              </p>
            </div>
          </Card>
        </div>

        {/* Call to action */}
        <div className="relief-about-cta text-center">
          <h3 className="relief-about-cta-title">Ready to Make an Impact?</h3>
          <p className="relief-about-cta-sub">
            Join thousands of volunteers, organizations, and contributors across the country.
          </p>
          <div className="relief-about-cta-btns">
            <Button variant="primary" size="lg" onClick={() => navigate('/register')}>
              Join the Network
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/services')}>
              Explore Services
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
