import React, { useState } from 'react';
import { Heart, CheckCircle2, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { ALL_CAMPAIGNS, DONATION_PRESETS } from '../../utils/constants';
import { createDonation } from '../../services/authService';
import './Donate.css';

const Donate = () => {
  const [selectedCampaignId, setSelectedCampaignId] = useState(ALL_CAMPAIGNS[0].id);
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [donorData, setDonorData] = useState({
    donorName: '',
    email: '',
    phone: '',
    isAnonymous: false,
    paymentMethod: 'bKash / Nagad / Card',
  });
  const [loading, setLoading] = useState(false);
  const [donationReceipt, setDonationReceipt] = useState(null);

  const selectedCampaign =
    ALL_CAMPAIGNS.find((c) => c.id === selectedCampaignId) || ALL_CAMPAIGNS[0];

  const currentDonationValue = customAmount ? Number(customAmount) : selectedAmount;

  const handleAmountPresetClick = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val) {
      setSelectedAmount(null);
    }
  };

  const handleDonateSubmit = async (e) => {
    e.preventDefault();

    if (!currentDonationValue || currentDonationValue <= 0) {
      alert('Please select or enter a valid donation amount.');
      return;
    }

    setLoading(true);
    try {
      const response = await createDonation({
        campaignId: selectedCampaign.id,
        campaignTitle: selectedCampaign.title,
        amount: currentDonationValue,
        ...donorData,
      });

      setDonationReceipt({
        transactionId: response.transactionId,
        amount: currentDonationValue,
        campaign: selectedCampaign.title,
        donorName: donorData.isAnonymous ? 'Anonymous Benefactor' : (donorData.donorName || 'Generous Donor'),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDonationReceipt(null);
    setDonorData({
      donorName: '',
      email: '',
      phone: '',
      isAnonymous: false,
      paymentMethod: 'bKash / Nagad / Card',
    });
  };

  return (
    <div className="relief-donate-page">
      <div className="container">
        {/* Header */}
        <div className="relief-page-header text-center">
          <Badge variant="success" dot size="md" className="relief-donate-badge">
            100% TRANSPARENT AID DISTRIBUTION
          </Badge>
          <h1 className="relief-page-title">Support Emergency Relief</h1>
          <p className="relief-page-subtitle">
            Every contribution directly funds dry rations, drinking water purifiers, rescue boats, and
            emergency medical supplies for displaced families.
          </p>
        </div>

        {donationReceipt ? (
          /* Receipt Screen */
          <div className="relief-receipt-container">
            <Card className="relief-receipt-card" padding="lg">
              <div className="relief-receipt-icon-wrap">
                <CheckCircle2 size={54} color="#16a34a" />
              </div>
              <h2 className="relief-receipt-title">Contribution Received!</h2>
              <p className="relief-receipt-subtext">
                Thank you for standing with disaster-affected communities. A confirmation voucher has been generated.
              </p>

              <div className="relief-receipt-details">
                <div className="relief-receipt-row">
                  <span>Transaction ID:</span>
                  <strong>{donationReceipt.transactionId}</strong>
                </div>
                <div className="relief-receipt-row">
                  <span>Campaign:</span>
                  <strong>{donationReceipt.campaign}</strong>
                </div>
                <div className="relief-receipt-row">
                  <span>Amount:</span>
                  <strong className="relief-receipt-amount">৳{donationReceipt.amount.toLocaleString()}</strong>
                </div>
                <div className="relief-receipt-row">
                  <span>Donor:</span>
                  <strong>{donationReceipt.donorName}</strong>
                </div>
                <div className="relief-receipt-row">
                  <span>Date:</span>
                  <strong>{donationReceipt.date}</strong>
                </div>
              </div>

              <div className="relief-receipt-actions">
                <Button variant="primary" size="md" fullWidth onClick={handleReset}>
                  Make Another Donation
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          /* Main Donation Layout */
          <div className="relief-donate-layout">
            {/* Left: Campaign Progress and Impact Card */}
            <div className="relief-donate-left-col">
              <Card className="relief-selected-campaign-card" padding="lg">
                <span className="relief-choose-campaign-label">Select Campaign to Support:</span>
                <select
                  value={selectedCampaignId}
                  onChange={(e) => setSelectedCampaignId(e.target.value)}
                  className="relief-select relief-campaign-select"
                >
                  {ALL_CAMPAIGNS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.location})
                    </option>
                  ))}
                </select>

                <div className="relief-donate-campaign-info">
                  <h3 className="relief-donate-campaign-title">{selectedCampaign.title}</h3>
                  <p className="relief-donate-campaign-desc">{selectedCampaign.description}</p>

                  <div className="relief-donate-progress-container">
                    <div className="relief-donate-progress-labels">
                      <span>
                        <strong>৳{selectedCampaign.raisedAmount.toLocaleString()}</strong> raised
                      </span>
                      <span>Target: ৳{selectedCampaign.targetAmount.toLocaleString()}</span>
                    </div>
                    <div className="relief-donate-progress-track">
                      <div
                        className="relief-donate-progress-fill"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round(
                              (selectedCampaign.raisedAmount / selectedCampaign.targetAmount) * 100
                            )
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="relief-impact-breakdown">
                  <h4 className="relief-impact-title">What your support provides:</h4>
                  <ul className="relief-impact-list">
                    <li><strong>৳500</strong> → Emergency dry food packet for 1 family (3 days)</li>
                    <li><strong>৳1,000</strong> → 100 Water purification tablets + 20L Jerrycan</li>
                    <li><strong>৳2,000</strong> → Family essential medical kit with cholera salines</li>
                    <li><strong>৳5,000</strong> → Tarpaulin emergency shelter kit + warm blankets</li>
                  </ul>
                </div>

                <div className="relief-trust-banner">
                  <ShieldCheck size={20} color="#0a5c48" />
                  <span>100% of public donations are allocated to field operations.</span>
                </div>
              </Card>
            </div>

            {/* Right: Donation Form Card */}
            <div className="relief-donate-right-col">
              <Card className="relief-donate-form-card" padding="lg">
                <form onSubmit={handleDonateSubmit} className="relief-donate-form">
                  <h3 className="relief-donate-form-heading">Choose Amount</h3>

                  {/* Preset Buttons Grid */}
                  <div className="relief-preset-grid">
                    {DONATION_PRESETS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        className={`relief-preset-btn ${
                          selectedAmount === amt && !customAmount ? 'relief-preset-btn--selected' : ''
                        }`}
                        onClick={() => handleAmountPresetClick(amt)}
                      >
                        ৳{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount Input */}
                  <div className="relief-field-group">
                    <label className="relief-field-label">Or Enter Custom Amount (৳ BDT)</label>
                    <input
                      type="number"
                      placeholder="e.g. 7500"
                      min="50"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="relief-input"
                    />
                  </div>

                  {/* Donor Info */}
                  <div className="relief-donor-fields">
                    <div className="relief-field-group">
                      <label className="relief-field-label">Full Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        disabled={donorData.isAnonymous}
                        value={donorData.donorName}
                        onChange={(e) =>
                          setDonorData({ ...donorData, donorName: e.target.value })
                        }
                        className="relief-input"
                      />
                    </div>

                    <div className="relief-field-group">
                      <label className="relief-field-label">Email or Mobile</label>
                      <input
                        type="text"
                        placeholder="For donation receipt"
                        value={donorData.email}
                        onChange={(e) =>
                          setDonorData({ ...donorData, email: e.target.value })
                        }
                        className="relief-input"
                      />
                    </div>

                    <label className="relief-checkbox-label">
                      <input
                        type="checkbox"
                        checked={donorData.isAnonymous}
                        onChange={(e) =>
                          setDonorData({ ...donorData, isAnonymous: e.target.checked })
                        }
                        className="relief-checkbox"
                      />
                      <span>Make my donation anonymous</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={loading}
                    className="relief-donate-submit-btn"
                  >
                    {loading
                      ? 'Processing Contribution...'
                      : `Donate ৳${(currentDonationValue || 0).toLocaleString()} Now`}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donate;
