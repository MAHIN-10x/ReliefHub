import React from 'react';
import { useCarbonFootprint } from 'react-carbon-footprint';

const SustainabilityReport = () => {
  const [gCO2, bytesTransferred] = useCarbonFootprint();

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '0.85rem',
      color: 'rgba(255, 255, 255, 0.7)'
    }}>
      <span title="Session Bytes Transferred">
        🌐 {(bytesTransferred / 1024).toFixed(2)} KB
      </span>
      <span title="Estimated CO2 Emissions (swd model)">
        🌱 {gCO2.toFixed(4)} gCO2
      </span>
    </div>
  );
};

export default SustainabilityReport;
