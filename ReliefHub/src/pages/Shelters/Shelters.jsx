import React, { useState, useEffect, useCallback } from 'react';
import { 
  MapPin, 
  Phone, 
  Users, 
  Utensils, 
  Stethoscope, 
  Check, 
  AlertTriangle, 
  RotateCw, 
  Database, 
  Search, 
  ShieldCheck 
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { ACTIVE_SHELTERS } from '../../utils/constants';
import { getShelters } from '../../services/authService';
import './Shelters.css';

const Shelters = () => {
  const [shelters, setShelters] = useState(ACTIVE_SHELTERS);
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveDB, setIsLiveDB] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchShelters = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getShelters();
      if (Array.isArray(data) && data.length > 0) {
        setShelters(data);
        setIsLiveDB(true);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.warn('Shelter load notice:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShelters();
  }, [fetchShelters]);

  const getBadgeVariant = (status) => {
    const s = (status || '').toLowerCase().trim();
    if (s === 'open' || s === 'available') return 'success';
    if (s === 'near full') return 'warning';
    if (s === 'full' || s === 'closed') return 'danger';
    return 'neutral';
  };

  const filteredShelters = shelters.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = 
      !q ||
      (s.name && s.name.toLowerCase().includes(q)) ||
      (s.location && s.location.toLowerCase().includes(q)) ||
      (Array.isArray(s.facilities) && s.facilities.some(f => f.toLowerCase().includes(q)));

    const sStatus = (s.status || '').toLowerCase().trim();
    const matchesStatus = 
      statusFilter === 'All' ||
      (statusFilter === 'Open' && (sStatus === 'open' || sStatus === 'available')) ||
      (statusFilter === 'Near Full' && sStatus === 'near full') ||
      (statusFilter === 'Full' && (sStatus === 'full' || sStatus === 'closed'));

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="relief-shelters-page">
      <div className="container">
        {/* Page Header */}
        <div className="relief-page-header text-center">
          <Badge variant="info" dot size="md" className="relief-shelters-badge">
            SAFE EVACUATION SANCTUARIES
          </Badge>
          <h1 className="relief-page-title">Find Temporary Shelter</h1>
          <p className="relief-page-subtitle">
            Live monitoring of emergency community centers, schools, and cyclone shelters.
            Check remaining bed capacity, ration supply lines, and paramedic stations.
          </p>

          {/* Database Live Status & Quick Refresh */}
          <div className="relief-shelter-status-bar">
            <div className="relief-shelter-db-tag">
              <Database size={15} className={isLiveDB ? 'text-success' : 'text-primary'} />
              <span>
                {isLiveDB ? 'MongoDB Atlas Connected' : 'Standard Mock Fallback'} &bull;{' '}
                <strong>{shelters.length} Shelters Registered</strong>
                {lastUpdated && ` (Updated ${lastUpdated})`}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchShelters}
              disabled={isLoading}
              className="relief-shelter-refresh-btn"
            >
              <RotateCw size={14} className={isLoading ? 'relief-spin' : ''} />
              {isLoading ? 'Fetching...' : 'Sync Shelters'}
            </Button>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="relief-shelter-controls-wrap">
          <div className="relief-shelter-search-box">
            <Search size={18} className="relief-search-icon" />
            <input
              type="text"
              placeholder="Search shelter name, district, or facility (e.g. Sylhet, Ambarkhana, Water)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relief-shelter-search-input-field"
            />
            {searchQuery && (
              <button 
                className="relief-search-clear" 
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>

          <div className="relief-shelter-filter-pills">
            {['All', 'Open', 'Near Full', 'Full'].map((filter) => (
              <button
                key={filter}
                type="button"
                className={`relief-filter-pill ${statusFilter === filter ? 'active' : ''}`}
                onClick={() => setStatusFilter(filter)}
              >
                {filter === 'All' ? `All (${shelters.length})` : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Shelters Grid */}
        {filteredShelters.length === 0 ? (
          <div className="relief-shelters-empty">
            <AlertTriangle size={36} className="text-warning" />
            <h3>No matching shelters found</h3>
            <p>Try refining your search keyword or clearing the status filter.</p>
            <Button variant="secondary" size="sm" onClick={() => { setSearchQuery(''); setStatusFilter('All'); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="relief-shelters-grid">
            {filteredShelters.map((shelter, idx) => {
              const currentCap = Number(shelter.currentCapacity) || 0;
              const maxCap = Number(shelter.maxCapacity) || 1;
              const occupancyPct = Math.min(100, Math.round((currentCap / maxCap) * 100));
              const availSpaces = typeof shelter.availableSpaces === 'number' 
                ? shelter.availableSpaces 
                : Math.max(0, maxCap - currentCap);
              const isNearFull = availSpaces <= 30 || occupancyPct >= 85 || (shelter.status || '').toLowerCase() === 'near full';
              const shelterKey = shelter.id || shelter._id || `sh-${idx}`;

              return (
                <Card key={shelterKey} className="relief-shelter-card" padding="normal">
                  {/* Header */}
                  <div className="relief-shelter-top">
                    <Badge
                      variant={getBadgeVariant(shelter.status)}
                      dot
                      size="sm"
                    >
                      {shelter.status || 'Open'}
                    </Badge>
                    <span className="relief-shelter-available-pill">
                      <strong>{availSpaces}</strong> spaces available
                    </span>
                  </div>

                  <h3 className="relief-shelter-name">{shelter.name}</h3>

                  {/* Location */}
                  <div className="relief-shelter-meta-item">
                    <MapPin size={16} className="relief-shelter-icon" />
                    <span>{shelter.location}</span>
                  </div>

                  {/* Capacity Bar */}
                  <div className="relief-shelter-capacity-box">
                    <div className="relief-shelter-capacity-labels">
                      <span>Occupancy ({occupancyPct}%)</span>
                      <span>
                        {currentCap} / {maxCap} Max
                      </span>
                    </div>
                    <div className="relief-shelter-bar-track">
                      <div
                        className={`relief-shelter-bar-fill ${isNearFull ? 'relief-shelter-bar-fill--warning' : ''}`}
                        style={{ width: `${occupancyPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Logistics */}
                  <div className="relief-shelter-logistics">
                    <div className="relief-logistics-row">
                      <Utensils size={15} className="relief-logistics-icon" />
                      <span>Food: <strong>{shelter.availableFood || 'Available'}</strong></span>
                    </div>
                    <div className="relief-logistics-row">
                      <Stethoscope size={15} className="relief-logistics-icon" />
                      <span>Medical: <strong>{shelter.medicalSupport || 'Basic First Aid Available'}</strong></span>
                    </div>
                    <div className="relief-logistics-row">
                      <Phone size={15} className="relief-logistics-icon" />
                      <span>Contact: <strong>{shelter.contact || 'N/A'}</strong></span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="relief-shelter-actions">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => setSelectedShelter(shelter)}
                    >
                      View Shelter Details & Map
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Shelter Modal */}
        <Modal
          isOpen={!!selectedShelter}
          onClose={() => setSelectedShelter(null)}
          title="Shelter Overview"
        >
          {selectedShelter && (
            <div className="relief-shelter-modal-body">
              <h3 className="relief-modal-shelter-title">{selectedShelter.name}</h3>
              <div className="relief-modal-badges">
                <Badge variant={getBadgeVariant(selectedShelter.status)} dot>
                  {selectedShelter.status || 'Open'}
                </Badge>
                <Badge variant="neutral">
                  {typeof selectedShelter.availableSpaces === 'number' 
                    ? selectedShelter.availableSpaces 
                    : Math.max(0, (Number(selectedShelter.maxCapacity) || 0) - (Number(selectedShelter.currentCapacity) || 0))} Available Spaces
                </Badge>
              </div>

              <div className="relief-modal-section">
                <h4 className="relief-modal-subheading">Location & Direct Contact</h4>
                <p>📍 <strong>Address:</strong> {selectedShelter.location}</p>
                <p>📞 <strong>Shelter In-Charge:</strong> {selectedShelter.contact}</p>
              </div>

              <div className="relief-modal-section">
                <h4 className="relief-modal-subheading">Facilities & Provisions</h4>
                <ul className="relief-shelter-facilities-list">
                  {Array.isArray(selectedShelter.facilities) && selectedShelter.facilities.length > 0 ? (
                    selectedShelter.facilities.map((f, i) => (
                      <li key={i}>
                        <Check size={16} color="#16a34a" /> {f}
                      </li>
                    ))
                  ) : (
                    <li>
                      <Check size={16} color="#16a34a" /> Emergency Shelter Bedding
                    </li>
                  )}
                  {selectedShelter.availableFood && (
                    <li>
                      <Check size={16} color="#16a34a" /> Ration Supply: {selectedShelter.availableFood}
                    </li>
                  )}
                  {selectedShelter.medicalSupport && (
                    <li>
                      <Check size={16} color="#16a34a" /> Medical Care: {selectedShelter.medicalSupport}
                    </li>
                  )}
                </ul>
              </div>

              <div className="relief-shelter-modal-action">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    alert(`Calling shelter hotline: ${selectedShelter.contact}`);
                  }}
                >
                  <Phone size={16} /> Call Shelter In-Charge ({selectedShelter.contact})
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Shelters;

