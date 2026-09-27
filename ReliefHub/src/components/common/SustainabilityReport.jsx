import React from 'react';
import { useCarbonFootprint } from 'react-carbon-footprint';

const formatBytes = (bytes) => {
  const safeValue = Number.isFinite(bytes) && bytes > 0 ? bytes : 0;
  return `${(safeValue / 1024).toFixed(2)} KB`;
};

const formatCarbon = (value) => {
  const safeValue = Number.isFinite(value) ? value : 0;
  return `${safeValue.toFixed(4)} gCO2`;
};

const SustainabilityReport = () => {
  const [gCO2, bytesTransferred] = useCarbonFootprint();

  return (
    <div
      className="relief-sustainability-report"
      aria-label="Carbon footprint and network usage report"
    >
      <span className="relief-sustainability-item" title="Session bytes transferred">
        <span aria-hidden="true">🌐</span>
        <span>{formatBytes(bytesTransferred)}</span>
      </span>

      <span className="relief-sustainability-item" title="Estimated CO2 emissions (swd model)">
        <span aria-hidden="true">🌱</span>
        <span>{formatCarbon(gCO2)}</span>
      </span>
    </div>
  );
};

export default SustainabilityReport;
