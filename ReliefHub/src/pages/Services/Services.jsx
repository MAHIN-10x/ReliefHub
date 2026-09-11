import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Users, Home, HeartHandshake, ArrowRight } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import './Services.css';

const SERVICES_DATA = [
  {
    id: 'service-emergency',
    title: 'Rapid Emergency Dispatch',
    tagline: 'Instant disaster alert broadcasting for critical response',
    icon: ShieldAlert,
    iconColor: '#e05252',
    iconBg: '#fee2e2',
    description:
      'Submit real-time disaster reports with precise GPS coordinates, flood depths, trapped counts, and requested resources. Our smart routing alerts the closest boat patrols, fire rescue teams, and district emergency controllers immediately.',
    features: [
      'High-priority triage with instant hazard tagging',
      'Direct dispatch to regional rescue units',
      'Real-time status tracking for affected individuals',
    ],
    actionText: 'Report Emergency Now',
    actionVariant: 'danger',
    link: '/emergency',
  },
  {
    id: 'service-volunteer',
    title: 'Volunteer Mobilization',
    tagline: 'Empowering on-the-ground volunteers where hands are needed most',
    icon: Users,
    iconColor: '#0a5c48',
    iconBg: '#e6f4f0',
    description:
      'Join targeted volunteer missions for rescue boat operations, medical tablet distribution, cooked food delivery, and shelter management. Match your skills with high-impact disaster relief zones in real time.',
    features: [
      'Filtered by skill type: Medical, Boat, Food, Logistics',
      'Direct team leader contact and live mission briefs',
      'Coordinated volunteer team rosters',
    ],
    actionText: 'Explore Volunteer Missions',
    actionVariant: 'primary',
    link: '/volunteers',
  },
  {
    id: 'service-shelter',
    title: 'Shelter Capacity & Resource Locator',
    tagline: 'Live tracking of shelter capacity, dry rations, and medical aid',
    icon: Home,
    iconColor: '#0284c7',
    iconBg: '#e0f2fe',
    description:
      'Browse active public and community shelters. Check live occupancy levels, remaining bed spaces, clean water filtration availability, on-site paramedic support, and emergency contact numbers before evacuating.',
    features: [
      'Live available space counter & capacity status',
      'Food supplies and medical coverage overview',
      'Specialized care areas for infants and elders',
    ],
    actionText: 'Find Nearest Shelter',
    actionVariant: 'primary',
    link: '/shelters',
  },
  {
    id: 'service-donate',
    title: 'Transparent Relief Donations',
    tagline: '100% verified campaigns with end-to-end fund tracking',
    icon: HeartHandshake,
    iconColor: '#16a34a',
    iconBg: '#dcfce7',
    description:
      'Contribute directly to verified flood, cyclone, and fire recovery campaigns. Every donation is allocated to essential supply procurement—including dry rations, water purifiers, and emergency shelter kits.',
    features: [
      'Preset and custom donation amounts with instant receipts',
      'Verified humanitarian NGO and agency campaigns',
      'Transparent milestone and fund distribution reports',
    ],
    actionText: 'Support Active Campaigns',
    actionVariant: 'primary',
    link: '/donate',
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="relief-services-page">
      <div className="container">
        {/* Header */}
        <div className="relief-page-header text-center">
          <Badge variant="live" dot size="md" className="relief-services-badge">
            DISASTER RESPONSE ECOSYSTEM
          </Badge>
          <h1 className="relief-page-title">ReliefHub Services</h1>
          <p className="relief-page-subtitle">
            A comprehensive, technology-driven platform engineered to coordinate every critical phase
            of disaster relief—from emergency callout to long-term rehabilitation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="relief-services-grid">
          {SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.id} className="relief-service-card" padding="lg">
                <div className="relief-service-top">
                  <div
                    className="relief-service-icon-box"
                    style={{ backgroundColor: service.iconBg }}
                  >
                    <Icon size={26} color={service.iconColor} />
                  </div>
                  <div>
                    <h2 className="relief-service-title">{service.title}</h2>
                    <span className="relief-service-tagline">{service.tagline}</span>
                  </div>
                </div>

                <p className="relief-service-desc">{service.description}</p>

                <div className="relief-service-features">
                  <h4 className="relief-service-features-heading">Key Capabilities:</h4>
                  <ul>
                    {service.features.map((feat, idx) => (
                      <li key={idx}>
                        <span className="relief-service-check">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relief-service-action-wrap">
                  <Button
                    variant={service.actionVariant}
                    size="md"
                    onClick={() => navigate(service.link)}
                  >
                    {service.actionText} <ArrowRight size={16} />
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

export default Services;
