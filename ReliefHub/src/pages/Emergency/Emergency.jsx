import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Phone, MapPin, Users, Flame, ShieldAlert } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { DISASTER_TYPES, URGENCY_LEVELS, ASSISTANCE_TYPES } from '../../utils/constants';
import { validateRequired, validatePhone, validatePositiveNumber } from '../../utils/validators';
import { createEmergency } from '../../services/authService';
import './Emergency.css';

const Emergency = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    disasterType: 'Flood',
    numberOfPeople: 1,
    urgencyLevel: 'Critical',
    requiredAssistance: ['Rescue', 'Food', 'Water'],
    additionalDetails: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const toggleAssistance = (type) => {
    setFormData((prev) => {
      const exists = prev.requiredAssistance.includes(type);
      return {
        ...prev,
        requiredAssistance: exists
          ? prev.requiredAssistance.filter((t) => t !== type)
          : [...prev.requiredAssistance, type],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameErr = validateRequired(formData.fullName, 'Full name');
    const phoneErr = validatePhone(formData.phone);
    const locErr = validateRequired(formData.location, 'Location / Address');
    const peopleErr = validatePositiveNumber(formData.numberOfPeople, 'Number of people');
    const assistErr =
      formData.requiredAssistance.length === 0
        ? 'Please select at least one required assistance type'
        : '';

    if (nameErr || phoneErr || locErr || peopleErr || assistErr) {
      setErrors({
        fullName: nameErr,
        phone: phoneErr,
        location: locErr,
        numberOfPeople: peopleErr,
        requiredAssistance: assistErr,
      });
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await createEmergency(formData);
      setSubmittedReport({
        id: response.id || response.emergency?._id || 'EMG_' + Date.now().toString().slice(-6),
        createdMission: response.mission,
        ...formData,
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (err) {
      console.error(err);
      setErrors({
        submit: err.message || 'Unable to transmit emergency report. Please verify connection and retry.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedReport(null);
    setFormData({
      fullName: '',
      phone: '',
      location: '',
      disasterType: 'Flood',
      numberOfPeople: 1,
      urgencyLevel: 'Critical',
      requiredAssistance: ['Rescue', 'Food', 'Water'],
      additionalDetails: '',
    });
  };

  return (
    <div className="relief-emergency-page">
      <div className="container">
        {/* Page Header */}
        <div className="relief-page-header text-center">
          <Badge variant="urgent" dot size="md" className="relief-emergency-badge">
            RAPID DISASTER DISPATCH
          </Badge>
          <h1 className="relief-page-title">Report Emergency</h1>
          <p className="relief-page-subtitle">
            Submit critical emergency requests for immediate rescue, evacuation, food, or medical support.
            Requests are immediately saved to the emergency database and broadcasted to Volunteer Missions.
          </p>
        </div>

        {submittedReport ? (
          /* Success Confirmation View */
          <div className="relief-emergency-success-container">
            <Card className="relief-emergency-success-card" padding="lg">
              <div className="relief-success-icon-wrap">
                <CheckCircle2 size={48} className="relief-success-icon" />
              </div>
              <h2 className="relief-success-title">Emergency Alert Broadcasted!</h2>
              <p className="relief-success-subtext">
                Your emergency request <strong>#{submittedReport.id}</strong> has been stored in the live database and
                an immediate volunteer rescue mission has been generated.
              </p>

              {submittedReport.createdMission && (
                <div className="relief-mission-created-notice">
                  <div className="relief-mission-notice-badge">🤝 Volunteer Mission Created in Database</div>
                  <h4>{submittedReport.createdMission.title}</h4>
                  <p>
                    Required Volunteers: <strong>{submittedReport.createdMission.requiredVolunteers}</strong> &bull; Urgency: <strong>{submittedReport.createdMission.urgency}</strong>
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => window.location.href = '/volunteers'}
                    className="relief-view-mission-btn"
                  >
                    View in Volunteer Missions Board &rarr;
                  </Button>
                </div>
              )}

              <div className="relief-summary-box">
                <div className="relief-summary-row">
                  <span>Location:</span>
                  <strong>{submittedReport.location}</strong>
                </div>
                <div className="relief-summary-row">
                  <span>Disaster Type:</span>
                  <strong>{submittedReport.disasterType}</strong>
                </div>
                <div className="relief-summary-row">
                  <span>Urgency Level:</span>
                  <span className="relief-urgency-tag relief-urgency-tag--critical">
                    {submittedReport.urgencyLevel}
                  </span>
                </div>
                <div className="relief-summary-row">
                  <span>People Needing Aid:</span>
                  <strong>{submittedReport.numberOfPeople} people</strong>
                </div>
                <div className="relief-summary-row">
                  <span>Assistance Requested:</span>
                  <strong>{submittedReport.requiredAssistance.join(', ')}</strong>
                </div>
              </div>

              <div className="relief-success-actions">
                <Button variant="danger" size="md" onClick={handleReset}>
                  Submit Another Emergency
                </Button>
                <Button variant="outline" size="md" onClick={() => window.location.href = '/volunteers'}>
                  Go to Volunteer Missions
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          /* Emergency Form */
          <div className="relief-emergency-form-layout">
            <Card className="relief-emergency-card" padding="lg">
              <form onSubmit={handleSubmit} noValidate className="relief-emergency-form">
                {/* Contact Row */}
                <div className="relief-form-row relief-form-row--2">
                  <div className="relief-field-group">
                    <label className="relief-field-label" htmlFor="emg-name">
                      Full Name *
                    </label>
                    <input
                      id="emg-name"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Tanvir Hossain"
                      className={`relief-input ${errors.fullName ? 'relief-input--error' : ''}`}
                    />
                    {errors.fullName && <span className="relief-field-error">{errors.fullName}</span>}
                  </div>

                  <div className="relief-field-group">
                    <label className="relief-field-label" htmlFor="emg-phone">
                      Phone Number *
                    </label>
                    <input
                      id="emg-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +880 1711-234567"
                      className={`relief-input ${errors.phone ? 'relief-input--error' : ''}`}
                    />
                    {errors.phone && <span className="relief-field-error">{errors.phone}</span>}
                  </div>
                </div>

                {/* Location */}
                <div className="relief-field-group">
                  <label className="relief-field-label" htmlFor="emg-location">
                    Exact Location / Village / Landmark *
                  </label>
                  <input
                    id="emg-location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Ward 4, Companyganj, near Old River Bridge, Sylhet"
                    className={`relief-input ${errors.location ? 'relief-input--error' : ''}`}
                  />
                  {errors.location && <span className="relief-field-error">{errors.location}</span>}
                </div>

                {/* Disaster Type & Urgency & People Row */}
                <div className="relief-form-row relief-form-row--3">
                  <div className="relief-field-group">
                    <label className="relief-field-label" htmlFor="emg-disaster">
                      Disaster Type
                    </label>
                    <select
                      id="emg-disaster"
                      name="disasterType"
                      value={formData.disasterType}
                      onChange={handleInputChange}
                      className="relief-select"
                    >
                      {DISASTER_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relief-field-group">
                    <label className="relief-field-label" htmlFor="emg-urgency">
                      Urgency Level
                    </label>
                    <select
                      id="emg-urgency"
                      name="urgencyLevel"
                      value={formData.urgencyLevel}
                      onChange={handleInputChange}
                      className="relief-select"
                    >
                      {URGENCY_LEVELS.map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relief-field-group">
                    <label className="relief-field-label" htmlFor="emg-people">
                      Number of People *
                    </label>
                    <input
                      id="emg-people"
                      type="number"
                      name="numberOfPeople"
                      min="1"
                      value={formData.numberOfPeople}
                      onChange={handleInputChange}
                      className={`relief-input ${errors.numberOfPeople ? 'relief-input--error' : ''}`}
                    />
                    {errors.numberOfPeople && (
                      <span className="relief-field-error">{errors.numberOfPeople}</span>
                    )}
                  </div>
                </div>

                {/* Required Assistance Multi-select Pills */}
                <div className="relief-field-group">
                  <label className="relief-field-label">Required Assistance *</label>
                  <div className="relief-assistance-chips">
                    {ASSISTANCE_TYPES.map((type) => {
                      const isSelected = formData.requiredAssistance.includes(type);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleAssistance(type)}
                          className={`relief-chip ${isSelected ? 'relief-chip--selected' : ''}`}
                        >
                          {isSelected && '✓ '}
                          {type}
                        </button>
                      );
                    })}
                  </div>
                  {errors.requiredAssistance && (
                    <span className="relief-field-error">{errors.requiredAssistance}</span>
                  )}
                </div>

                {/* Additional Details */}
                <div className="relief-field-group">
                  <label className="relief-field-label" htmlFor="emg-details">
                    Additional Details & Immediate Hazards
                  </label>
                  <textarea
                    id="emg-details"
                    name="additionalDetails"
                    rows="3"
                    value={formData.additionalDetails}
                    onChange={handleInputChange}
                    placeholder="e.g. Water level rising fast, 2 elderly individuals needing stretchers..."
                    className="relief-textarea"
                  />
                </div>

                {/* Submit button */}
                <div className="relief-form-submit-row">
                  <Button
                    type="submit"
                    variant="danger"
                    size="lg"
                    fullWidth
                    disabled={loading}
                    className="relief-submit-emergency-btn"
                  >
                    {loading ? 'Transmitting Emergency Request...' : '🚨 Submit Emergency Request'}
                  </Button>
                </div>
              </form>
            </Card>

            {/* Sidebar Guidelines */}
            <div className="relief-emergency-sidebar">
              <Card className="relief-info-card" padding="normal">
                <div className="relief-info-header">
                  <ShieldAlert size={22} className="relief-info-icon" />
                  <h3 className="relief-info-title">First Response Protocol</h3>
                </div>
                <ul className="relief-info-list">
                  <li>Keep your mobile phone reachable and battery preserved.</li>
                  <li>Move toward higher ground or designated shelter rooftops if flooding rises.</li>
                  <li>Do not attempt to cross heavy flood currents on foot.</li>
                  <li>For life-threatening medical emergencies, call national dispatch: <strong>999</strong></li>
                </ul>
              </Card>

              <Card className="relief-info-card relief-info-card--teal" padding="normal">
                <h4 className="relief-info-card-heading">Need Temporary Shelter?</h4>
                <p className="relief-info-card-subtext">
                  Check available capacity and medical facilities in your nearest community center.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => window.location.href = '/shelters'}
                >
                  View Active Shelters
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Emergency;
