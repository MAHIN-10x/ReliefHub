import React, { useState, useEffect, useCallback } from 'react';
import { 
  MapPin, 
  Users, 
  Calendar, 
  AlertCircle, 
  Phone, 
  CheckCircle, 
  RotateCw, 
  Database, 
  Search, 
  ShieldAlert 
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { VOLUNTEER_MISSIONS } from '../../utils/constants';
import { joinMission, getVolunteers } from '../../services/authService';
import './Volunteers.css';

const Volunteers = () => {
  const [missions, setMissions] = useState(VOLUNTEER_MISSIONS);
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMission, setSelectedMission] = useState(null);
  const [joiningMission, setJoiningMission] = useState(null);
  const [joinForm, setJoinForm] = useState({ name: '', phone: '', note: '' });
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLiveDB, setIsLiveDB] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchMissions = useCallback(async () => {
    setIsFetching(true);
    try {
      const data = await getVolunteers();
      if (Array.isArray(data) && data.length > 0) {
        setMissions(data);
        setIsLiveDB(true);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.warn('Volunteers load notice:', err);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

  const dynamicTypes = [
    'All',
    'Rescue & Food Aid',
    'Medical Assistance',
    'Shelter Management',
    'Disaster Prevention',
    ...new Set(missions.map((m) => m.missionType).filter(Boolean)),
  ].filter((v, i, a) => a.indexOf(v) === i);

  const filteredMissions = missions.filter((m) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      (m.title && m.title.toLowerCase().includes(q)) ||
      (m.location && m.location.toLowerCase().includes(q)) ||
      (m.description && m.description.toLowerCase().includes(q));

    const matchesType = filterType === 'All' || m.missionType === filterType;
    return matchesQuery && matchesType;
  });

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    if (!joinForm.name || !joinForm.phone) {
      alert('Please fill in your name and contact phone.');
      return;
    }
    setLoading(true);
    try {
      const targetId = joiningMission.id || joiningMission._id;
      await joinMission(targetId, joinForm);
      setJoinSuccess(true);
      // Update local state count
      setMissions((prev) =>
        prev.map((m) => {
          const mId = m.id || m._id;
          return mId === targetId
            ? { ...m, joinedVolunteers: (Number(m.joinedVolunteers) || 0) + 1 }
            : m;
        })
      );
    } catch (err) {
      alert('Registration error: ' + (err.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const closeJoinModal = () => {
    setJoiningMission(null);
    setJoinSuccess(false);
    setJoinForm({ name: '', phone: '', note: '' });
  };

  return (
    <div className="relief-volunteers-page">
      <div className="container">
        {/* Page Header */}
        <div className="relief-page-header text-center">
          <Badge variant="live" dot size="md" className="relief-volunteers-badge">
            GRASSROOTS RESPONSE NETWORK
          </Badge>
          <h1 className="relief-page-title">Volunteer Missions</h1>
          <p className="relief-page-subtitle">
            Stand alongside humanitarian teams on the frontlines. Live emergency requests are
            automatically dispatched here for immediate volunteer mobilization.
          </p>

          {/* Database Live Status & Quick Refresh */}
          <div className="relief-volunteer-status-bar">
            <div className="relief-volunteer-db-tag">
              <Database size={15} className={isLiveDB ? 'text-success' : 'text-primary'} />
              <span>
                {isLiveDB ? 'MongoDB Atlas Connected' : 'Standard Mock Fallback'} &bull;{' '}
                <strong>{missions.length} Active Missions</strong>
                {lastUpdated && ` (Updated ${lastUpdated})`}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchMissions}
              disabled={isFetching}
              className="relief-volunteer-refresh-btn"
            >
              <RotateCw size={14} className={isFetching ? 'relief-spin' : ''} />
              {isFetching ? 'Syncing...' : 'Sync Missions'}
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="relief-volunteer-controls">
          <div className="relief-volunteer-search-box">
            <Search size={18} className="relief-search-icon" />
            <input
              type="text"
              placeholder="Search missions by title, location or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relief-volunteer-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="relief-search-clear"
                onClick={() => setSearchQuery('')}
              >
                &times;
              </button>
            )}
          </div>

          <div className="relief-missions-filter-bar">
            <div className="relief-filter-chips">
              {dynamicTypes.map((type) => (
                <button
                  key={type}
                  className={`relief-filter-btn ${filterType === type ? 'relief-filter-btn--active' : ''}`}
                  onClick={() => setFilterType(type)}
                >
                  {type === 'All' ? `All (${missions.length})` : type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Missions Grid */}
        {filteredMissions.length === 0 ? (
          <div className="relief-missions-empty">
            <ShieldAlert size={40} color="#0284c7" />
            <h3>No missions match your filter</h3>
            <p>Try resetting the search or category filter to view all missions.</p>
            <Button variant="secondary" size="sm" onClick={() => { setSearchQuery(''); setFilterType('All'); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="relief-missions-grid">
            {filteredMissions.map((mission, idx) => {
              const joined = Number(mission.joinedVolunteers) || 0;
              const required = Number(mission.requiredVolunteers) || 1;
              const isFull = joined >= required;
              const progress = Math.min(100, Math.round((joined / required) * 100));
              const missionKey = mission.id || mission._id || `mis-${idx}`;

              return (
                <Card key={missionKey} className="relief-mission-card" padding="normal">
                  {/* Header */}
                  <div className="relief-mission-card-top">
                    <Badge
                      variant={
                        mission.urgency === 'Critical'
                          ? 'urgent'
                          : mission.urgency === 'High'
                            ? 'warning'
                            : 'info'
                      }
                      size="sm"
                    >
                      {mission.urgency} Urgency
                    </Badge>
                    <span className="relief-mission-type-tag">{mission.missionType}</span>
                  </div>

                  <h3 className="relief-mission-title">{mission.title}</h3>

                  {/* Details List */}
                  <div className="relief-mission-meta">
                    <div className="relief-mission-meta-item">
                      <MapPin size={16} className="relief-meta-icon" />
                      <span>{mission.location}</span>
                    </div>
                    <div className="relief-mission-meta-item">
                      <Calendar size={16} className="relief-meta-icon" />
                      <span>{mission.date || 'Immediate'}</span>
                    </div>
                    <div className="relief-mission-meta-item">
                      <Users size={16} className="relief-meta-icon" />
                      <span>
                        <strong>{joined}</strong> of <strong>{required}</strong> Volunteers Registered
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="relief-mission-progress-track">
                    <div
                      className="relief-mission-progress-bar"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <p className="relief-mission-desc">{mission.description}</p>

                  {/* Action Buttons */}
                  <div className="relief-mission-actions">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedMission(mission)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={isFull}
                      onClick={() => setJoiningMission(mission)}
                    >
                      {isFull ? 'Mission Full' : 'Join Mission'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* View Details Modal */}
        <Modal
          isOpen={!!selectedMission}
          onClose={() => setSelectedMission(null)}
          title="Mission Details"
        >
          {selectedMission && (
            <div className="relief-modal-mission-details">
              <h3 className="relief-modal-mission-name">{selectedMission.title}</h3>
              <div className="relief-modal-badges">
                <Badge variant="urgent">{selectedMission.urgency} Urgency</Badge>
                <Badge variant="info">{selectedMission.missionType}</Badge>
              </div>

              <div className="relief-modal-section">
                <h4 className="relief-modal-subheading">Location & Timing</h4>
                <p>📍 <strong>Location:</strong> {selectedMission.location}</p>
                <p>📅 <strong>Schedule:</strong> {selectedMission.date || 'Immediate'}</p>
                <p>
                  👥 <strong>Mobilization:</strong> {Number(selectedMission.joinedVolunteers) || 0} / {Number(selectedMission.requiredVolunteers) || 1} Volunteers
                </p>
              </div>

              <div className="relief-modal-section">
                <h4 className="relief-modal-subheading">Mission Overview</h4>
                <p>{selectedMission.description}</p>
              </div>

              <div className="relief-modal-section">
                <h4 className="relief-modal-subheading">Coordinator Contact</h4>
                <p>👤 <strong>Lead:</strong> {selectedMission.contactPerson}</p>
                <p>📞 <strong>Phone:</strong> {selectedMission.contactPhone}</p>
              </div>

              <div className="relief-modal-footer-btns">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    const m = selectedMission;
                    setSelectedMission(null);
                    setJoiningMission(m);
                  }}
                >
                  Sign Up For This Mission
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Join Mission Modal */}
        <Modal
          isOpen={!!joiningMission}
          onClose={closeJoinModal}
          title={joinSuccess ? 'Registration Confirmed!' : `Join: ${joiningMission?.title}`}
        >
          {joinSuccess ? (
            <div className="relief-join-success-content text-center">
              <CheckCircle size={48} color="#16a34a" style={{ margin: '0 auto 16px' }} />
              <h3>Thank you for stepping forward!</h3>
              <p style={{ color: '#4b5563', margin: '12px 0 24px', lineHeight: 1.5 }}>
                Your details have been shared with the field coordinator (<strong>{joiningMission?.contactPerson}</strong>).
                Please monitor your phone for dispatch instructions.
              </p>
              <Button variant="primary" fullWidth onClick={closeJoinModal}>
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleJoinSubmit} className="relief-join-form">
              <div className="relief-field-group">
                <label className="relief-field-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={joinForm.name}
                  onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                  className="relief-input"
                />
              </div>

              <div className="relief-field-group">
                <label className="relief-field-label">Mobile Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +880 1711-000000"
                  value={joinForm.phone}
                  onChange={(e) => setJoinForm({ ...joinForm, phone: e.target.value })}
                  className="relief-input"
                />
              </div>

              <div className="relief-field-group">
                <label className="relief-field-label">Relevant Skills or Notes (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Can swim, experience with first aid, have 4x4 pickup..."
                  value={joinForm.note}
                  onChange={(e) => setJoinForm({ ...joinForm, note: e.target.value })}
                  className="relief-textarea"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Submitting Registration...' : 'Confirm Registration'}
              </Button>
            </form>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Volunteers;

